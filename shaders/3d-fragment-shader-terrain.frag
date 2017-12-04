precision mediump float;


varying vec4 v_color;
varying vec3 v_normal;

void main() {
	// because v_normal is a varying it's interpolated
	// we it will not be a uint vector. Normalizing it
	// will make it a unit vector again

	vec3 normal = normalize(v_normal);
	//float lightComponent = dot(normal, u_reverseLightDirection) * 0.3;


	gl_FragColor = v_color;
}