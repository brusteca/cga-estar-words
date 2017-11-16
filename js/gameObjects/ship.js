'use strict';

class Ship extends Model{
	
	constructor(modelPath, texturePath, transform, script) {
		super(modelPath, texturePath, transform, script);

		this.motionComponent = new SpaceShipMotionComponent(this);
	}

	setAngularSpeed(params){
		this.motionComponent.setAngularSpeed(params.x, params.y, params.z);
	}

}