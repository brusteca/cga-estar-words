'use strict';

class Ship extends Model{

	constructor(modelId, textureId, transform, script) {
		super(modelId, textureId, transform, script);

		this.motionComponent = new SpaceShipMotionComponent(this);
	}

	setAngularSpeed(params){
		this.motionComponent.setAngularSpeed(params.x, params.y, params.z);
	}

}
