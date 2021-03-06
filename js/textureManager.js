'use strict';

/* Texture manager loads and stores the textures */
class TextureManager {
	constructor() {
		this.textures = {};
	}

	loadTexture(textureId, options) {
		this.textures[textureId] = twgl.createTexture(gl, options);
	}
}
