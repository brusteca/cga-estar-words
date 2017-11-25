'use strict';

class Terrain extends GameObject {
	constructor(transform) {
		super(transform);
		// setup GLSL program
		this.programInfo = twgl.createProgramInfo(gl, ["3d-vertex-shader", "3d-fragment-shader"])

		let height_data = this.getHeightData(images.heightmap, images.heightmap.width, images.heightmap.height);

		const texture_scale = 100;

		// first transform everything into vectors
		let position_buffer = [];
		let texcoord_buffer = [];

		let terrain_width = images.heightmap.height;
		let terrain_height = images.heightmap.width;
		let half_terrain_width = terrain_width / 2;
		let half_terrain_height = terrain_height / 2;

		for (let row = 0; row < terrain_width; ++row) {
			for (let col = 0; col < terrain_height; ++col) {
				let S = col / (terrain_height - 1);
				let T = row / (terrain_width - 1);

				let X = (S * terrain_width) - half_terrain_width;
				let Y = height_data[row * terrain_height + col];
				let Z = (T * terrain_height) - half_terrain_height

				position_buffer.push(v3.create(X, Y, Z));
				// TODO: v2 class?
				texcoord_buffer.push(v3.create(S * texture_scale, T * texture_scale, 0));
			}
		}


		let index_buffer = [];
		for (let row = 0; row < terrain_height; ++row) {
			for (let col = 0; col < terrain_width; ++col) {
				let current = position_buffer[row*terrain_height + col];
				if ((row < (terrain_height - 1)) && (col < (terrain_width - 1))) {
					let current = row*terrain_height + col;
					let right = row*terrain_height + col + 1;
					let below = (row + 1)*terrain_height + col;
					let diag = (row + 1)*terrain_height + col + 1;
					index_buffer.push(
						current, below, right,
						below, diag, right,
					)
				}
			}
		}

		let texcoords = [];
		let geometry = [];
		for (let ii = 0, len = index_buffer.length; ii < len; ++ii) {
			let current_vertex = position_buffer[index_buffer[ii]];
			geometry.push(
				current_vertex[0], current_vertex[1], current_vertex[2]
			);
			let current_texcoord = texcoord_buffer[index_buffer[ii]];
			texcoords.push(
				current_texcoord[0], current_texcoord[1]
			)
		}
		geometry = new Float32Array(geometry);
		texcoords = new Float32Array(texcoords);

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


		this.position_buffer = position_buffer;
		this.texcoord_buffer = texcoord_buffer;
		this.index_buffer = index_buffer;
		this.normal_buffer = normal_buffer;

		let arrays = {
			// Estos nombres dependen de las variables de los shaders
			a_position: {numComponents: 3, data: geometry},
			a_color: {numComponents: 3, data: colors},
			a_normal: {numComponents: 3, data: normals},
			a_texcoord: {numComponents: 2, data: texcoords}
		};

		this.bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);

		this.texture = twgl.createTexture(gl, {
			src: images.terrain_texture,
			wrap: gl.REPEAT,
			auto: true
		});

		// Create a terrain in cannon

		// Create the heightfield
		/*
		var hfShape = new CANNON.Heightfield(heightfield_matrix, {
			elementSize: this.transform.scale[0]
		});
		var hfBody = new CANNON.Body({
			mass: 0,
			position: new CANNON.Vec3(
				this.transform.position[0],
				this.transform.position[1],
				this.transform.position[2]
			)
		});
		hfBody.addShape(hfShape);
		// hfBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),-Math.PI/2);
		hfBody.quaternion.setFromEuler(Math.PI/2, 0, 0);
		world.physics.addBody(hfBody);
		this.physicsComponent = new PhysicsComponent(this, hfBody);
		console.log(hfBody);
		*/


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
		}

		return data;
	}

	getHeightAt(position){
		let height = -Number.MAX_SAFE_INTEGER;
		let heightmap = images.heightmap;
		let position_buffer = this.position_buffer;
		// Check if the terrain dimensions are valid
		if (heightmap.width < 2 || heightmap.height < 2) {
			return height;
		}
		// Width and height of the terrain in world units
		// let terrain_width = (heightmap.height - 1)  * this.transform.scale[1];
		// let terrain_height = (heightmap.width - 1)  * this.transform.scale[1];
		// let terrain_width = (heightmap.height - 1);
		// let terrain_height = (heightmap.width - 1);
		let terrain_width = (heightmap.height);
		let terrain_height = (heightmap.width);
		let half_terrain_width = terrain_width / 2.0;
		let half_terrain_height = terrain_height / 2.0;

		// Multiple the position by the inverse of the terrain matrix
		// to get the position in terrain local space
		let terrain_position = m4.transformPoint(this.transform.inverseTransformMatrix, position);

		// Calculate an offset and scale to get the vertex indices
		let offset = v3.create(half_terrain_width, 0, half_terrain_height);
		// Get the 4 vertices that make up the triangle we're over
		let vertex_indices = v3.add(terrain_position, offset, offset);
		// vertex_indices = terrain_position;
		let u0 = Math.floor(vertex_indices[0]);
		let u1 = u0 + 1;
		let v0 = Math.floor(vertex_indices[2]);
		let v1 = v0 + 1;

		if (u0 >= 0 && u1 < heightmap.width && v0 >= 0 && v1 < heightmap.height) {
			// Top-left vertex
			let p00 = position_buffer[(v0 * heightmap.height) + u0];
			// Top-right vertex
			let p10 = position_buffer[(v0 * heightmap.height) + u1];
			// Bottom-left vertex
			let p01 = position_buffer[(v1 * heightmap.height) + u0];
			 // Bottom-right vertex
			let p11 = position_buffer[(v1 * heightmap.height) + u1];

			// Which triangle are we over?
			let percentU = vertex_indices[0] - u0;
			let percentV = vertex_indices[2] - v0;

			let dU, dV;

			if (percentU > percentV) {
				// Top triangle
				dU = v3.subtract(p10, p00);
				dV = v3.subtract(p11, p10);
			} else {
				// Bottom triangle
				dU = v3.subtract(p11, p01);
				dV = v3.subtract(p01, p00);
			}

			v3.mulScalar(dU, percentU, dU);
			v3.mulScalar(dV, percentV, dV);
			let height_position = v3.add(v3.add(dU, dV, dU), p00, dU);
			m4.transformPoint(this.transform.transformMatrix, height_position, height_position);
			height = height_position[1];
		}
		return height;
	}
}
