'use strict';

/* Shader Manager loads and stores the shaders */
class ShaderManager {
	constructor() {
		this.programInfos = {};
	}

	loadProgram(programId, vertexShader, fragmentShader) {
		return new Promise((resolve, reject) => {
			this.programInfos[programId] = twgl.createProgramInfo(gl, [vertexShader, fragmentShader]);
			resolve();
		})
	}
}
