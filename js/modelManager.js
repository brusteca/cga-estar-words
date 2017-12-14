'use strict';

/* Model manager loads and stores the geometry of 3d models */
class ModelManager {

	constructor(){
		this.lodBufferInfos = {};
		this.lodDistances = {};

		this.aabbInfo = {};
	}

	loadModelBufferInfo(modelId, options, ii) {
		let modelManager = this;
		let modelPath = MODEL_BASE_PATH + options.lod_files[ii].file;
		return new Promise((resolve, reject) => {
			// new model, load it and store it
			if (modelPath.endsWith('.obj')){
				K3D.load(modelPath, (obj_txt) => {
					let parsed_obj = K3D.parse.fromOBJ(obj_txt);
					let verts = K3D.edit.unwrap(parsed_obj.i_verts, parsed_obj.c_verts, 3);
					let normals = K3D.edit.unwrap(parsed_obj.i_norms, parsed_obj.c_norms, 3);
					let texels = K3D.edit.unwrap(parsed_obj.i_uvt, parsed_obj.c_uvt, 2);

					let geometry = new Float32Array(verts);
					let colors = [];
					for (var i = 0; i < verts.length; i++){
						if ((i % 3) == 0){
							colors.push(options.color.r);
						}else if ((i % 3) == 1){
							colors.push(options.color.g);
						}else{
							colors.push(options.color.b);
						}
					}
					colors = new Uint8Array(colors);
					normals = new Float32Array(normals);
					texels = new Float32Array(texels);
					let arrays = {
						// Estos nombres dependen de las variables de los shaders
						a_position: {numComponents: 3, data: geometry},
						a_color: {numComponents: 3, data: colors},
						a_normal: {numComponents: 3, data: normals},
						a_texcoord: {numComponents: 2, data: texels}
					};

					// this shouldn't be here, but it's the only time where I get to access the verts
					let minX = Infinity;
					let maxX = 0;
					let minY = Infinity;
					let maxY = 0;
					let minZ = Infinity;
					let maxZ = 0;
					 
					for (var i = 0; i < verts.length; i++){
						if ((i % 3) == 0){
							if (verts[i] < minX){
								minX = verts[i];
							}
							if (verts[i] > maxX){
								maxX = verts[i];
							}
						}else if ((i % 3) == 1){
							if (verts[i] < minY){
								minY = verts[i];
							}
							if (verts[i] > maxY){
								maxY = verts[i];
							}
						}else{
							if (verts[i] < minZ){
								minZ = verts[i];
							}
							if (verts[i] > maxZ){
								maxZ = verts[i];
							}
						}
					}

					modelManager.pushAABBInfo(modelId, minX, maxX, minY, maxY, minZ, maxZ);

					let bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);
					resolve(bufferInfo);
				});
			}else if (1){
				throw('Unsupported object format');
			}
		}).then((bufferInfo) => {
			if (!(modelId in this.lodBufferInfos)) {
				this.lodBufferInfos[modelId] = [];
				this.lodDistances[modelId] = [];
			}
			// HACK: do this for easy sorting
			bufferInfo.ESTARWORDS_lodDistance = options.lod_files[ii].max_distance;

			this.lodBufferInfos[modelId].push(bufferInfo);
			this.lodDistances[modelId].push(options.lod_files[ii].max_distance);

			this.lodBufferInfos[modelId].sort((a, b) => {
				let distance_a = a.ESTARWORDS_lodDistance;
				let distance_b = b.ESTARWORDS_lodDistance;
				if (distance_a < distance_b) {
					return -1;
				}
				if (distance_b < distance_a) {
					return 1;
				}
				return 0;
			})
			this.lodDistances[modelId].sort((a, b) => {
				if (a < b) {
					return -1;
				}
				if (b < a) {
					return 1;
				}
				return 0;
			})
		});
	}

	pushAABBInfo(modelId, minX, maxX, minY, maxY, minZ, maxZ){
		if (this.aabbInfo[modelId] == undefined){
			this.aabbInfo[modelId] = { minX : minX, maxX : maxX, minY : minY, maxY : maxY, minZ : minZ, maxZ : maxZ };
		}else{
			if (minX < this.aabbInfo[modelId].minX){
				this.aabbInfo[modelId].minX = minX;
			}
			if (maxX > this.aabbInfo[modelId].maxX){
				this.aabbInfo[modelId].maxX = maxX;
			}
			if (minY < this.aabbInfo[modelId].minY){
				this.aabbInfo[modelId].minY = minY;
			}
			if (maxY > this.aabbInfo[modelId].maxY){
				this.aabbInfo[modelId].maxY = maxY;
			}
			if (minZ < this.aabbInfo[modelId].minZ){
				this.aabbInfo[modelId].minZ = minZ;
			}
			if (maxZ > this.aabbInfo[modelId].maxZ){
				this.aabbInfo[modelId].maxZ = maxZ;
			}
		}
	}
}
