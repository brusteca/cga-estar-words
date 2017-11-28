'use strict';

/* Model manager loads and stores the geometry of 3d models */
class ModelManager {

	constructor(){
		this.models = {};
		this.bufferInfos = {};
	}

	// DEPRECATED
	getModelGeometry(modelPath){
		return new Promise((resolve, reject) => {
			if (this.models[modelPath] == undefined){
				// new model, load it and store it
				if (modelPath.endsWith('.obj')){
					K3D.load(modelPath, function(obj_txt){
						var parsed_obj = K3D.parse.fromOBJ(obj_txt);
						var object = {};
						object.verts = K3D.edit.unwrap(parsed_obj.i_verts, parsed_obj.c_verts, 3);
						   object.normals = K3D.edit.unwrap(parsed_obj.i_norms, parsed_obj.c_norms, 3);
						   object.texels = K3D.edit.unwrap(parsed_obj.i_uvt, parsed_obj.c_uvt, 2);
						console.log(object);
						   resolve(object);
					});
				}else if (1){

				}
			}else{
				resolve(this.models[modelPath]);
			}
		});
	}

	loadModelBufferInfo(modelId, options) {
		let modelPath = MODEL_BASE_PATH + options.file;
		console.log(modelPath);
		return new Promise((resolve, reject) => {
			// new model, load it and store it
			if (modelPath.endsWith('.obj')){
				K3D.load(modelPath, function(obj_txt){
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
					let bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);
					resolve(bufferInfo);
				});
			}else if (1){
				throw('Unsupported object format');
			}
		}).then((bufferInfo) => {
			this.bufferInfos[modelId] = bufferInfo;
		});
	}

}
