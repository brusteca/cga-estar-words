'use strict';

class Terrain extends GameObject {
	constructor(transform) {
		super(transform);
		// setup GLSL program
		this.programInfo = twgl.createProgramInfo(gl, ["3d-vertex-shader", "3d-fragment-shader"])

		let height_data = this.getHeightData(images.heightmap, images.heightmap.width, images.heightmap.height);

		// first transform everything into vectors
		let position_buffer = [];
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
				position_buffer.push(v);
			}
		}

		let index_buffer = [];
		for (let row = 0; row < len_rows; ++row) {
			for (let col = 0; col < len_cols; ++col) {
				let current = position_buffer[row*len_rows + col];
				if ((row < (len_rows - 1)) && (col < (len_cols - 1))) {
					let current = row*len_rows + col;
					let right = row*len_rows + col + 1;
					let below = (row + 1)*len_rows + col;
					let diag = (row + 1)*len_rows + col + 1;
					index_buffer.push(
						below, current, right,
						diag, below, right,
					)
				}
			}
		}

		let geometry = [];
		for (let ii = 0, len = index_buffer.length; ii < len; ++ii) {
			let current = position_buffer[index_buffer[ii]];
			geometry.push(
				current[0], current[1], current[2]
			)
		}
		geometry = new Float32Array(geometry);

		let normal_buffer = [];
		for (let ii = 0, len = index_buffer.length; ii < len; ii += 3) {
			normal_buffer.push(v3.create());
		}
		let normal = v3.create();
		let aux1 = v3.create();
		let aux2 = v3.create();
		for (let ii = 0, len = index_buffer.length; ii < len; ii += 3) {
			let v0 = position_buffer[index_buffer[ii]];
			let v1 = position_buffer[index_buffer[ii + 1]];
			let v2 = position_buffer[index_buffer[ii + 2]];

			v3.subtract(v1, v0, aux1);
			v3.subtract(v2, v0, aux2);
			v3.cross(aux1, aux2, normal);
			v3.normalize(normal, normal);

			v3.add(normal, normal_buffer[index_buffer[ii]],
				   normal_buffer[index_buffer[ii]]);
			v3.add(normal, normal_buffer[index_buffer[ii + 1]],
				   normal_buffer[index_buffer[ii + 1]]);
			v3.add(normal, normal_buffer[index_buffer[ii + 2]],
				   normal_buffer[index_buffer[ii + 2]]);
		}
		for (let ii = 0, len = index_buffer.length; ii < len; ii += 1) {
			v3.normalize(normal_buffer[index_buffer[ii]],
				 		 normal_buffer[index_buffer[ii]]);
		}


		let normals = [];
		for (let ii = 0, len = index_buffer.length; ii < len; ++ii) {
			let current = normal_buffer[index_buffer[ii]];
			normals.push(
				current[0], current[1], current[2]
			)
		}
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
