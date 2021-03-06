'use strict';

class GameObject {
	constructor(transform) {
		this.transform = transform;
		// el setup de los programas y eso se hacen en los hijos
		// pero eventualmente mete algo en this.programInfo y this.bufferInfo
		// fijarse en la clase Efe
		this.behaviorComponents = [];
		this.motionComponent = new MotionComponent(this);
		this.inputComponent = new InputComponent();
	}

	update(delta) {
		for (var i = 0; i < this.behaviorComponents.length; i++){
			this.behaviorComponents[i].update(delta);
		}
		this.motionComponent.update(delta);
	}

	draw(viewProjectionMatrix, worldMatrix=null) {
		this.setPreDrawGLProperties();

		// Tell it to use our program (pair of shaders)
		gl.useProgram(this.programInfo.program);
		// Bind all the buffers and attributes of the program
		twgl.setBuffersAndAttributes(
			gl, this.programInfo, this.bufferInfo);

		// here you set all the uniforms for the shaders
		var uniforms = this.getUniforms(viewProjectionMatrix, worldMatrix);
		twgl.setUniforms(this.programInfo, uniforms);

		// Draw the geometry.
		let primitiveType = gl.TRIANGLES;
		let offset = 0;
		gl.drawArrays(primitiveType, offset, this.bufferInfo.numElements);

		this.setPostDrawGLProperties();
	}

	calculateShadowMap(lightViewProjectionMatrix){
		let shadowMapProgram = shaderManager.programInfos['shadowMap'];
		// Tell it to use our program (pair of shaders)
		gl.useProgram(shadowMapProgram.program);

		let shadowMapBufferInfo = { numElements : this.bufferInfo.numElements, attribs :  { a_position : this.bufferInfo.attribs.a_position} };
		twgl.setBuffersAndAttributes(gl, shadowMapProgram, shadowMapBufferInfo);

		// this one transforms to clip coordinates (3 transformations)
		let MVPMatrix = m4.multiply(
			lightViewProjectionMatrix, this.transform.transformMatrix);

		var uniforms = { u_worldViewProjection : MVPMatrix };
		twgl.setUniforms(shadowMapProgram, uniforms);

		// Draw the geometry.
		let primitiveType = gl.TRIANGLES;
		let offset = 0;
		gl.drawArrays(primitiveType, offset, shadowMapBufferInfo.numElements);
	}

	setPreDrawGLProperties(){

	}

	setPostDrawGLProperties(){

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
		m4.transpose(uniforms.u_worldInverseTranspose, uniforms.u_worldInverseTranspose);
		uniforms.u_worldViewProjection = currentViewMatrix;
	}

	getUniforms(viewProjectionMatrix, worldMatrix, lightViewProjectionMatrix){
		let uniforms = {
			u_reverseLightDirection: v3.normalize([0.5, 0.7, 1]),
			u_cameraPosition: world.getCameraPosition(),
			u_pointLightPositions: world.pointLightPositions,
			u_pointLightColors: world.pointLightColors,
			u_pointLightIntensities: world.pointLightIntensities,
			u_shadowMapUses : world.shadowMapUses,
			u_shadowMapTextures : world.shadowMapTextures,
			u_shadowMapMVPLightMatrixes : world.shadowMapMVPLightMatrixes,
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

	rotate(x, y, z){
		// CAREFUL! This method works only one time and with one axis, after that you'll be
		// rotating against the wrong axis. Use Quaternions for improvement (see shipMotion class)
		var rotationMatrix = this.transform.rotation;
		m4.rotateX(rotationMatrix, x, rotationMatrix);
		m4.rotateY(rotationMatrix, y, rotationMatrix);
		m4.rotateZ(rotationMatrix, z, rotationMatrix);
	}

}
