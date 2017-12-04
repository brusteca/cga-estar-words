attribute vec4 a_position;
attribute vec2 a_texcoord;

uniform mat4 u_world;
uniform mat4 u_worldViewProjection;
uniform mat4 u_worldInverseTranspose;

varying vec2 v_texcoord;

void main() {
	// Multiply the position by the matrix.
	gl_Position = u_worldViewProjection * a_position;

	v_texcoord = a_texcoord;
}