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
}

let lastFrameTimeMs = 0;
let elapsedTime = 0;

function mainLoop(timestamp) {

	delta = timestamp - lastFrameTimeMs;
	lastFrameTimeMs = timestamp;

	update(deltaInSeconds, elapsedTime);
    draw();
    requestAnimationFrame(mainLoop);
}


function update(delta, elapsedTime){

}
