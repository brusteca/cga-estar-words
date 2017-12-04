precision mediump float;

#define light_qty 16

const float c_maxDistance = 8000.0;
// skyblue (135, 206, 235)
// const vec4 c_atmosphereColor = vec4(0.5294, 0.8078, 0.9215, 1);
const vec4 c_atmosphereColor = vec4(0.0, 0.0, 0.0, 1);
const vec3 c_backgroundLight = vec3(0.3, 0.3, 0.3);
// light attenuation
const float constAtt = 0.03;
const float linearAtt = 0.2;
const float quadAtt = 0.012;

uniform vec3 u_reverseLightDirection;
// The texture.
uniform sampler2D u_texture;

uniform bool u_useTexture;
uniform vec3 u_pointLightColors[light_qty];
uniform float u_pointLightMaxDistances[light_qty];

varying vec4 v_color;
varying vec3 v_normal;
varying vec2 v_texcoord;
varying float v_distanceToCamera;
varying vec3 v_surfaceToLightDirections[light_qty];
varying float v_distanceToLights[light_qty];

void main() {
	vec4 fragColor;
	// because v_normal is a varying it's interpolated
	// we it will not be a uint vector. Normalizing it
	// will make it a unit vector again
	vec3 normalSurfaceToLightDirections[light_qty];
	vec3 normal = normalize(v_normal);
	for (int ii = 0; ii < light_qty; ++ii) {
		normalSurfaceToLightDirections[ii] = normalize(v_surfaceToLightDirections[ii]);
	}
	//float lightComponent = dot(normal, u_reverseLightDirection) * 0.3;

	vec3 light = c_backgroundLight;
	for (int ii = 0; ii < light_qty; ++ii) {
		// float attFactor = u_pointLightIntensities[ii] * min(
		// 	1.0,
		// 	1.0 / (constAtt + linearAtt * v_distanceToLights[ii] + quadAtt * pow(v_distanceToLights[ii], 2.0))
		// );
		if (v_distanceToLights[ii] < u_pointLightMaxDistances[ii]) {
			light += u_pointLightColors[ii].rgb * dot(normal, normalSurfaceToLightDirections[ii]);				
		}
	}

	if (u_useTexture) {
		fragColor = texture2D(u_texture, v_texcoord);
	} else {
		fragColor = v_color;
	}

	// Lets multiply just the color portion (not the alpha)
	// by the light
	fragColor.rgb *= light;

	float mix_percent = clamp(v_distanceToCamera / c_maxDistance, 0.0, 1.0);

	fragColor = mix(fragColor, c_atmosphereColor, mix_percent);

	gl_FragColor = fragColor;
}