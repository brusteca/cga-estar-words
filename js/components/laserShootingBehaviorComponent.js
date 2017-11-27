'use strict';

class LaserShootingBehaviorComponent extends BehaviorComponent {

	constructor(owner) {
		super(owner);
	}

	update(delta){
		var inputController = this.owner.inputComponent;
		if (inputController.isKeyJustPressed(KeyEnum.SPACE)){
			// fire a laser!
			var laserPosition = v3.create(0,0,0);
			v3.add(this.owner.transform.position, v3.mulScalar(this.owner.getFrontDirection(), 10, laserPosition), laserPosition);
			// to do - rotate the laser!
			var laserTransform = new Transform(laserPosition, m4.copy(this.owner.transform.rotation), v3.create(0.05,0.05,0.05));
			var laserShot = new LaserShot(laserTransform);

			laserShot.frontDirection = v3.copy(this.owner.getFrontDirection());
			v3.normalize(laserShot.frontDirection, laserShot.frontDirection);
			laserShot.motionComponent.speed = config.laserSpeed;
			world.gameObjects.push(laserShot);
		}

	}

}
