'use strict';

class FirstPersonFlyBehaviorComponent extends BehaviorComponent {

	constructor(owner) {
		super(owner);

		if (this.owner.acceleration == undefined) {
			throw 'Owner of FirstPersonFlyBehaviorComponent must have acceleration!'
		}
		if (this.owner.topSpeed == undefined) {
			throw 'Owner of FirstPersonFlyBehaviorComponent must have topSpeed!'
		}
	}

	update(delta){
		var inputController = this.owner.inputComponent;
		// accelerate
		if (inputController.isKeyDown(KeyEnum.W)){
			this.owner.motionComponent.setAcceleration(this.owner.acceleration);
		// go backwards
		} else if (inputController.isKeyDown(KeyEnum.S)){
			this.owner.motionComponent.setAcceleration(-this.owner.acceleration);
		// brake
		} else if (inputController.isKeyDown(KeyEnum.B)){
			if (Math.abs(this.owner.motionComponent.speed) < 0.1) {
				this.owner.motionComponent.setSpeed(0);
				this.owner.motionComponent.setAcceleration(0);
			} else {
				this.owner.motionComponent.setAcceleration((this.owner.motionComponent.speed > 0? -1: 1) *  this.owner.acceleration);
			}
		} else  {
			this.owner.motionComponent.setAcceleration(0);
		}
		let newSpeed = this.owner.motionComponent.speed + (delta * this.owner.motionComponent.acceleration);
		if (newSpeed > this.owner.topSpeed) {
			this.owner.motionComponent.setSpeed(this.owner.topSpeed)
		} else {
			this.owner.motionComponent.setSpeed(newSpeed)
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
