'use strict';

class LaserExplosionParticle extends GameObject{

	constructor(transform, speed, length, color, particleEffect) {
		super(transform);
		// setup GLSL program
		this.programInfo = shaderManager.programInfos['laserExplosionParticle'];

		let arrays = {
			// Estos nombres dependen de las variables de los shaders
			a_position: {numComponents: 3, data: this.getGeometry(length)},
		};

		this.bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);
 		this.color = color;

 		this.acceleration = v3.create(0, -3, 0); // just gravity
 		this.speed = speed;

 		this.particleEffect = particleEffect;

		// for optimization
		this.laserExplosionAuxVec = v3.create();
		this.previousPosition = v3.create();
		this.referenceVector = v3.create(1, 0, 0);
	}

	update(delta){
		super.update(delta);

		// move the particle
		v3.copy(this.transform.position, this.previousPosition);
		v3.add(this.speed, this.acceleration, this.speed);
		this.transform.translate(v3.mulScalar(this.speed, delta, this.laserExplosionAuxVec), false);
		v3.subtract(this.transform.position, this.previousPosition, this.laserExplosionAuxVec);

		// rotate it into the direction of the movement
		let angle = Math.acos(
			v3.dot(this.referenceVector, this.laserExplosionAuxVec)
			/ (v3.length(this.laserExplosionAuxVec) * v3.length(this.referenceVector))
		);
		let axis = v3.cross(this.referenceVector, this.laserExplosionAuxVec, this.laserExplosionAuxVec);

		m4.axisRotation(axis, angle, this.transform.rotation);

		this.transform.calculateTransformMatrix();

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
			 0,  0, -1,
			-length,  0, -1,
			-length,  0,  1,

			-length,  0,  1,
			 0,  0,  1,
			 0,  0, -1,
			//  length,  0, -1,
			// -length,  0, -1,
			// -length,  0,  1,
            //
			// -length,  0,  1,
			//  length,  0,  1,
			//  length,  0, -1,
		]);
	};

}
