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

let paused = false;

function main() {

	document.getElementById('glCanvas').style.display = "block";
	document.getElementById('2dCanvas').style.display = "none";

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

	let numLights = 16;
	let pointLightPositions = [
		-80, 30, 58,
		-250, 60, 50,
		-550, 60, 150,
		0, 0, 0,
		0, 0, 0,
		0, 0, 0,
		0, 0, 0,
		0, 0, 0,
		0, 0, 0,
		0, 0, 0,
		0, 0, 0,
		0, 0, 0,
		0, 0, 0,
		0, 0, 0,
		0, 0, 0,
		0, 0, 0
	];
	let pointLightColors = [
		0.3, 0, 0.6,
		0, 0.5, 0,
		0.8, 0, 0,
		0, 0, 0,
		0, 0, 0,
		0, 0, 0,
		0, 0, 0,
		0, 0, 0,
		0, 0, 0,
		0, 0, 0,
		0, 0, 0,
		0, 0, 0,
		0, 0, 0,
		0, 0, 0,
		0, 0, 0,
		0, 0, 0
	];
	for (let ii = 0; ii < numLights*3; ii+=3) {
		world.pointLights.push(new PointLight(
			new Transform(
				v3.create(
					pointLightPositions[ii],
					pointLightPositions[ii+1],
					pointLightPositions[ii+2],
				)
			),
			[
				pointLightColors[ii],
				pointLightColors[ii+1],
				pointLightColors[ii+2]
			]
		));
	}

	//world.cameraPosition = config.camera.position || [0,0,0];
	/*
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
	*/
	/*
	world.gameObjects.push(new Floor(new Transform(
		v3.create(0,-70,0),
		m4.create(),
		v3.create(1, 1, 1)
	)));
	*/
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
		var model = parseModel(configModel, config.modelDefaults[configModel.type]);
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

			world.handleInput(keyStatus);

			if (!paused){
				lag += elapsed;

				while (lag >= MS_PER_UPDATE) {
					update(MS_PER_UPDATE);
					lag -= MS_PER_UPDATE;
				}
			    draw();				
			}

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

	function parseModel(configModel, modelDefaults){
		var texture = modelDefaults.texture == undefined? null : (TEXTURE_BASE_PATH + modelDefaults.texture);
		var color = configModel.color || modelDefaults.color || {};
		var configTransform = configModel.transform || {};
		var translate = configTransform.translate || {};
		var rotation = configTransform.rotation || {};
		var scale = configTransform.scale || {};
		var rotationMatrix = m4.create();
		m4.rotateX(rotationMatrix, rotation.x || 0, rotationMatrix);
		var transform = new Transform(
			v3.create(translate.x || 0 ,translate.y || 0, translate.z || 0),
			rotationMatrix,
			v3.create(scale.x || 1, scale.y || 1, scale.z || 1)
		);
		var script = config.scripts[configModel.script] || [];
		var model = instanciateModel(configModel.type, MODEL_BASE_PATH + modelDefaults.file, texture, transform, script);
		model.color.r = color.r == undefined? 255 : color.r; // default
		model.color.g = color.g == undefined? 255 : color.g; // is YELLOW
		model.color.b = color.b == undefined? 0   : color.b;

		model.frontDirection = v3.create(modelDefaults.front.x, modelDefaults.front.y, modelDefaults.front.z);
		return model;
	}

	function instanciateModel(modelType, modelPath, texturePath, transform, script){
		switch (modelType){
			case "tie":
			case "falcon":
				return new Ship(modelPath, texturePath, transform, script);
				break;
		}
		return null; // breaks the caller, but we will know :)
	}

}

var keyStatus = [];

for (var i = 0; i < 255; i++){
	keyStatus.push({ pressed : false });
}

document.onfocus = function(){
	
}

document.onblur = function(){
	for (var i = 0; i < keyStatus.length; i++){
		keyStatus[i].pressed = false;
		keyStatus[i].justPressed = false;
	}
}

document.onkeyup = function(event){
	keyStatus[event.keyCode].pressed = false;
	keyStatus[event.keyCode].justPressed = false;
}

