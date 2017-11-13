'use strict';

class Ship extends Model{
	
	constructor(modelPath, texturePath, transform, script) {
		super(modelPath, texturePath, transform, script);

		this.motionComponent = new SpaceShipMotionComponent(this);
	}

}