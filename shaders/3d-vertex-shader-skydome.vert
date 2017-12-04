attribute vec4 a_position;
attribute vec4 a_color;
attribute vec3 a_normal;
attribute vec2 a_texcoord;

uniform mat4 u_world;
uniform mat4 u_worldViewProjection;
uniform mat4 u_worldInverseTranspose;

varying vec4 v_color;
varying vec3 v_normal;
varying vec2 v_texcoord;

void main() {
	// Multiply the position by the matrix.
	gl_Position = u_worldViewProjection * a_position;

	// Pass the color to the fragment shader.
	v_color = a_color;
	v_texcoord = a_texcoord;

	// orient the normals and pass to the fragment shader
	v_normal = mat3(u_worldInverseTranspose) * a_normal;
}