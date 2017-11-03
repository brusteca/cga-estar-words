class Efe extends GameObject {
	constructor(transform) {
		super(transform);
		// setup GLSL program
		this.programInfo = twgl.createProgramInfo(gl, ["3d-vertex-shader", "3d-fragment-shader"])

		let arrays = {
			// Estos nombres dependen de las variables de los shaders
			a_position: {numComponents: 3, data: getGeometry()},
			a_color: {numComponents: 3, data: getColors()},
			a_normal: {numComponents: 3, data: getNormals()},
			a_texcoord: {numComponents: 2, data: getTextureCoords()}
		};

		this.bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);

		this.texture = twgl.createTexture(gl, {src: 'resources/textures/f-texture.png'});
	}
}


// Fill the buffer with the values that define a letter 'F'.
function getGeometry() {
  let positions = new Float32Array([
		  // left column front
		  0,   0,  0,
		  0, 150,  0,
		  30,   0,  0,
		  0, 150,  0,
		  30, 150,  0,
		  30,   0,  0,

		  // top rung front
		  30,   0,  0,
		  30,  30,  0,
		  100,   0,  0,
		  30,  30,  0,
		  100,  30,  0,
		  100,   0,  0,

		  // middle rung front
		  30,  60,  0,
		  30,  90,  0,
		  67,  60,  0,
		  30,  90,  0,
		  67,  90,  0,
		  67,  60,  0,

		  // left column back
			0,   0,  30,
		   30,   0,  30,
			0, 150,  30,
			0, 150,  30,
		   30,   0,  30,
		   30, 150,  30,

		  // top rung back
		   30,   0,  30,
		  100,   0,  30,
		   30,  30,  30,
		   30,  30,  30,
		  100,   0,  30,
		  100,  30,  30,

		  // middle rung back
		   30,  60,  30,
		   67,  60,  30,
		   30,  90,  30,
		   30,  90,  30,
		   67,  60,  30,
		   67,  90,  30,

		  // top
			0,   0,   0,
		  100,   0,   0,
		  100,   0,  30,
			0,   0,   0,
		  100,   0,  30,
			0,   0,  30,

		  // top rung right
		  100,   0,   0,
		  100,  30,   0,
		  100,  30,  30,
		  100,   0,   0,
		  100,  30,  30,
		  100,   0,  30,

		  // under top rung
		  30,   30,   0,
		  30,   30,  30,
		  100,  30,  30,
		  30,   30,   0,
		  100,  30,  30,
		  100,  30,   0,

		  // between top rung and middle
		  30,   30,   0,
		  30,   60,  30,
		  30,   30,  30,
		  30,   30,   0,
		  30,   60,   0,
		  30,   60,  30,

		  // top of middle rung
		  30,   60,   0,
		  67,   60,  30,
		  30,   60,  30,
		  30,   60,   0,
		  67,   60,   0,
		  67,   60,  30,

		  // right of middle rung
		  67,   60,   0,
		  67,   90,  30,
		  67,   60,  30,
		  67,   60,   0,
		  67,   90,   0,
		  67,   90,  30,

		  // bottom of middle rung.
		  30,   90,   0,
		  30,   90,  30,
		  67,   90,  30,
		  30,   90,   0,
		  67,   90,  30,
		  67,   90,   0,

		  // right of bottom
		  30,   90,   0,
		  30,  150,  30,
		  30,   90,  30,
		  30,   90,   0,
		  30,  150,   0,
		  30,  150,  30,

		  // bottom
		  0,   150,   0,
		  0,   150,  30,
		  30,  150,  30,
		  0,   150,   0,
		  30,  150,  30,
		  30,  150,   0,

		  // left side
		  0,   0,   0,
		  0,   0,  30,
		  0, 150,  30,
		  0,   0,   0,
		  0, 150,  30,
		  0, 150,   0]);

  // Center the F around the origin and Flip it around. We do this because
  // we're in 3D now with and +Y is up where as before when we started with 2D
  // we had +Y as down.

  // We could do by changing all the values above but I'm lazy.
  // We could also do it with a matrix at draw time but you should
  // never do stuff at draw time if you can do it at init time.
  let matrix = m4.rotationX(Math.PI);
  matrix = m4.translate(matrix, v3.create(-50, -75, -15));

  function vectorMultiply(v, m) {
	let dst = [];
	for (let i = 0; i < 4; ++i) {
	  dst[i] = 0.0;
	  for (let j = 0; j < 4; ++j)
		dst[i] += v[j] * m[j * 4 + i];
	}
	return dst;
  }

  for (let ii = 0; ii < positions.length; ii += 3) {
	let vector = vectorMultiply([positions[ii + 0], positions[ii + 1], positions[ii + 2], 1], matrix);
	positions[ii + 0] = vector[0];
	positions[ii + 1] = vector[1];
	positions[ii + 2] = vector[2];
  }

  return positions;
}


