precision mediump float;

#define light_qty 8
#define shadow_map_per_light 4
#define shadow_map_qty 8
#define static_light_count 3

const float c_maxDistance = 8000.0;
// skyblue (135, 206, 235)
// const vec4 c_atmosphereColor = vec4(0.5294, 0.8078, 0.9215, 1);
const vec4 c_atmosphereColor = vec4(0.0, 0.0, 0.0, 1);
const vec3 c_backgroundLight = vec3(0.3, 0.1, 0.1);
// light attenuation
const float constAtt = 0.03;
const float linearAtt = 0.2;
const float quadAtt = 0.012;

uniform vec3 u_reverseLightDirection;
// The texture.
uniform sampler2D u_texture;

uniform sampler2D u_shadowMapTextures[shadow_map_qty];
uniform bool u_shadowMapUses[shadow_map_qty];
varying vec4 v_shadowCoord[shadow_map_qty];

uniform bool u_useTexture;
uniform vec3 u_pointLightColors[light_qty];
uniform float u_pointLightIntensities[light_qty];

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
	// float directionalLight = dot(normal, u_reverseLightDirection) * 0.3;

	if (u_useTexture) {
		fragColor = texture2D(u_texture, v_texcoord);
	} else {
		fragColor = v_color;
	}

	vec3 light = c_backgroundLight;
	// light.rgb += directionalLight;
	for (int ii = 0; ii < light_qty; ++ii) {

		// check shadowMap
		bool inShadow = false;
		int beginIndex = ii * shadow_map_per_light;
		int endIndex = (ii + 1) * shadow_map_per_light;	

		for (int j = 0; j < shadow_map_qty; j++){
			if ((j + 12) < beginIndex || (j + 12) >= endIndex)
				continue;

			if (u_shadowMapUses[j]){
				// transform XY (in [-1,1] range) to texture coords ([0-1] range).
				float v_shadowTextureCoordU = (v_shadowCoord[j].x + 1.0) * 0.5;
				float v_shadowTextureCoordV = (v_shadowCoord[j].y + 1.0) * 0.5;
				if (v_shadowTextureCoordU >= 0.0 && v_shadowTextureCoordU <= 1.0 && v_shadowTextureCoordV >= 0.0 && v_shadowTextureCoordV <= 1.0){
					float depth = texture2D(u_shadowMapTextures[j], vec2(v_shadowTextureCoordU, v_shadowTextureCoordV)).r;
					if (v_shadowCoord[j].z > 0.0 && depth < (v_shadowCoord[j].z / v_shadowCoord[j].w)){
						//fragColor = vec4(1.0, 1.0, 0.0, 1.0); // enable to color the shadows!	
						inShadow = true;
						break;
					}
				}		
			}
		}

		if (!inShadow){
			float attFactor;
			if (u_pointLightIntensities[ii] >= 0.0) {
				attFactor = u_pointLightIntensities[ii] * min(
					1.0,
					1.0 / (constAtt + linearAtt * v_distanceToLights[ii] + quadAtt * pow(v_distanceToLights[ii], 2.0))
				);
			} else {
				attFactor = 1.0;
			}
			light += u_pointLightColors[ii].rgb * dot(normal, normalSurfaceToLightDirections[ii]) * attFactor;
			// if (v_distanceToLights[ii] < u_pointLightMaxDistances[ii]) {
			// 	light += u_pointLightColors[ii].rgb * dot(normal, normalSurfaceToLightDirections[ii]);
			// }
		}
	}

	// Lets multiply just the color portion (not the alpha)
	// by the light
	fragColor.rgb *= light;

	float mix_percent = clamp(v_distanceToCamera / c_maxDistance, 0.0, 1.0);

	fragColor = mix(fragColor, c_atmosphereColor, mix_percent);

	gl_FragColor = fragColor;
	
}
