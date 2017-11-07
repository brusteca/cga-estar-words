'use strict';

const canvas = document.getElementById('glCanvas');
const gl = canvas.getContext('webgl');

const v3 = twgl.v3;
const m3 = twgl.m3;
const m4 = twgl.m4;

const MS_PER_UPDATE = 1000 / 60;

let cameraAngleRadians = degreesToRadians(0);
let fieldOfViewRadians = degreesToRadians(60);

let modelManager = new ModelManager();

let world = null;

function main() {
	// Only continue if WebGL is available and working
	if (!gl) {
		alert("Unable to initialize WebGL. Your browser or machine may not support it.");
		return;
	}
	// Set clear color to black, fully opaque
	gl.clearColor(1.0, 1.0, 1.0, 1.0);
	// Clear the color buffer with specified clear color
	gl.clear(gl.COLOR_BUFFER_BIT);

	world = new World();

	// world.gameObjects.push(new GameObject(new Transform(
	// 	v3.create(1, 1, 1)
	// )));

	let numFs = 8;
	let radius = 200;
	let center = v3.create(1,1,1);

	for (let ii = 0; ii < numFs; ++ii) {
		let angle = ii * Math.PI * 2 / numFs;
		let x = Math.cos(angle) * radius;
		let y = Math.sin(angle) * radius;

		world.gameObjects.push(new Efe(new Transform(
			v3.add(center, v3.create(x, 0, y))
		)));
	}
	world.gameObjects.push(new Floor(new Transform(
		v3.create(0,-70,0),
		m4.create(),
		v3.create(1, 1, 1)
	)));

	var fox = new Model("resources/models/fox.obj", new Transform(
		v3.create(0,-70,0),
		m4.create(),
		v3.create(1, 1, 1)
	));
	world.gameObjects.push(fox);

	requestAnimationFrame(initLoop)

	function initLoop(timestamp) {
		let previous = timestamp;
		let lag = 0;

		requestAnimationFrame(mainLoop);

		function mainLoop(timestamp) {

			let current = timestamp;
			let elapsed = current - previous;
			previous = current;
			lag += elapsed;

			while (lag >= MS_PER_UPDATE) {
				update(MS_PER_UPDATE);
				lag -= MS_PER_UPDATE;
			}
		    draw();

		    requestAnimationFrame(mainLoop);
		}

	}



	function draw() {
		twgl.resizeCanvasToDisplaySize(gl.canvas);

	    // Tell WebGL how to convert from clip space to pixels
	    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

	    // Clear the canvas AND the depth buffer.
	    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	    // Turn on culling. By default backfacing triangles
	    // will be culled.
	    gl.enable(gl.CULL_FACE);

	    // Enable the depth buffer
	    gl.enable(gl.DEPTH_TEST);

	    // Compute the projection matrix
	    var aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
	    var zNear = 1;
	    var zFar = 2000;
	    var projectionMatrix = m4.perspective(fieldOfViewRadians, aspect, zNear, zFar);

		let radius = 200;
	    // Compute the position of the first F
	    var centerPosition = [0, 0, 0];

	    // Use matrix math to compute a position on a circle where
	    // the camera is
	    var cameraMatrix = m4.rotationY(cameraAngleRadians);
	    cameraMatrix = m4.translate(cameraMatrix, v3.create(0, 0, radius * 1.5));

	    // Get the camera's postion from the matrix we computed
	    var cameraPosition = [
	      cameraMatrix[12],
	      cameraMatrix[13],
	      cameraMatrix[14],
	    ];

	    var up = [0, 1, 0];

	    // Compute the camera's matrix using look at.
	    var cameraMatrix = m4.lookAt(cameraPosition, centerPosition, up);

	    // Make a view matrix from the camera matrix
	    var viewMatrix = m4.inverse(cameraMatrix);

	    // Compute a view projection matrix
	    var viewProjectionMatrix = m4.multiply(projectionMatrix, viewMatrix);

		for (let ii = 0, len = world.gameObjects.length; ii < len; ++ii) {
			world.gameObjects[ii].draw(viewProjectionMatrix);
		}
	}

	function update(ms_per_update){
		cameraAngleRadians = degreesToRadians( (radiansToDegrees(cameraAngleRadians) + 0.3) % 360);

		for (let ii = 0, len = world.gameObjects.length; ii < len; ++ii) {
			world.gameObjects[ii].update(ms_per_update);
		}
	}
}


/*
    Parses an .obj model and loads it into the scene.

    Applies any transform present in 'model_config' to the loaded mesh.

Control.parse_obj_model = function(obj_txt, model_config, start_when_finished){
    var parsed_obj = K3D.parse.fromOBJ(obj_txt);

    // save the generated triangles in the config
    var model_name = model_config.name;

    for (var i = 0; i < parsed_obj.i_verts.length; i+=3){
        var verts = [];
        var normals = [];
        var texture_coordinates = [];
        var has_texture = false;
        var has_normals = true;

        // in a .obj model, verts are expressed in counterclockwise order
        for (var j = 2; j >= 0; j--){
            var v_i = parsed_obj.i_verts[i + j] * 3; // vertex index
            var n_i = parsed_obj.i_norms[i + j] * 3; // normal index
            var t_i = parsed_obj.i_uvt[i + j] * 2; // texture index

            var x = parsed_obj.c_verts[v_i];
            var y = parsed_obj.c_verts[v_i+1];
            var z = parsed_obj.c_verts[v_i+2];

            verts.push(new Vector(x,y,z));

            if (isNaN(n_i)){
                has_normals = false;
            }else{
                x = parsed_obj.c_norms[n_i];
                y = parsed_obj.c_norms[n_i+1];
                z = parsed_obj.c_norms[n_i+2];

                normals.push(new Vector(x,y,z));                
            }

            if (!isNaN(t_i)){
                var u = parsed_obj.c_uvt[t_i];
                var v = parsed_obj.c_uvt[t_i + 1];
                texture_coordinates.push([u,v]);
                has_texture = (model_config.texture != "");
            }
        }

        // scale and rotate
        for (var k = 0; k < verts.length; k++){
            verts[k] = Vector.fromArray(math.multiply(verts[k].toArray(),transform_matrix)._data);
            if (has_normals)
                normals[k] = Vector.fromArray(math.multiply(normals[k].toArray(),rotation_matrix)._data);
        }   
        // translate object
        for (var k = 0; k < verts.length; k++){
            verts[k].x += model_config.transform.translate.x;
            verts[k].y += model_config.transform.translate.y;
            verts[k].z += model_config.transform.translate.z;
        }

        var t = new Triangle(verts, null, color, 1, color, false, 0, 0);
        t.has_texture = has_texture;
        t.texture_coordinates = texture_coordinates;
        t.texture_name = model_config.texture;

        // calculate normal at the baricenter of the triangle
        if (has_normals){
            t.set_normals(normals);
        }

    }

    */