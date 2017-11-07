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

const MODEL_BASE_PATH = "resources/models/";
const TEXTURE_BASE_PATH = "resources/textures/";

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

	world = new World(config.globalEvents);

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

	/*
	var fox = new Model("resources/models/x-wing.obj", "resources/textures/fox_texture.png", new Transform(
		v3.create(-300,-70,300),
		m4.create(),
		v3.create(0.2, 0.2, 0.2)
	));
	world.gameObjects.push(fox);
	*/

	for (var i = 0; i < config.models.length; i++){
		var configModel = config.models[i];
		var model = parseModel(configModel);
		world.gameObjects.push(model);
	}
	/*
	var milleniumFalcon = new Model("resources/models/millenium-falcon.obj", "resources/textures/falcon.jpg", new Transform(
		v3.create(-600,-50,600),
		m4.create(),
		v3.create(0.2, 0.2, 0.2)
	));
	world.gameObjects.push(milleniumFalcon);
	*/

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

		let radius = 250;
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
	    //var cameraMatrix = m4.lookAt(cameraPosition, centerPosition, up);	
		var cameraMatrix = m4.lookAt(world.getCameraPosition(), world.getViewportCenter(), world.getViewportUpVector());

	    // Make a view matrix from the camera matrix
	    var viewMatrix = m4.inverse(cameraMatrix);

	    // Compute a view projection matrix
	    //var viewProjectionMatrix = m4.multiply(projectionMatrix, viewMatrix);
	    var viewProjectionMatrix = m4.multiply(world.getProjectionMatrix(), viewMatrix);

		for (let ii = 0, len = world.gameObjects.length; ii < len; ++ii) {
			world.gameObjects[ii].draw(viewProjectionMatrix);
		}
	}

	function update(ms){
		//cameraAngleRadians = degreesToRadians( (radiansToDegrees(cameraAngleRadians) + 0.3) % 360);
		world.update(ms * 0.001); // update in seconds!
	}

	function parseModel(configModel){
		var color = configModel.color || {};
		var configTransform = configModel.transform || {};
		var translate = configTransform.translate || {};
		var rotation = configTransform.rotation || {};
		var scale = configTransform.scale || {};
		var texture = configModel.texture == undefined? null : (TEXTURE_BASE_PATH + configModel.texture);
		var transform = new Transform(
			v3.create(translate.x || 0 ,translate.y || 0, translate.z || 0),
			m4.create(),
			v3.create(scale.x || 1, scale.y || 1, scale.z || 1)
		);
		var model = new Model(MODEL_BASE_PATH + configModel.model, texture, transform);
		model.color.r = color.r == undefined? 255 : color.r; // default  
		model.color.g = color.g == undefined? 255 : color.g; // is YELLOW
		model.color.b = color.b == undefined? 0   : color.b;
		return model;
	}

}



