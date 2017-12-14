'use strict';

class CameraFlyBehaviorComponent extends BehaviorComponent {

	constructor(owner) {
		super(owner);

		if (this.owner.topSpeed == undefined) {
			throw 'Owner of CameraFlyBehaviorComponent must have topSpeed!'
		}
	}

	update(delta){
		var inputController = this.owner.inputComponent;
		// accelerate
		if (inputController.isKeyDown(KeyEnum.W)){
			this.owner.motionComponent.setSpeed(this.owner.topSpeed);
		// go backwards
		} else if (inputController.isKeyDown(KeyEnum.S)){
			this.owner.motionComponent.setSpeed(-this.owner.topSpeed);
		} else  {
			this.owner.motionComponent.setSpeed(0);
		}

		var rotationSpeed = 0;
		if (inputController.isKeyDown(KeyEnum.LEFT) || inputController.isKeyDown(KeyEnum.RIGHT) ||
			inputController.isKeyDown(KeyEnum.UP) || inputController.isKeyDown(KeyEnum.DOWN) ||
			inputController.isKeyDown(KeyEnum.Q) || inputController.isKeyDown(KeyEnum.E)){
			rotationSpeed = 1;
		}

		var angularSpeedDirection = v3.create(0,0,0);
		var upDirection = this.owner.getUpDirection();
		var leftDirection = this.owner.getLeftDirection();
		var frontDirection = this.owner.getFrontDirection();
		if (inputController.isKeyDown(KeyEnum.LEFT)){
			v3.subtract(angularSpeedDirection, upDirection, angularSpeedDirection);
		}
		if (inputController.isKeyDown(KeyEnum.RIGHT)){
			v3.add(angularSpeedDirection, upDirection, angularSpeedDirection);
		}
		if (inputController.isKeyDown(KeyEnum.UP)){
			v3.add(angularSpeedDirection, leftDirection, angularSpeedDirection);
		}
		if (inputController.isKeyDown(KeyEnum.DOWN)){
			v3.subtract(angularSpeedDirection, leftDirection, angularSpeedDirection);
		}
		if (inputController.isKeyDown(KeyEnum.Q)){
			v3.add(angularSpeedDirection, frontDirection, angularSpeedDirection);
		}
		if (inputController.isKeyDown(KeyEnum.E)){
			v3.subtract(angularSpeedDirection, frontDirection, angularSpeedDirection);
		}

		this.owner.motionComponent.angularSpeedDirection = angularSpeedDirection;
		this.owner.motionComponent.angularSpeed = rotationSpeed;
	}

}
