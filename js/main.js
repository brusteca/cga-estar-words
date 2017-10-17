const canvas = document.getElementById('glCanvas');
const gl = canvas.getContext('webgl');


function initialize() {
	// Only continue if WebGL is available and working
	if (!gl) {
		alert("Unable to initialize WebGL. Your browser or machine may not support it.");
		return;
	}
	// Set clear color to black, fully opaque
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	// Clear the color buffer with specified clear color
	gl.clear(gl.COLOR_BUFFER_BIT);


	// https://webglfundamentals.org/webgl/lessons/webgl-fundamentals.html
	let vertexShaderSource = document.getElementById("2d-vertex-shader").text;
	let fragmentShaderSource = document.getElementById("2d-fragment-shader").text;

	let vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
	let fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

	let program = createProgram(gl, vertexShader, fragmentShader);

	let positionAttributeLocation = gl.getAttribLocation(program, "a_position");

	// fast fix to get this working
	window.shaderProgram = program;
	window.positionAttributeLocation = positionAttributeLocation;

	let positionBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

	window.positionBuffer = positionBuffer;

	// three 2d points
	let positions = [
	  0, 0,
	  0, 0.5,
	  0.7, 0,
	];
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
}

let lastFrameTimeMs = 0;
let elapsedTime = 0;

function mainLoop(timestamp) {

	let delta = timestamp - lastFrameTimeMs;
	lastFrameTimeMs = timestamp;

	// update(deltaInSeconds, elapsedTime);
    draw();
    requestAnimationFrame(mainLoop);
}


function update(delta, elapsedTime){

}

function draw() {
	resizeCanvasToDisplaySize(gl.canvas);
	gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
	gl.clearColor(0, 0, 0, 0);
	gl.clear(gl.COLOR_BUFFER_BIT);

	// Tell it to use our program (pair of shaders)
	let program = window.shaderProgram;
	gl.useProgram(program);

	let positionAttributeLocation = window.positionAttributeLocation;
	gl.enableVertexAttribArray(positionAttributeLocation);

	let positionBuffer = window.positionBuffer;
	// Bind the position buffer.
	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

	// Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
	let size = 2;          // 2 components per iteration
	let type = gl.FLOAT;   // the data is 32bit floats
	let normalize = false; // don't normalize the data
	let stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
	let offset = 0;        // start at the beginning of the buffer
	gl.vertexAttribPointer(
		positionAttributeLocation, size, type, normalize, stride, offset)

	let primitiveType = gl.TRIANGLES;
    offset = 0;
    let count = 3;
    gl.drawArrays(primitiveType, offset, count);
}

// stuff copied from the tutorial
// https://webglfundamentals.org/webgl/lessons/webgl-fundamentals.html

function createShader(gl, type, source) {
  let shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
	return shader;
  }

  console.log(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
}

function createProgram(gl, vertexShader, fragmentShader) {
  let program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  let success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
	return program;
  }

  console.log(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
}

function resizeCanvasToDisplaySize(canvas) {
  // Lookup the size the browser is displaying the canvas.
  let displayWidth  = canvas.clientWidth;
  let displayHeight = canvas.clientHeight;

  // Check if the canvas is not the same size.
  if (canvas.width  != displayWidth ||
	  canvas.height != displayHeight) {

	// Make the canvas the same size
	canvas.width  = displayWidth;
	canvas.height = displayHeight;
  }
}
