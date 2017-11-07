'use strict';

class Model extends GameObject{
	
	constructor(modelPath, texturePath, transform) {
		super(transform);

		this.modelLoaded = false;
		this.model = null;
		// to do: is it necesary for the model to store all the information of the object (geometry, normals, textures)?
		modelManager.getModelGeometry(modelPath).then((model) => {
			this.modelLoaded = true;
			this.model = model;
			this.initialize();
		});

		this.texture = twgl.createTexture(gl, {src: texturePath});

	}

	initialize(){
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
	}

	draw(viewProjectionMatrix, worldMatrix=null) {
		if (this.modelLoaded){
			super.draw(viewProjectionMatrix, worldMatrix);
		}
	}



	getGeometry() {
		return new Float32Array(this.model.verts);
	};

	getColors() {
		var colors = [];
		for (var i = 0; i < this.model.verts.length; i++){
			colors.push(250);
		}
		return new Uint8Array(colors);
	};

	getNormals() {
		return new Float32Array(this.model.normals);
	};

	getTextureCoords() {
		return new Float32Array(this.model.texels);
	};


}