document.onkeydown = function(event){
	keyStatus[event.keyCode].pressed = true;
	keyStatus[event.keyCode].justPressed = true;
}



function preloader(){
	let img;
	let canvas = document.getElementById('2dCanvas');
	let context = canvas.getContext('2d');
	
	canvas.height = window.innerHeight;
	canvas.width = window.innerWidth;	percentLoaded = 0;
	
	for (img in config.resources.textures){
		percentLoaded += (images[img].request.percentLoaded == undefined)? 0 : images[img].request.percentLoaded;
	}
	/*
	for (snd in soundSources){
		percentLoaded += (sounds[snd].request.percentLoaded == undefined)? 0 : sounds[snd].request.percentLoaded;
	}*/
	percentLoaded = percentLoaded / assetCount;	

	context.clearRect(0, 0, canvas.width, canvas.height);
	context.fillStyle = "black";
	context.fillRect(0, 0, canvas.width, canvas.height);

	var title = "ESTAR WORDS";
	var textFont = "deathstar";
	var fontSize = canvas.height * 0.1;
	context.fillStyle = "red";
	fontSize = constraintFontToWidth(context, title , textFont, fontSize, canvas.width * 0.9);
	context.font = (fontSize) + "px " + textFont;
	context.textAlign = "center";
	context.textBaseline = "top";
	context.fillText(title, canvas.width / 2, canvas.height * 0.1);

	context.fillStyle = "red";
	context.beginPath();
	context.arc(canvas.width * 0.2, canvas.height * 0.5, canvas.height * 0.02, 0, 2 * Math.PI);
	context.arc(canvas.width * 0.8, canvas.height * 0.5, canvas.height * 0.02, 0, 2 * Math.PI);
	context.fill();

	// override with background color
	context.beginPath();
	context.fillStyle = "black";
	context.fillRect(canvas.width * 0.2, canvas.height * 0.48, canvas.width * 0.6, canvas.height * 0.04);

	context.fillStyle = "red";
	context.fillRect(canvas.width * 0.2, canvas.height * 0.48, canvas.width * 0.6 * percentLoaded, canvas.height * 0.04);

	var fontSize = canvas.height * 0.03;
	context.font = (fontSize) + "px " + textFont;
	context.textAlign = "center";
	context.textBaseline = "top";
	context.fillText(Math.floor(percentLoaded * 100) + "%", canvas.width * 0.5, canvas.height * 0.55);

	if (loadingImages){
		requestAnimationFrame(preloader);
	}

}

let images = [];
let assetCount = 0;
let percentLoaded = 0;
let loadingImages = true;
let loadedAssets = 0;

function loadResources(initGame){
	let img;

	for (img in config.resources.textures){
		assetCount++;
	}
	for (img in config.resources.textures){
		images[img] = document.createElement('img');
		images[img].source = config.resources.textures[img];
		images[img].load = function(){
			loadedAssets++;
			if (loadedAssets == assetCount){
				loadingImages = false;
				initGame();
			}
		}
		images[img].request = new XMLHttpRequest();
		images[img].request.img = images[img];
        images[img].request.onprogress = function(event){
        	if (event.lengthComputable){
		        this.percentLoaded = event.loaded / event.total;
		    }
        }
        images[img].request.onloadend = function(){
        	this.img.onload = function(){
        		this.load();
        	}

        	if (this.img.source.endsWith('.svg')){
	        	this.img.src = "data:image/svg+xml;base64," + base64Encode(this.responseText);
        	}else{
	        	this.img.src = "data:image/png;base64," + base64Encode(this.responseText);
        	}
        	
        }
        images[img].request.open("GET", config.resources.textures[img], true);
        images[img].request.overrideMimeType('text/plain; charset=x-user-defined'); 
        images[img].request.send(null);
	}
	/*
	for (snd in soundSources){
		sounds[snd] = {};
		sounds[snd].sound = new Audio(soundSources[snd]);
	}*/
	requestAnimationFrame(preloader);
}