// Fill the buffer with colors for the 'F'.
function getColors() {
  let colors = new Uint8Array([
	  // left column front
	200,  70, 120,
	200,  70, 120,
	200,  70, 120,
	200,  70, 120,
	200,  70, 120,
	200,  70, 120,

	  // top rung front
	200,  70, 120,
	200,  70, 120,
	200,  70, 120,
	200,  70, 120,
	200,  70, 120,
	200,  70, 120,

	  // middle rung front
	200,  70, 120,
	200,  70, 120,
	200,  70, 120,
	200,  70, 120,
	200,  70, 120,
	200,  70, 120,

	  // left column back
	80, 70, 200,
	80, 70, 200,
	80, 70, 200,
	80, 70, 200,
	80, 70, 200,
	80, 70, 200,

	  // top rung back
	80, 70, 200,
	80, 70, 200,
	80, 70, 200,
	80, 70, 200,
	80, 70, 200,
	80, 70, 200,

	  // middle rung back
	80, 70, 200,
	80, 70, 200,
	80, 70, 200,
	80, 70, 200,
	80, 70, 200,
	80, 70, 200,

	  // top
	70, 200, 210,
	70, 200, 210,
	70, 200, 210,
	70, 200, 210,
	70, 200, 210,
	70, 200, 210,

	  // top rung right
	200, 200, 70,
	200, 200, 70,
	200, 200, 70,
	200, 200, 70,
	200, 200, 70,
	200, 200, 70,

	  // under top rung
	210, 100, 70,
	210, 100, 70,
	210, 100, 70,
	210, 100, 70,
	210, 100, 70,
	210, 100, 70,

	  // between top rung and middle
	210, 160, 70,
	210, 160, 70,
	210, 160, 70,
	210, 160, 70,
	210, 160, 70,
	210, 160, 70,

	  // top of middle rung
	70, 180, 210,
	70, 180, 210,
	70, 180, 210,
	70, 180, 210,
	70, 180, 210,
	70, 180, 210,

	  // right of middle rung
	100, 70, 210,
	100, 70, 210,
	100, 70, 210,
	100, 70, 210,
	100, 70, 210,
	100, 70, 210,

	  // bottom of middle rung.
	76, 210, 100,
	76, 210, 100,
	76, 210, 100,
	76, 210, 100,
	76, 210, 100,
	76, 210, 100,

	  // right of bottom
	140, 210, 80,
	140, 210, 80,
	140, 210, 80,
	140, 210, 80,
	140, 210, 80,
	140, 210, 80,

	  // bottom
	90, 130, 110,
	90, 130, 110,
	90, 130, 110,
	90, 130, 110,
	90, 130, 110,
	90, 130, 110,

	  // left side
	160, 160, 220,
	160, 160, 220,
	160, 160, 220,
	160, 160, 220,
	160, 160, 220,
	160, 160, 220]);

  return colors;
}

