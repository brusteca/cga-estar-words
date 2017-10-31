'use strict';

class GameObject {
	constructor(transform) {
		this.transform = transform;
		// TODO: pensar una forma de poner los shaders y los atributos
		// todo junto o algo asi. tipo como parametro

		// setup GLSL program
		this.programInfo = twgl.createProgramInfo(gl, ["3d-vertex-shader", "3d-fragment-shader"])

		// Create a buffer to put positions in
		this.positionBuffer = gl.createBuffer();
		// Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
		gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
		// Put geometry data into buffer
		setGeometry(gl);

		// Create a buffer to put colors in
		this.colorBuffer = gl.createBuffer();
		// Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = colorBuffer)
		gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
		// Put color data into buffer
		setColors(gl);


	}

	update(ms_per_update) {

	}

	draw(viewProjectionMatrix) {
		// Tell it to use our program (pair of shaders)
		gl.useProgram(this.programInfo.program);

		// Turn on the position attribute
		gl.enableVertexAttribArray(
			this.programInfo.attribSetters.a_position.location);

		// Bind the position buffer.
		gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);

		// Tell the position attribute how to get data out of positionBuffer (ARRAY_BUFFER)
		let size = 3;          // 3 components per iteration
		let type = gl.FLOAT;   // the data is 32bit floats
		let normalize = false; // don't normalize the data
		let stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
		let offset = 0;        // start at the beginning of the buffer
		gl.vertexAttribPointer(
			this.programInfo.attribSetters.a_position.location, size, type,
			normalize, stride, offset)

		// Turn on the color attribute
		gl.enableVertexAttribArray(this.programInfo.attribSetters.a_color.location);

		// Bind the color buffer.
		gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);

		// Tell the attribute how to get data out of colorBuffer (ARRAY_BUFFER)
		size = 3;                 // 3 components per iteration
		type = gl.UNSIGNED_BYTE;  // the data is 8bit unsigned values
		normalize = true;         // normalize the data (convert from 0-255 to 0-1)
		stride = 0;               // 0 = move forward size * sizeof(type) each iteration to get the next position
		offset = 0;               // start at the beginning of the buffer
		gl.vertexAttribPointer(
			this.programInfo.attribSetters.a_color.location, size, type,
			normalize, stride, offset)

		// Apply the transform to the viewMatrix
		let currentTransformMatrix = m4.multiply(
			viewProjectionMatrix, this.transform.transformMatrix);

		let numFs = 8;
		let radius = 200;

		for (let ii = 0; ii < numFs; ++ii) {
			let angle = ii * Math.PI * 2 / numFs;
			let x = Math.cos(angle) * radius;
			let y = Math.sin(angle) * radius

			// starting with the view projection matrix
			// compute a matrix for the F
			let matrix = m4.translate(currentTransformMatrix, v3.create(x, 0, y));

			// Set the matrix.
			gl.uniformMatrix4fv(this.programInfo.uniformSetters.u_matrix.location, false, matrix);

			// Draw the geometry.
			let primitiveType = gl.TRIANGLES;
			let offset = 0;
			let count = 16 * 6;
			gl.drawArrays(primitiveType, offset, count);
	    }
	}
}


// Fill the buffer with the values that define a letter 'F'.
function setGeometry(gl) {
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

  gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
}


// Fill the buffer with colors for the 'F'.
function setColors(gl) {
  gl.bufferData(
      gl.ARRAY_BUFFER,
      new Uint8Array([
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
        160, 160, 220]),
      gl.STATIC_DRAW);
}
