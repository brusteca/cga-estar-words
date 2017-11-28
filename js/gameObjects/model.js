'use strict';

class Model extends GameObject{

	constructor(modelId, textureId, transform, script) {
		super(transform);

		// setup GLSL program
		this.programInfo = twgl.createProgramInfo(gl, ["3d-vertex-shader", "3d-fragment-shader"]);

		this.bufferInfo = modelManager.bufferInfos[modelId];

		// set texture
		if (textureId in textureManager.textures) {
			this.texture = textureManager.textures[textureId];
			this.useTexture = true;
		} else {
			this.texture = null;
			this.useTexture = false;
		}

		this.behaviorComponent.instructions = script;
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
