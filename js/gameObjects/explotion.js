'use strict';

// an explotion is just a collection of different particle effects
class Explotion extends GameObject{

	constructor(transform) {
		super(transform);

		//this.light = world.getFreeDynamicLight();
		//this.light.color = config.laserColor;
		//this.light.intensity = 1000;

		this.particles = [];

		for (var i = 0; i < config.explotionSparkCount; i++){
			// particle definition below in this file
			let particleLength = Utils.randomUniformDistribution(10, 50);
			let particleSpeed = v3.create(
					Utils.randomUniformDistribution(0, 30) * (Utils.randomBoolean()? -1 : 1),
					Utils.randomUniformDistribution(40, 60), // upwards
					Utils.randomUniformDistribution(0, 30) * (Utils.randomBoolean()? -1 : 1));
			let particleTransform = transform.copy();
			particleTransform.rotateY(Math.PI * 0.5 + Utils.randomUniformDistribution(-Math.PI * 0.01,Math.PI * 0.01) + Math.atan2(particleSpeed[0], particleSpeed[2]));
			particleTransform.applyScale(0.03);
			this.particles.push(new LaserExplotionParticle(particleTransform, particleSpeed, particleLength, this));
		}
	}

	update(delta){
		super.update(delta);

		for (var i = 0; i < this.particles.length; i++){
			// particle definition below in this file
			this.particles[i].update(delta);
		}

		/*
		this.light.transform.transformMatrix[12] = this.transform.transformMatrix[12];
		this.light.transform.transformMatrix[13] = this.transform.transformMatrix[13];
		this.light.transform.transformMatrix[14] = this.transform.transformMatrix[14];

		// collision against terrain
		let position = this.transform.position;
		let height = world.terrain.getHeightAt(position);
		if (position[1] <= height) {
			world.removeGameObject(this);
			this.light.intensity = 0;
			// to do: return light in some way
		}
		*/
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

		if (this.particles.length == 0){
			world.removeGameObject(this);
		}
	}
}
