'use strict';

class Model extends GameObject{

	constructor(modelId, textureId, transform, options={}, lodDistances=[-1]) {
		super(transform);

		if (options.script) {
			if (options.script in config.scripts) {
				// copy the script because it may be modified
				let script = deepCopy(config.scripts[options.script]);
				this.inputComponent = new ScriptInputComponent(script);
			} else {
				throw 'Script ' + options.script + ' not in config.scripts'
			}
		}

		// setup GLSL program
		this.programInfo = shaderManager.programInfos['default'];
		if (modelId in modelManager.lodBufferInfos) {
			this.lodBufferInfos = modelManager.lodBufferInfos[modelId];
			this.lodDistances = modelManager.lodDistances[modelId]
		} else {
			throw('Model "' + modelId + '" not in modelManager')
		}

		// set texture
		if (textureId in textureManager.textures) {
			this.texture = textureManager.textures[textureId];
			this.useTexture = true;
		} else {
			this.texture = null;
			this.useTexture = false;
		}

		//for memory savings
		this.vaux1 = v3.create();
		this.vaux2 = v3.create();
	};

	update(delta) {
		super.update(delta);
		if (this.lodDistances.length > 1) {
			let myPosition = this.transform.getWorldPosition(this.vaux1);
			let cameraPosition = world.getCameraPosition(this.vaux2);
			let distance = v3.distance(myPosition, cameraPosition);
			for (let ii = 0, len = this.lodDistances.length; ii < len; ++ii) {
				if (distance < this.lodDistances[ii] || ii == len - 1) {
					this.bufferInfo = this.lodBufferInfos[ii];
					break;
				}
			}
		} else {
			this.bufferInfo = this.lodBufferInfos[0];
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
		return this.frontDirection;
	}
}
