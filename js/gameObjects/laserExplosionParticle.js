'use strict';

class LaserExplosionParticle extends GameObject{

	constructor(transform, speed, length, particleEffect) {
		super(transform);
		// setup GLSL program
		this.programInfo = shaderManager.programInfos['laserExplosionParticle'];

		let arrays = {
			// Estos nombres dependen de las variables de los shaders
			a_position: {numComponents: 3, data: this.getGeometry(length)},
		};

		this.bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);
 		this.color = [ 1, 0.6, 0, 1 ]; // orange

 		this.acceleration = v3.create(0, -2, 0); // just gravity
 		this.speed = speed;

 		this.particleEffect = particleEffect;
	}

	update(delta){
		super.update(delta);

		// move the particle
		v3.add(this.speed, this.acceleration, this.speed);
		this.transform.translate(v3.mulScalar(this.speed, delta));

		let position = this.transform.position;
		let terrainHeight = world.terrain.getHeightAt(position);
		if (position[1] <= terrainHeight) {
			this.particleEffect.removeParticle(this);			
		}

		this.color[3] -= 0.5 * delta;
	}

	getUniforms(viewProjectionMatrix, worldMatrix) {
		let uniforms = {
			u_color : this.color
		};
		this.addGameObjectUniforms(uniforms, viewProjectionMatrix, worldMatrix);
		return uniforms;
	}

	getGeometry(length) {
		return new Float32Array([
			// horizontal
			 length,  0, -1, 
			-length,  0, -1,
			-length,  0,  1,

			-length,  0,  1,
			 length,  0,  1,
			 length,  0, -1,
		]);
	};

}
