'use strict';

const canvas = document.getElementById('glCanvas');
const gl = canvas.getContext('webgl');

const v3 = twgl.v3;
const m3 = twgl.m3;
const m4 = twgl.m4;

const MS_PER_UPDATE = 1000 / 60;

let cameraAngleRadians = degreesToRadians(0);
let fieldOfViewRadians = degreesToRadians(60);

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

	let world = new World();

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