function getNormals() {
  let normals = new Float32Array([
		  // left column front
		  0, 0, 1,
		  0, 0, 1,
		  0, 0, 1,
		  0, 0, 1,
		  0, 0, 1,
		  0, 0, 1,

		  // top rung front
		  0, 0, 1,
		  0, 0, 1,
		  0, 0, 1,
		  0, 0, 1,
		  0, 0, 1,
		  0, 0, 1,

		  // middle rung front
		  0, 0, 1,
		  0, 0, 1,
		  0, 0, 1,
		  0, 0, 1,
		  0, 0, 1,
		  0, 0, 1,

		  // left column back
		  0, 0, -1,
		  0, 0, -1,
		  0, 0, -1,
		  0, 0, -1,
		  0, 0, -1,
		  0, 0, -1,

		  // top rung back
		  0, 0, -1,
		  0, 0, -1,
		  0, 0, -1,
		  0, 0, -1,
		  0, 0, -1,
		  0, 0, -1,

		  // middle rung back
		  0, 0, -1,
		  0, 0, -1,
		  0, 0, -1,
		  0, 0, -1,
		  0, 0, -1,
		  0, 0, -1,

		  // top
		  0, 1, 0,
		  0, 1, 0,
		  0, 1, 0,
		  0, 1, 0,
		  0, 1, 0,
		  0, 1, 0,

		  // top rung right
		  1, 0, 0,
		  1, 0, 0,
		  1, 0, 0,
		  1, 0, 0,
		  1, 0, 0,
		  1, 0, 0,

		  // under top rung
		  0, -1, 0,
		  0, -1, 0,
		  0, -1, 0,
		  0, -1, 0,
		  0, -1, 0,
		  0, -1, 0,

		  // between top rung and middle
		  1, 0, 0,
		  1, 0, 0,
		  1, 0, 0,
		  1, 0, 0,
		  1, 0, 0,
		  1, 0, 0,

		  // top of middle rung
		  0, 1, 0,
		  0, 1, 0,
		  0, 1, 0,
		  0, 1, 0,
		  0, 1, 0,
		  0, 1, 0,

		  // right of middle rung
		  1, 0, 0,
		  1, 0, 0,
		  1, 0, 0,
		  1, 0, 0,
		  1, 0, 0,
		  1, 0, 0,

		  // bottom of middle rung.
		  0, -1, 0,
		  0, -1, 0,
		  0, -1, 0,
		  0, -1, 0,
		  0, -1, 0,
		  0, -1, 0,

		  // right of bottom
		  1, 0, 0,
		  1, 0, 0,
		  1, 0, 0,
		  1, 0, 0,
		  1, 0, 0,
		  1, 0, 0,

		  // bottom
		  0, -1, 0,
		  0, -1, 0,
		  0, -1, 0,
		  0, -1, 0,
		  0, -1, 0,
		  0, -1, 0,

		  // left side
		  -1, 0, 0,
		  -1, 0, 0,
		  -1, 0, 0,
		  -1, 0, 0,
		  -1, 0, 0,
		  -1, 0, 0]);
  return normals;
}

function getTextureCoords() {
	let textureCoords = new Float32Array([
		// left column front
		0, 0,
		0, 1,
		1, 0,
		0, 1,
		1, 1,
		1, 0,

		// top rung front
		0, 0,
		0, 1,
		1, 0,
		0, 1,
		1, 1,
		1, 0,

		// middle rung front
		0, 0,
		0, 1,
		1, 0,
		0, 1,
		1, 1,
		1, 0,

		// left column back
		0, 0,
		1, 0,
		0, 1,
		0, 1,
		1, 0,
		1, 1,

		// top rung back
		0, 0,
		1, 0,
		0, 1,
		0, 1,
		1, 0,
		1, 1,

		// middle rung back
		0, 0,
		1, 0,
		0, 1,
		0, 1,
		1, 0,
		1, 1,

		// top
		0, 0,
		1, 0,
		1, 1,
		0, 0,
		1, 1,
		0, 1,

		// top rung right
		0, 0,
		1, 0,
		1, 1,
		0, 0,
		1, 1,
		0, 1,

		// under top rung
		0, 0,
		0, 1,
		1, 1,
		0, 0,
		1, 1,
		1, 0,

		// between top rung and middle
		0, 0,
		1, 1,
		0, 1,
		0, 0,
		1, 0,
		1, 1,

		// top of middle rung
		0, 0,
		1, 1,
		0, 1,
		0, 0,
		1, 0,
		1, 1,

		// right of middle rung
		0, 0,
		1, 1,
		0, 1,
		0, 0,
		1, 0,
		1, 1,

		// bottom of middle rung.
		0, 0,
		0, 1,
		1, 1,
		0, 0,
		1, 1,
		1, 0,

		// right of bottom
		0, 0,
		1, 1,
		0, 1,
		0, 0,
		1, 0,
		1, 1,

		// bottom
		0, 0,
		0, 1,
		1, 1,
		0, 0,
		1, 1,
		1, 0,

		// left side
		0, 0,
		0, 1,
		1, 1,
		0, 0,
		1, 1,
		1, 0]);
	return textureCoords;
}
