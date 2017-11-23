'use strict';

class FirstPersonFlyInputComponent extends InputComponent {

	constructor(owner) {
		super(owner);
	}

	handleInput(keyStatus, delta){
		if (keyStatus[KeyEnum.SPACE].pressed){
			this.owner.motionComponent.setSpeed(1); // this shooould depend on the owner, right?
		}else{
			this.owner.motionComponent.setSpeed(0);
		}
		var rotationSpeed = 0;
		if (keyStatus[KeyEnum.LEFT].pressed || keyStatus[KeyEnum.RIGHT].pressed || 
			keyStatus[KeyEnum.UP].pressed || keyStatus[KeyEnum.DOWN].pressed){
			rotationSpeed = 1;
		}

		var angularSpeedDirection = v3.create(0,0,0);
		var upDirection = this.owner.getUpDirection();
		var leftDirection = this.owner.getLeftDirection();
		if (keyStatus[KeyEnum.LEFT].pressed){
			v3.subtract(angularSpeedDirection, upDirection, angularSpeedDirection);
			//angularSpeedDirection[1] = -1;
		}else if (keyStatus[KeyEnum.RIGHT].pressed){
			//angularSpeedDirection[1] = 1;
			v3.add(angularSpeedDirection, upDirection, angularSpeedDirection);
		}
		if (keyStatus[KeyEnum.UP].pressed){
			v3.add(angularSpeedDirection, leftDirection, angularSpeedDirection);
		}else if (keyStatus[KeyEnum.DOWN].pressed){
			v3.subtract(angularSpeedDirection, leftDirection, angularSpeedDirection);
		}

		this.owner.motionComponent.angularSpeedDirection = angularSpeedDirection;
		this.owner.motionComponent.angularSpeed = rotationSpeed; 
	}

}
