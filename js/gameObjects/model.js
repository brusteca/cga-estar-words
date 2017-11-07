'use strict';

class Model extends GameObject{
	
	constructor(model, transform) {
		super(transform);

		this.modelLoaded = false;
		this.model = null;
		this.ready = false;
		// to do: is it necesary for the model to store all the information of the object (geometry, normals, textures)?
		modelManager.getModelGeometry(model).then((model) => {
			this.modelLoaded = true;
			this.model = model;
			this.initialize();
			this.ready = true;
		});
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
		if (this.ready){
			super.draw(viewProjectionMatrix, worldMatrix);
		}
	}



	getGeometry() {
		return new Float32Array(this.model.verts);
	};

	getColors() {
		var colors = [];
		for (var i = 0; i < this.model.verts.length; i++){
			colors.push(100);
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