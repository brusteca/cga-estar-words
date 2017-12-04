
class SkyDome extends GameObject {
	constructor(transform) {
		super(transform);
		// setup GLSL program
		this.programInfo = shaderManager.programInfos['skybox'];

		this.cameraDistance = 8192;
		
		let arrays = {
			// Estos nombres dependen de las variables de los shaders
			a_position: {numComponents: 3, data: this.getGeometry()},
			a_color: {numComponents: 3, data: this.getColors()},
			a_normal: {numComponents: 3, data: this.getNormals()},
			a_texcoord: {numComponents: 2, data: this.getTextureCoords()}
		};

		this.bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);

		// set texture
		let textureId = 'skybox';
		if (textureId in textureManager.textures) {
			this.texture = textureManager.textures[textureId];
			this.useTexture = true;
		} else {
			this.texture = null;
			this.useTexture = false;
		}
	}

	getUniforms(viewProjectionMatrix, worldMatrix) {
		let uniforms = {
			u_texture: this.texture
		};
		this.addGameObjectUniforms(uniforms, viewProjectionMatrix, worldMatrix);
		return uniforms;
	}

	getGeometry() {
		return new Float32Array([
			// bottom
			 this.cameraDistance, -this.cameraDistance, -this.cameraDistance,
			-this.cameraDistance, -this.cameraDistance, -this.cameraDistance,
			-this.cameraDistance, -this.cameraDistance,  this.cameraDistance,

			-this.cameraDistance, -this.cameraDistance,  this.cameraDistance,
			 this.cameraDistance, -this.cameraDistance,  this.cameraDistance,
			 this.cameraDistance, -this.cameraDistance, -this.cameraDistance,

			 // top
			-this.cameraDistance,  this.cameraDistance,  this.cameraDistance,
			-this.cameraDistance,  this.cameraDistance, -this.cameraDistance,
			 this.cameraDistance,  this.cameraDistance, -this.cameraDistance,

			 this.cameraDistance,  this.cameraDistance, -this.cameraDistance,
			 this.cameraDistance,  this.cameraDistance,  this.cameraDistance,
			-this.cameraDistance,  this.cameraDistance,  this.cameraDistance,

			 // left
			 this.cameraDistance,  this.cameraDistance, -this.cameraDistance,
			 this.cameraDistance, -this.cameraDistance, -this.cameraDistance,
			 this.cameraDistance, -this.cameraDistance,  this.cameraDistance,

			 this.cameraDistance, -this.cameraDistance,  this.cameraDistance,
			 this.cameraDistance,  this.cameraDistance,  this.cameraDistance,
			 this.cameraDistance,  this.cameraDistance, -this.cameraDistance,

			 // right
			 -this.cameraDistance, -this.cameraDistance,  this.cameraDistance,
			 -this.cameraDistance, -this.cameraDistance, -this.cameraDistance,
			 -this.cameraDistance,  this.cameraDistance, -this.cameraDistance,

			 -this.cameraDistance,  this.cameraDistance, -this.cameraDistance,
			 -this.cameraDistance,  this.cameraDistance,  this.cameraDistance,
			 -this.cameraDistance, -this.cameraDistance,  this.cameraDistance,

			 // front
			  this.cameraDistance, -this.cameraDistance,  this.cameraDistance,
			 -this.cameraDistance, -this.cameraDistance,  this.cameraDistance,
			 -this.cameraDistance,  this.cameraDistance,  this.cameraDistance,

			 -this.cameraDistance,  this.cameraDistance,  this.cameraDistance,
			  this.cameraDistance,  this.cameraDistance,  this.cameraDistance,
			  this.cameraDistance, -this.cameraDistance,  this.cameraDistance,

			 // back
			 -this.cameraDistance,  this.cameraDistance, -this.cameraDistance,
			 -this.cameraDistance, -this.cameraDistance, -this.cameraDistance,
			  this.cameraDistance, -this.cameraDistance, -this.cameraDistance,

			  this.cameraDistance, -this.cameraDistance, -this.cameraDistance,
			  this.cameraDistance,  this.cameraDistance, -this.cameraDistance,
			 -this.cameraDistance,  this.cameraDistance, -8192
		]);
	};

	getColors() {
		return new Uint8Array([
			0, 0, 0,
			0, 0, 0,
			0, 0, 0,

			0, 0, 0,
			0, 0, 0,
			0, 0, 0,

			0, 0, 0,
			0, 0, 0,
			0, 0, 0,

			0, 0, 0,
			0, 0, 0,
			0, 0, 0,

			0, 0, 0,
			0, 0, 0,
			0, 0, 0,

			0, 0, 0,
			0, 0, 0,
			0, 0, 0,

			0, 0, 0,
			0, 0, 0,
			0, 0, 0,

			0, 0, 0,
			0, 0, 0,
			0, 0, 0,

			0, 0, 0,
			0, 0, 0,
			0, 0, 0,

			0, 0, 0,
			0, 0, 0,
			0, 0, 0,

			0, 0, 0,
			0, 0, 0,
			0, 0, 0,

			0, 0, 0,
			0, 0, 0,
			0, 0, 0
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

	getTextureCoords() {
		return new Float32Array([
			// bottom
			0.25,0.5,
			0.25, 0.25,
			0.5, 0.25,

			0.5, 0.25,
			0.5, 0.5,
			0.25,0.5,

			 // top
			0.5, 1,
			0.25, 1,
			0.25, 0.75,

			0.25, 0.75,
			0.5, 0.75,
			0.5, 1,

			 // left
			0.25, 0.75,
			0.25,0.5,
			0.5, 0.5,

 			0.5, 0.5,
			0.5, 0.75,
			0.25, 0.75,

			 // right
			 0.5, 0.25,
			 0.25, 0.25,
		     0.25, 0,

			 0.25, 0,
			 0.5, 0,
			 0.5, 0.25,

			 // front
             0.5, 0.5,
 			 0.5, 0.25,
			 0.75, 0.25,

             0.75, 0.25,
             0.75, 0.5,
             0.5, 0.5,

			 // back
             0, 0.25,
			 0.25, 0.25,
			 0.25,0.5,

 			 0.25,0.5,
             0, 0.5,
             0, 0.25,
		]);
	};

}
