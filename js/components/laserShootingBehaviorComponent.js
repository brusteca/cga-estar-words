'use strict';

class LaserShootingBehaviorComponent extends BehaviorComponent {

	constructor(owner) {
		super(owner);
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
			let laserId = 'purple';
			let laserShot = new LaserShot(laserId, laserTransform);

			laserShot.frontDirection = v3.copy(this.owner.getFrontDirection());
			v3.normalize(laserShot.frontDirection, laserShot.frontDirection);
			laserShot.motionComponent.speed = config.lasers[laserId].speed;
			world.gameObjects.push(laserShot);
		}

	}

}
