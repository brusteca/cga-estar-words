precision mediump float;

uniform sampler2D u_texture;
uniform vec3 u_laserColor;

// Passed in from the vertex shader.
varying vec2 v_texcoord;

void main() {
	vec4 texColor = texture2D(u_texture, v_texcoord);
	// Now for a bit of hacking, replace the texture's red for this laser's color
	// I can do this since I know the texture is red
	float actualColor = texColor.r - texColor.g;
	vec3 color = u_laserColor.rgb * actualColor;
	color.rgb += texColor.g;

	gl_FragColor = vec4(color.rgb, texColor.a);
}
