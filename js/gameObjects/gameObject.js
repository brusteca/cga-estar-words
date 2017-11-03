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

	draw(viewProjectionMatrix) {
		// Tell it to use our program (pair of shaders)
		gl.useProgram(this.programInfo.program);
		// Bind all the buffers and attributes of the program
		twgl.setBuffersAndAttributes(
			gl, this.programInfo, this.bufferInfo);

		// Apply the transform to the viewMatrix
		let currentTransformMatrix = m4.multiply(
			viewProjectionMatrix, this.transform.transformMatrix);

		// here you set all the uniforms for the shaders
		let uniforms = {
			u_matrix: currentTransformMatrix,
			u_reverseLightDirection: v3.normalize([0.5, 0.7, 1]),
			u_texture: this.texture
		};
		twgl.setUniforms(this.programInfo, uniforms)
		// the code above does the same as the commented code below
		// gl.uniformMatrix4fv(
		// 	this.programInfo.uniformSetters.u_matrix.location,
		// 	false,
		// 	currentTransformMatrix
		// );

		// Draw the geometry.
		let primitiveType = gl.TRIANGLES;
		let offset = 0;
		gl.drawArrays(primitiveType, offset, this.bufferInfo.numElements);
	}
}
