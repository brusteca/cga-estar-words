precision mediump float;

#define light_qty 8
#define shadow_map_qty 8 // 4 * light_qty

attribute vec4 a_position;
attribute vec4 a_color;
attribute vec3 a_normal;
attribute vec2 a_texcoord;

// according to what is calculated on 'addGameObjectUniforms'

// this is just the transformation matrix (model matrix)
uniform mat4 u_world;  

// this one does three transformations: converts from model coordinates to world coordinates (model matrix)
// converts from world coordinates to camera coordinates (view matrix)
// converts from camera coordinates to clip space (projectio matrix)
uniform mat4 u_worldViewProjection;
uniform mat4 u_worldInverseTranspose; 

uniform vec3 u_cameraPosition;
uniform vec3 u_pointLightPositions[light_qty];
// uniform vec3 u_pointLightColors[light_qty];

uniform mat4 u_shadowMapMVPLightMatrixes[shadow_map_qty];

varying vec4 v_color;
varying vec3 v_normal;
varying vec2 v_texcoord;

varying float v_distanceToCamera;
varying vec3 v_surfaceToLightDirections[light_qty];
varying float v_distanceToLights[light_qty];

varying vec4 v_shadowCoord[shadow_map_qty];

void main() {
	// Multiply the position by the matrix.
	gl_Position = u_worldViewProjection * a_position;

	// check the shadowmap 
	for (int ii = 0; ii < shadow_map_qty; ++ii) {
		vec4 shadowCoord = (u_shadowMapMVPLightMatrixes[ii] * u_world * a_position);
		shadowCoord.xy = shadowCoord.xy / shadowCoord.w;
		v_shadowCoord[ii] = shadowCoord.xyzw;	
	}

	// Pass the color to the fragment shader.
	v_color = a_color;
	// orient the normals and pass to the fragment shader
	v_normal = mat3(u_worldInverseTranspose) * a_normal;
	v_texcoord = a_texcoord;

	// compute the world position of the surface
	vec3 surfaceWorldPosition = (u_world * a_position).xyz;

	v_distanceToCamera = distance(surfaceWorldPosition, u_cameraPosition);
	// compute the vector of the surface to the light
	// and pass it to the fragment shader
	for (int ii = 0; ii < light_qty; ++ii) {
		v_surfaceToLightDirections[ii] = u_pointLightPositions[ii] - surfaceWorldPosition;
		v_distanceToLights[ii] = distance(surfaceWorldPosition, u_pointLightPositions[ii]);
	}

}

