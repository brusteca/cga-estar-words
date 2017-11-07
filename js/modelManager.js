'use strict';

/* Model manager loads and stores the geometry of 3d models */
class ModelManager {
	
	constructor(){
		this.models = {};
	}

	getModelGeometry(modelPath){
		return  new Promise((resolve, reject) => {
			if (this.models[modelPath] == undefined){
				// new model, load it and store it
		        K3D.load(modelPath, function(obj_txt){
		        	var parsed_obj = K3D.parse.fromOBJ(obj_txt);
		        	var object = {};
		        	object.verts = K3D.edit.unwrap(parsed_obj.i_verts, parsed_obj.c_verts, 3);
              	 	object.normals = K3D.edit.unwrap(parsed_obj.i_norms, parsed_obj.c_norms, 3);
              	 	object.texels = K3D.edit.unwrap(parsed_obj.i_uvt, parsed_obj.c_uvt, 2);
              	 	resolve(object);
		        });
			}else{
				resolve(this.models[modelPath]);
			}
		});
	}

}


