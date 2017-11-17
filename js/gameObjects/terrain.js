'use strict';

class Terrain extends GameObject {
	constructor(transform) {
		super(transform);
		// setup GLSL program
		this.programInfo = twgl.createProgramInfo(gl, ["3d-vertex-shader", "3d-fragment-shader"])

		let height_data = this.getHeightData(images.heightmap, images.heightmap.width, images.heightmap.height);

		// first transform everything into vectors
		let vertices = [];
		let len_rows = images.heightmap.height;
		let len_cols = images.heightmap.width;
		let center_coord = {
			row: len_rows / 2,
			col: len_cols / 2
		};
		for (let row = 0; row < len_rows; ++row) {
			for (let col = 0; col < len_cols; ++col) {
				let v = v3.create(
					row - center_coord.row,
					height_data[row*len_rows + col],
					col - center_coord.col
				);
				vertices.push(v);
			}
		}
		console.log(vertices.length);
		let normals = [];
		/*
		// fuck this I'll solve it later
		let aux = v3.create();
		for (let row = 0; row < len_rows; ++row) {
			for (let col = 0; col < len_cols; ++col) {
				let current = vertices[row*len_rows + col];
				if (row > 0 && row < len_rows - 1 && col > 0 && col < len_cols - 1) {
					let adjacent = [
						vertices[(row-1)*len_rows + col-1],
						vertices[(row-1)*len_rows + col],
						vertices[(row-1)*len_rows + col+1],
						vertices[(row)*len_rows + col-1],
						vertices[(row)*len_rows + col+1],
						vertices[(row+1)*len_rows + col-1],
						vertices[(row+1)*len_rows + col],
						vertices[(row+1)*len_rows + col+1]
					];
					let normal = v3.create();
					for (let ii = 0, len = adjacent.length; ii < len; ++ii) {
						v3.subtract(current, adjacent[ii], aux);
						v3.add(normal, aux, normal);
					}
					v3.normalize(normal, normal);
					normals.push(normal);
				} else {
					// brute force edge cases because I don't want to think
					normals.push(v3.create(0, 1, 0));
				}
			}
		}
		*/

		let geometry = [];

		for (let row = 0; row < len_rows; ++row) {
			for (let col = 0; col < len_cols; ++col) {
				let current = vertices[row*len_rows + col];
				if ((row < (len_rows - 1)) && (col < (len_cols - 1))) {
					let current = vertices[row*len_rows + col];
					let right = vertices[row*len_rows + col + 1];
					let below = vertices[(row + 1)*len_rows + col];
					let diag = vertices[(row + 1)*len_rows + col + 1];
					geometry.push(
						below[0], below[1], below[2],
						current[0], current[1], current[2],
						right[0], right[1], right[2],

						diag[0], diag[1], diag[2],
						below[0], below[1], below[2],
						right[0], right[1], right[2],
					)
				}
			}
		}
		geometry = new Float32Array(geometry);

		for (let ii = 0, len = geometry.length / 3; ii < len; ++ii) {
			normals.push(0, 1, 0);
		}
		// normals = new Float32Array(
		// 	[].concat.apply([], normals.map(
		// 		normal =>  [normal[0], normal[1], normal[2]]
		// 	))
		// );
		normals = new Float32Array(normals);

		let colors = [];
		for (let ii = 0, len = geometry.length; ii < len; ++ii) {
			// colors.push(Math.floor(Math.random() * 255));
			colors.push(128);
		}
		colors = new Uint8Array(colors);

		let texcoords = [];
		for (let ii = 0, len = geometry.length/2; ii < len; ++ii) {
			texcoords.push(0, 0);
		}
		texcoords = new Float32Array(texcoords);

		console.log(geometry.length);
		console.log(normals.length);
		console.log(colors.length);

		console.log(geometry);

		let arrays = {
			// Estos nombres dependen de las variables de los shaders
			a_position: {numComponents: 3, data: geometry},
			a_color: {numComponents: 3, data: colors},
			a_normal: {numComponents: 3, data: normals},
			a_texcoord: {numComponents: 2, data: texcoords}
		};

		this.bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);

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
