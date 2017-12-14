'use strict';

class LaserShootingBehaviorComponent extends BehaviorComponent {

	constructor(owner, laserId='red') {
		super(owner);
		this.laserId = laserId;
	}

	update(delta){
		let inputController = this.owner.inputComponent;
		if (inputController.isKeyJustPressed(KeyEnum.SPACE)){
			// fire a laser!
			let laserPosition = v3.create(0,0,0);
			v3.add(this.owner.transform.position, v3.mulScalar(this.owner.getFrontDirection(), 10, laserPosition), laserPosition);

			// fire a little from below
			v3.add(this.owner.transform.position, v3.mulScalar(this.owner.getUpDirection(), -2, laserPosition), laserPosition);

			// to do - rotate the laser!
			let laserTransform = new Transform(laserPosition, m4.copy(this.owner.transform.rotation), v3.create(0.05,0.05,0.05));
			let laserShot = new LaserShot(this.laserId, laserTransform);

			laserShot.frontDirection = v3.copy(this.owner.getFrontDirection());
			v3.normalize(laserShot.frontDirection, laserShot.frontDirection);
			laserShot.motionComponent.speed = config.lasers[this.laserId].speed;
			world.gameObjects.push(laserShot);

			var cameraDistance = v3.distance(laserTransform.position, world.camera.transform.position);
			playSound("laserblast", 20 / cameraDistance);
		}

	}

}
