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
			keyStatus[KeyEnum.UP].pressed || keyStatus[KeyEnum.DOWN].pressed || keyStatus[KeyEnum.Q].pressed
			|| keyStatus[KeyEnum.E].pressed){
			rotationSpeed = 1;
		}

		var angularSpeedDirection = v3.create(0,0,0);
		var upDirection = this.owner.getUpDirection();
		var leftDirection = this.owner.getLeftDirection();
		var frontDirection = this.owner.getFrontDirection();
		if (keyStatus[KeyEnum.LEFT].pressed){
			v3.subtract(angularSpeedDirection, upDirection, angularSpeedDirection);
		}
		if (keyStatus[KeyEnum.RIGHT].pressed){
			v3.add(angularSpeedDirection, upDirection, angularSpeedDirection);
		}
		if (keyStatus[KeyEnum.UP].pressed){
			v3.add(angularSpeedDirection, leftDirection, angularSpeedDirection);
		}
		if (keyStatus[KeyEnum.DOWN].pressed){
			v3.subtract(angularSpeedDirection, leftDirection, angularSpeedDirection);
		}
		if (keyStatus[KeyEnum.Q].pressed){
			v3.add(angularSpeedDirection, frontDirection, angularSpeedDirection);	
		}
		if (keyStatus[KeyEnum.E].pressed){
			v3.subtract(angularSpeedDirection, frontDirection, angularSpeedDirection);
		}

		this.owner.motionComponent.angularSpeedDirection = angularSpeedDirection;
		this.owner.motionComponent.angularSpeed = rotationSpeed; 
	}

}
