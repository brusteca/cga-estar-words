'use strict';

class LaserShot extends GameObject{
	
	constructor(transform) {
		super(transform);
		// setup GLSL program
		this.programInfo = twgl.createProgramInfo(gl, ["3d-vertex-shader-laser", "3d-fragment-shader-laser"])

		let arrays = {
			// Estos nombres dependen de las variables de los shaders
			a_position: {numComponents: 3, data: this.getGeometry()},
			a_normal: {numComponents: 3, data: this.getNormals()}
		};

		this.bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);
		this.useTexture = false;

 		this.color = [ 1, 0, 0, 1 ]; // pure red, maybe add as an attribute?

 		this.motionComponent = new SpaceShipMotionComponent(this);

 		this.frontDirection = null;
	}

	getUniforms(viewProjectionMatrix, worldMatrix) {
		let uniforms = { 
			u_color : this.color
		};
		this.addGameObjectUniforms(uniforms, viewProjectionMatrix, worldMatrix);
		return uniforms;
	}

	getFrontDirection(){
		return this.frontDirection;
	}

	getGeometry() {
		return new Float32Array([
			// bottom
			 50, -5, -5,
			-50, -5, -5,
			-50, -5,  5,
		
			-50, -5,  5,
			 50, -5,  5,
			 50, -5, -5,

			 // top
			-50,  5,  5,
			-50,  5, -5,
			 50,  5, -5,

			 50,  5, -5,
			 50,  5,  5,
			-50,  5,  5,

			 // left
			 50,  5, -5,
			 50, -5, -5,
			 50, -5,  5,

			 50, -5,  5,
			 50,  5,  5,
			 50,  5, -5,

			 // right
			 -50, -5,  5,
			 -50, -5, -5,
			 -50,  5, -5,
		
			 -50,  5, -5,
			 -50,  5,  5,
			 -50, -5,  5,

			 // front
			  50, -5,  5,
			 -50, -5,  5,
			 -50,  5,  5,

			 -50,  5,  5,
			  50,  5,  5,
			  50, -5,  5,

			 // back
			 -50,  5, -5,
			 -50, -5, -5,
			  50, -5, -5,

			  50, -5, -5,
			  50,  5, -5,
			 -50,  5, -5
		]);
	};

	getNormals() {
		return new Float32Array([
			 0,  1, 0,
			 0,  1, 0,
		 	 0,  1, 0,

			 0,  1, 0,
			 0,  1, 0,
			 0,  1, 0,

			 0, -1, 0,
			 0, -1, 0,
		 	 0, -1, 0,

			 0, -1, 0,
			 0, -1, 0,
			 0, -1, 0,

			 1,  0, 0,
			 1,  0, 0,
			 1,  0, 0,

			 1,  0, 0,
			 1,  0, 0,
			 1,  0, 0,

			-1,  0, 0,
			-1,  0, 0,
			-1,  0, 0,

			-1,  0, 0,
			-1,  0, 0,
			-1,  0, 0,

			 0,  0, -1,
			 0,  0, -1,
			 0,  0, -1,

			 0,  0, -1,
			 0,  0, -1,
			 0,  0, -1,

			 0,  0,  1,
			 0,  0,  1,
			 0,  0,  1,

			 0,  0,  1,
			 0,  0,  1,
			 0,  0,  1
		]);
	};

}


