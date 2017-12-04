precision mediump float;

uniform sampler2D u_texture;

// Passed in from the vertex shader.
varying vec2 v_texcoord;

void main() {
	vec4 color = texture2D(u_texture, v_texcoord);
	gl_FragColor = color;
}