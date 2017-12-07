attribute vec4 a_position;

uniform vec4 u_color;

uniform mat4 u_world;
uniform mat4 u_worldViewProjection;
uniform mat4 u_worldInverseTranspose;

varying vec4 v_color;

void main() {
	// Multiply the position by the matrix.
	gl_Position = u_worldViewProjection * a_position;
	v_color = u_color;
}