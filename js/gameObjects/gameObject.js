'use strict';

class GameObject {
	constructor(transform) {
		this.transform = transform;
		// el setup de los programas y eso se hacen en los hijos
		// pero eventualmente mete algo en this.programInfo y this.bufferInfo
		// fijarse en la clase Efe
		this.behaviorComponent = new BehaviorComponent([], this);
		this.motionComponent = new MotionComponent(this);
		this.inputComponents = [];
	}

	handleInput(keyStatus, delta){
		for (var i = 0; i < this.inputComponents.length; i++){
			this.inputComponents[i].handleInput(keyStatus, delta);
		}
	}

	update(delta) {
		this.behaviorComponent.update(delta);
		this.motionComponent.update(delta);
	}

	draw(viewProjectionMatrix, worldMatrix=null) {
		// Tell it to use our program (pair of shaders)
		gl.useProgram(this.programInfo.program);
		// Bind all the buffers and attributes of the program
		twgl.setBuffersAndAttributes(
			gl, this.programInfo, this.bufferInfo);

		// here you set all the uniforms for the shaders
		var uniforms = this.getUniforms(viewProjectionMatrix, worldMatrix);
		twgl.setUniforms(this.programInfo, uniforms)

		// Draw the geometry.
		let primitiveType = gl.TRIANGLES;
		let offset = 0;
		gl.drawArrays(primitiveType, offset, this.bufferInfo.numElements);
	}

	addGameObjectUniforms(uniforms, viewProjectionMatrix, worldMatrix){
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

		uniforms.u_world = currentWorldMatrix;
		uniforms.u_worldInverseTranspose = m4.inverse(currentWorldMatrix);
		uniforms.u_worldViewProjection = currentViewMatrix;
	}

	getUniforms(viewProjectionMatrix, worldMatrix){
		let uniforms = {
			u_reverseLightDirection: v3.normalize([0.5, 0.7, 1]),
			u_cameraPosition: world.getCameraPosition(),
			u_pointLightPositions: world.pointLightPositions,
			u_pointLightColors: world.pointLightColors,
			u_pointLightMaxDistances: world.pointLightMaxDistances,
			u_texture: this.texture,
			u_useTexture : (this.texture != null)
		};

		this.addGameObjectUniforms(uniforms, viewProjectionMatrix, worldMatrix);

		return uniforms;
	}

	setSpeed(params){
		this.motionComponent.setSpeed(params.speed);
	}

	translate(direction){
		v3.add(this.transform.position, direction, this.transform.position);
	}

}
