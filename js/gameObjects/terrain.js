'use strict';

class Terrain extends GameObject {
	constructor(transform) {
		super(transform);
		// setup GLSL program
		this.programInfo = twgl.createProgramInfo(gl, ["3d-vertex-shader", "3d-fragment-shader"])


		let img_width = 4096;
		let img_height = 4096;
		let img = new Image(img_width, img_height);
		img.src = 'resources/heightmaps/heightmap_Poland_4096x4096_16c.png'
		let height_data = this.getHeightData(img, img_width, img_height)
		console.log(height_data);
		let max = -99999;
		let min = 99999;
		for (let ii = 0; ii < height_data.length; ++ii) {
			if (height_data[ii] > max) {
				max = height_data[ii];
			}
			if (height_data[ii] < min) {
				min = height_data[ii];
			}
		}
		console.log(max);
		console.log(min);

		return;
		let arrays = {
			// Estos nombres dependen de las letiables de los shaders
			a_position: {numComponents: 3, data: this.getGeometry()},
			a_color: {numComponents: 3, data: this.getColors()},
			a_normal: {numComponents: 3, data: this.getNormals()},
			a_texcoord: {numComponents: 2, data: this.getTextureCoords()}
		};

		this.bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);

		this.texture = twgl.createTexture(gl, {
			src: 'resources/textures/dea60ce67a5bb55100ba6a7b1b1620fe.jpg',
			wrap: gl.REPEAT,
			auto: true
		});
	};

	getHeightData(img, img_width, img_height) {
		let canvas = document.createElement('canvas');
		canvas.width = img_width;
		canvas.height = img_height;
		let context = canvas.getContext('2d');

		let size = img_width * img_height;
		let data = new Float32Array(size);

		context.drawImage(img, 0, 0);

		for ( let ii = 0; ii < size; ++ii ) {
			data[ii] = 0
		}

		let imgd = context.getImageData(0, 0, img_width, img_height);
		let pix = imgd.data;

		let jj = 0;
		for (let ii = 0, len = pix.length; ii < len; ii += (4)) {
			let all = pix[ii] + pix[ii+1] + pix[ii+2];
			data[jj++] = all / (3 * 255);
			// data[jj++] = pix[ii];
		}

		return data;
	}
}
