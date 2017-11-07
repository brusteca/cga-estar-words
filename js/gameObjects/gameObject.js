'use strict';

class GameObject {
	constructor(transform) {
		this.transform = transform;
		// TODO: pensar una forma de poner los shaders y los atributos
		// todo junto o algo asi. tipo como parametro

		// el setup de los programas y eso se hacen en los hijos
		// pero eventualmente mete algo en this.programInfo y this.bufferInfo
		// fijarse en la clase Efe

	}

	update(ms_per_update) {

	}

	draw(viewProjectionMatrix, worldMatrix=null) {
		// Tell it to use our program (pair of shaders)
		gl.useProgram(this.programInfo.program);
		// Bind all the buffers and attributes of the program
		twgl.setBuffersAndAttributes(
			gl, this.programInfo, this.bufferInfo);

		// this one transforms to world coordinates
		let currentWorldMatrix;
		if (worldMatrix === null) {
			currentWorldMatrix = m4.copy(this.transform.transformMatrix);
		} else {
			currentWorldMatrix = m4.multiply(
				worldMatrix, this.transform.transformMatrix);
		}
		// this one transforms to camera coordinates
		let currentViewMatrix = m4.multiply(
			viewProjectionMatrix, this.transform.transformMatrix);

		// here you set all the uniforms for the shaders
		let uniforms = {
			u_world: currentWorldMatrix,
			u_worldInverseTranspose: m4.inverse(currentWorldMatrix),
			u_worldViewProjection: currentViewMatrix,
			u_reverseLightDirection: v3.normalize([0.5, 0.7, 1]),
			u_lightWorldPosition: v3.create(20, 30, 50),
			u_texture: this.texture
		};
		twgl.setUniforms(this.programInfo, uniforms)

		// Draw the geometry.
		let primitiveType = gl.TRIANGLES;
		let offset = 0;
		gl.drawArrays(primitiveType, offset, this.bufferInfo.numElements);
	}
}
