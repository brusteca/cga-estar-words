'use strict';

const canvas = document.getElementById('glCanvas');
const gl = canvas.getContext('webgl', { alpha : false, premultipliedAlpha : false });

const v3 = twgl.v3;
const m3 = twgl.m3;
const m4 = twgl.m4;

const MS_PER_UPDATE = 1000 / 60;

let cameraAngleRadians = degreesToRadians(0);
let fieldOfViewRadians = degreesToRadians(60);

let modelManager = new ModelManager();
let textureManager = new TextureManager();
let shaderManager = new ShaderManager();

let world = null;

// const MODEL_BASE_PATH = "resources/models/";
const MODEL_BASE_PATH = "";
const TEXTURE_BASE_PATH = "resources/textures/";

let paused = false;
let gameTime = 0;

let STATIC_LIGHT_COUNT = 0;
let DYNAMIC_LIGHT_COUNT = 0;

function main() {

	document.getElementById('glCanvas').style.display = "block";
	document.getElementById('2dCanvas').style.display = "none";

	// Only continue if WebGL is available and working
	if (!gl) {
		alert("Unable to initialize WebGL. Your browser or machine may not support it.");
		return;
	}
	// Set clear color to black, fully opaque
	gl.clearColor(0.0, 0.0, 0.0, 1.0);

	 // Turn on culling. By default backfacing triangles
    // will be culled.
    gl.enable(gl.CULL_FACE);

    // Enable the depth buffer
    gl.enable(gl.DEPTH_TEST);

    // alpha blending!
    gl.colorMask(1, 1, 1, 1);
	gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.enable(gl.BLEND);

	world = new World(config.globalEvents, config.camera.position);

	let numLights = 16;
	STATIC_LIGHT_COUNT = 3;
	DYNAMIC_LIGHT_COUNT = numLights - STATIC_LIGHT_COUNT;
	let pointLightPositions = [
		3200, 1600, -40,
		-30, 60, -40,
		-3000, 1560, 150,
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
		0, 0.1, 0.08,
		0, 0, 0,
		// 0, 0, 0,
		// 0.0, 0.0, 0.5,
		// 0.0, 0.5, 0.0,
		0.7, 0.35, 0.35,
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
	let pointLightIntensities = [
		-1,
		-1,
		-1,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0
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
			],
			pointLightIntensities[ii/3]
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

		world.gameObjects.push(here(new Transform(
			v3.add(center, v3.create(x, 0, y))
		)));
	}
	*/

	/*
	world.gameObjects.push(new Sphere(new Transform(
		v3.create(0, 10, 10),
		m4.create(),
		v3.create(0.1, 0.1, 0.1)
	)));*/

	// world.gameObjects.push(new Floor(new Transform(
	// 	v3.create(0,-10,0),
	// 	m4.create(),
	// 	v3.create(1, 1, 1)
	// )));

	world.setTerrain(new Terrain(new Transform(
		v3.create(0,-350,0),
		// v3.create(0,0,0),
		m4.create(),
		v3.create(10, 350, 10)
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

	world.gameObjects.push(new Decorations(new Transform()));

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
		var seconds = ms * 0.001;
		gameTime += seconds;
		world.update(seconds, gameTime); // update in seconds!
	}

	function parseModel(configModel){
		let modelDefaults = config.resources.models[configModel.type]
		var texture = (modelDefaults.texture == undefined)? null : (modelDefaults.texture);
		var color = configModel.color || modelDefaults.color || {};
		var configTransform = configModel.transform || {};
		var translate = configTransform.translate || { x : 0, y : 0, z : 0};
		var rotation = configTransform.rotation || { x : 0, y : 0, z : 0};
		var scale = configTransform.scale || { x : 1, y : 1, z : 1};
		var rotationMatrix = m4.create();
		// works when rotating towards just one axis, two at best with the right combination
		var transform = new Transform(
			v3.create(translate.x, translate.y, translate.z),
			rotationMatrix,
			v3.create(scale.x, scale.y, scale.z)
		);
		var options = configModel.options || {};
		var model = instanciateModel(configModel.type, texture, transform, options);

		model.rotate(degreesToRadians(rotation.x), degreesToRadians(rotation.y), degreesToRadians(rotation.z));

		model.frontDirection = v3.normalize(v3.create(modelDefaults.front.x, modelDefaults.front.y, modelDefaults.front.z));
		return model;
	}

	function instanciateModel(modelId, textureId, transform, options){
		switch (modelId){
			case "tie_fighter":
			case "tie_interceptor":
			case "falcon":
				return new Ship(modelId, textureId, transform, options);
		}
		// default case
		return new Model(modelId, textureId, transform, options);
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
	// capture script
	if (captureInput && keyStatus[event.keyCode].pressed){
		for (var i = capturedCommands.length - 1; i >= 0; i--){
			if (capturedCommands[i].key == event.keyCode && capturedCommands[i].duration == 0){
				capturedCommands[i].duration = Math.round((gameTime  - capturedCommands[i].time) * 100) / 100;
				break;
			}
		}
	}

	keyStatus[event.keyCode].pressed = false;
	keyStatus[event.keyCode].justPressed = false;
}

document.onkeydown = function(event){
	// capture script
	if (captureInput && !keyStatus[event.keyCode].pressed){
		capturedCommands.push({ time : Math.round(gameTime * 100) / 100, key : event.keyCode, duration : 0});
	}

	keyStatus[event.keyCode].pressed = true;
	keyStatus[event.keyCode].justPressed = true;

	if (event.keyCode == KeyEnum.O){
		if (event.ctrlKey){
			if (!captureInput){
				captureInput = true;
				capturedCommands = [];
				console.log(world.getCameraPosition());
				console.log(world.camera);
			}else{
				captureInput = false;
				downloadFile("script.txt", JSON.stringify(capturedCommands));
			}
			event.preventDefault();
			event.stopPropagation();
		}
	}
}

var captureInput = false;
var capturedCommands = [];

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
	let model;
	let program;

	for (img in config.resources.textures) {
		assetCount++;
	}
	for (model in config.resources.models) {
		assetCount += config.resources.models[model].lod_files.length;
	}
	for (program in config.resources.shaders) {
		assetCount++;
	}
	for (img in config.resources.textures){
		images[img] = document.createElement('img');
		// support for options object in config
		if (typeof config.resources.textures[img] == 'string') {
			images[img].source = config.resources.textures[img];
		} else {
			images[img].source = config.resources.textures[img].src;
		}
		images[img].textureId = img;
		images[img].load = function(){
			if (typeof config.resources.textures[this.textureId] != 'string') {
				let options = config.resources.textures[this.textureId];
				options.src = this;
				textureManager.loadTexture(this.textureId, options);
			}
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
        images[img].request.open("GET", images[img].source, true);
        images[img].request.overrideMimeType('text/plain; charset=x-user-defined');
        images[img].request.send(null);
	}
	for (model in config.resources.models) {
		let options = config.resources.models[model];
		for (let ii = 0, len = options.lod_files.length; ii < len; ++ii) {
			modelManager.loadModelBufferInfo(model, options, ii)
			.then(() => {
				loadedAssets++;
				if (loadedAssets == assetCount){
					loadingImages = false;
					initGame();
				}
			})
		}
	}
	let shaderProgramPrefix = "shaders/";
	for (program in config.resources.shaders) {
		let vertex = config.resources.shaders[program].vertex;
		let fragment = config.resources.shaders[program].fragment;


		/*
		shaderManager.loadProgram(program, vertex, fragment)
				.then(() => {
					loadedAssets++;
					if (loadedAssets == assetCount){
						loadingImages = false;
						initGame();
					}
				});
		*/

		var p1 = $.get(shaderProgramPrefix + vertex + ".vert");
		var p2 = $.get(shaderProgramPrefix + fragment + ".frag");

		var queryProgram = function(){
			var currentProg = program;
			Promise.all([p1,p2]).then(function(values){
				var vertexShader = values[0];
				var fragmentShader = values[1];
				shaderManager.loadProgram(currentProg, vertexShader, fragmentShader)
					.then(() => {
						loadedAssets++;
						if (loadedAssets == assetCount){
							loadingImages = false;
							initGame();
						}
					});
			});
		}

		queryProgram();
	}
	/*
	for (snd in soundSources){
		sounds[snd] = {};
		sounds[snd].sound = new Audio(soundSources[snd]);
	}*/
	requestAnimationFrame(preloader);
}
