'use strict';

class Floor extends GameObject {
	constructor(transform) {
		super(transform);
		// setup GLSL program
		this.programInfo = twgl.createProgramInfo(gl, ["3d-vertex-shader", "3d-fragment-shader"])

		let arrays = {
			// Estos nombres dependen de las variables de los shaders
			a_position: {numComponents: 3, data: this.getGeometry()},
			a_color: {numComponents: 3, data: this.getColors()},
			a_normal: {numComponents: 3, data: this.getNormals()},
			a_texcoord: {numComponents: 2, data: this.getTextureCoords()}
		};

		this.bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);

		this.texture = twgl.createTexture(gl, {
			src: 'resources/textures/dea60ce67a5bb55100ba6a7b1b1620fe.jpg',
			wrap: gl.REPEAT,
			auto: true
		});
	}

	getGeometry() {
		return new Float32Array([
			1000, 0, -1000,
			-1000, 0, -1000,
			-1000, 0, 1000,

			-1000, 0, 1000,
			1000, 0, 1000,
			1000, 0, -1000,
		]);
	};

	getColors() {
		return new Uint8Array([
			100, 100, 100,
			100, 100, 100,
			100, 100, 100,

			100, 100, 100,
			100, 100, 100,
			100, 100, 100,
		]);
	};

	getNormals() {
		return new Float32Array([
			0, 1, 0,
			0, 1, 0,
			0, 1, 0,

			0, 1, 0,
			0, 1, 0,
			0, 1, 0,
		]);
	};

	getTextureCoords() {
		return new Float32Array([
			10, 0,
			0, 0,
			0, 10,

			0, 10,
			10, 10,
			10, 0,
		]);
	};

}
