precision mediump float;

uniform sampler2D u_texture;

// Passed in from the vertex shader.
varying vec4 v_color;
varying vec3 v_normal;
varying vec2 v_texcoord;

void main() {
	gl_FragColor = texture2D(u_texture, v_texcoord);
}
