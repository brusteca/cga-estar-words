'use strict';

// an explosion is just a collection of different particle effects
class Explosion extends GameObject{

	constructor(transform) {
		super(transform);

		this.particles = [];

		for (var i = 0; i < config.explosionSparkCount; i++){
			// particle definition below in this file
			let particleLength = Utils.randomUniformDistribution(2, 12);
			let particleSpeed = v3.create(
				Utils.randomUniformDistribution(0, 50) * (Utils.randomBoolean()? -1 : 1),
				Utils.randomUniformDistribution(60, 100), // upwards
				Utils.randomUniformDistribution(0, 50) * (Utils.randomBoolean()? -1 : 1)
			);
			let particleTransform = transform.copy();
			particleTransform.position[1] += 2;
			particleTransform.rotateY(Math.PI * 0.5 + Utils.randomUniformDistribution(-Math.PI * 0.01,Math.PI * 0.01) + Math.atan2(particleSpeed[0], particleSpeed[2]));
			particleTransform.applyScale(0.3);
			this.particles.push(new LaserExplosionParticle(particleTransform, particleSpeed, particleLength, this));
		}

		this.light = world.getFreeDynamicLight();
		this.light.color = [1, 1, 1];
		this.light.intensity = 10000;
		this.light.owner = this;
	}

	update(delta){
		super.update(delta);
		// if I still have control over my light
		if (this.light.owner == this) {
			this.light.update();
			this.light.transform.position[1] += 10;
			this.light.transform.calculateTransformMatrix();
		}
		for (var i = 0; i < this.particles.length; i++){
			// particle definition below in this file
			this.particles[i].update(delta);
		}
		// gradually diminish strength
		if (this.light.intensity > 2000) {
			this.light.intensity -= 200;
		} else if (this.light.intensity > 300) {
			this.light.intensity -= 100;
		} else if (this.light.intensity > 50) {
			this.light.intensity -= 25;
			this.light.color[2] -= 0.06;
		} else if (this.light.intensity > 0) {
			this.light.intensity -= 5;
			this.light.transform.position[1] += 0.6;
			this.light.transform.calculateTransformMatrix
		}
		// when all the effects are done, stop
		if (this.particles.length == 0 && (this.light.owner != this || this.light.intensity <= 0)){
			world.removeGameObject(this);
			if (this.light.owner == this) {
				this.light.intensity = 0;
				this.light.owner = null;
			}
		}
	}

	draw(viewProjectionMatrix, worldMatrix = null){
		for (var i = 0; i < this.particles.length; i++){
			// particle definition below in this file
			this.particles[i].draw(viewProjectionMatrix, worldMatrix);
		}
	}

	removeParticle(particle){
		let index = this.particles.indexOf(particle);
		if (index != -1){
			this.particles.splice(index, 1);
		}
	}
}
