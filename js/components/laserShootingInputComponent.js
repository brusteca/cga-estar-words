'use strict';

class LaserShootingInputComponent extends InputComponent {

	constructor(owner) {
		super(owner);
	}

	handleInput(keyStatus, delta){
		if (keyStatus[KeyEnum.SPACE].justPressed){
			// fire a laser!
			var laserPosition = v3.create(0,0,0);
			v3.add(this.owner.transform.position, v3.mulScalar(this.owner.getFrontDirection(), 50, laserPosition), laserPosition);
			// to do - rotate the laser!
			var laserTransform = new Transform(laserPosition, m4.copy(this.owner.transform.rotation));
			var laserShot = new LaserShot(laserTransform);

			laserShot.frontDirection = v3.copy(this.owner.getFrontDirection());
			v3.normalize(laserShot.frontDirection, laserShot.frontDirection);
			laserShot.motionComponent.speed = config.laserSpeed;
			world.gameObjects.push(laserShot);
		}

	}

}
