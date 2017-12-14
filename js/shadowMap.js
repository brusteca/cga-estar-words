'use strict';

const shadowMapTextureWidth = 256;
const shadowMapTextureHeight = 256;
const shadowMapTextureLevel = 0;
const shadowMapTextureBorder = 0;
let up = [0, 1, 0]; 

class ShadowMap {
	constructor() {
		// matrixes used in the projection
		this.lightCameraMatrix = null;
		this.lightViewMatrix = null;
		this.lightViewProjectionMatrix = m4.create();

		// framebuffer used to render shadowmapping, and shadowmap texture
		this.shadowMapTexture = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, this.shadowMapTexture);
		// configure the depth texture
		gl.texImage2D(gl.TEXTURE_2D, shadowMapTextureLevel, gl.DEPTH_COMPONENT, shadowMapTextureWidth, shadowMapTextureHeight, shadowMapTextureBorder, gl.DEPTH_COMPONENT, gl.UNSIGNED_SHORT, null);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

		this.fbo = gl.createFramebuffer();
		gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbo); 
		// attach the texture as the first color attachment
		const attachmentPoint = gl.DEPTH_ATTACHMENT;
		gl.framebufferTexture2D(gl.FRAMEBUFFER, attachmentPoint, gl.TEXTURE_2D, this.shadowMapTexture, shadowMapTextureLevel);

		this.useShadowMap = false;
	}

};