attribute vec4 a_position;
attribute vec4 a_color;
attribute vec3 a_normal;

uniform mat4 u_world;
uniform mat4 u_worldViewProjection;
uniform mat4 u_worldInverseTranspose;

varying vec4 v_color;
varying vec3 v_normal;

void main() {
	// Multiply the position by the matrix.
	gl_Position = u_worldViewProjection * a_position;

	// Pass the color to the fragment shader.
	v_color = a_color;
	// orient the normals and pass to the fragment shader
	v_normal = mat3(u_worldInverseTranspose) * a_normal;

	// compute the world position of the surfoace
	vec3 surfaceWorldPosition = (u_world * a_position).xyz;
	// compute the vector of the surface to the light
	// and pass it to the fragment shader
}