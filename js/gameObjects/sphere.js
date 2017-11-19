'use strict';

class Sphere extends GameObject {
	constructor(transform) {
		super(transform);
		// setup GLSL program
		this.programInfo = twgl.createProgramInfo(gl, ["3d-vertex-shader-terrain", "3d-fragment-shader-terrain"])

		let arrays = {
			// Estos nombres dependen de las variables de los shaders
			a_position: {numComponents: 3, data: getGeometry()},
			a_color: {numComponents: 3, data: getColors()},
			a_normal: {numComponents: 3, data: getNormals()},
			a_texcoord: {numComponents: 2, data: getTextureCoords()}
		};

		this.bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);

		this.texture = twgl.createTexture(gl, {src: 'resources/textures/f-texture.png'});

		// Create a sphere
		var radius = 1; // m
		var sphereBody = new CANNON.Body({
			mass: 5, // kg
			position: new CANNON.Vec3(
				this.transform.position[0],
				this.transform.position[1],
				this.transform.position[2]
			), // m
			shape: new CANNON.Sphere(radius)
		});
		world.physics.addBody(sphereBody);
		this.physicsComponent = new PhysicsComponent(this, sphereBody);
	}

	update(delta) {
		if ((this.physicsComponent.count++ % 60) == 0) {
			// console.log(this.transform.position);
		}
		this.physicsComponent.update();
	}
}
