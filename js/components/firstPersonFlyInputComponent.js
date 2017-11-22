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
		var rotationSpeed = 1; // to do: ask to owner?
		var rotatedUp = v3.create(0,0,0);
		m4.transformDirection(this.owner.transform.rotation, this.owner.getUpDirection(), rotatedUp);
		if (keyStatus[KeyEnum.LEFT].pressed){
			// calculate where the up is so we can rotate relative to it
			rotationSpeed = 1;
		}else if (keyStatus[KeyEnum.RIGHT].pressed){
			rotationSpeed = -1;
		}else {
			rotationSpeed = 0;
		}
		this.owner.motionComponent.angularSpeed[0] = rotatedUp[0] * rotationSpeed;
		this.owner.motionComponent.angularSpeed[1] = rotatedUp[1] * rotationSpeed;
		this.owner.motionComponent.angularSpeed[2] = rotatedUp[2] * rotationSpeed;

		if (keyStatus[KeyEnum.UP].pressed){
			this.owner.motionComponent.angularSpeed[2] = -1; // careful, this is in radians
		}else if (keyStatus[KeyEnum.DOWN].pressed){
			this.owner.motionComponent.angularSpeed[2] = 1;
		}else {
			this.owner.motionComponent.angularSpeed[2] = 0;
		}
	}

}
