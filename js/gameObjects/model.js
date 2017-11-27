'use strict';

class Model extends GameObject{
	
	constructor(modelPath, texturePath, transform, script) {
		super(transform);

		this.modelLoaded = false;
		this.model = null;
		// to do: is it necesary for the model to store all the information of the object (geometry, normals, textures)?
		modelManager.getModelGeometry(modelPath).then((model) => {
			this.modelLoaded = true;
			this.model = model;
			this.initialize();
		});

		// set texture and color
		
		this.useTexture = false;
		this.texture = twgl.createTexture(gl, {src: texturePath}, (error, texture) => {
			if (!error){
				this.useTexture = true;
			} 
		});			
		this.color = { r : 0, g : 0, b : 0};

		if (script != null){
			this.inputComponent = new ScriptInputComponent(script);
		}
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
			if ((i % 3) == 0){
				colors.push(this.color.r);
			}else if ((i % 3) == 1){
				colors.push(this.color.g);
			}else{
				colors.push(this.color.b);
			}
		}
		return new Uint8Array(colors);
	};

	getNormals() {
		return new Float32Array(this.model.normals);
	};

	getTextureCoords() {
		return new Float32Array(this.model.texels);
	};

	getFrontDirection() {
		// to do: multiply by rotation matrix
		return this.frontDirection;
	}
}