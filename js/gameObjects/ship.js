'use strict';

class Ship extends Model{

	constructor(modelId, textureId, transform, options={}, lodDistances=[-1]) {
		super(modelId, textureId, transform, options, lodDistances);

		this.topSpeed = options.topSpeed || 6;
		this.acceleration = options.acceleration || 1;

		this.motionComponent = new SpaceShipMotionComponent(this);
		this.behaviorComponents.push(new FirstPersonFlyBehaviorComponent(this));
		this.behaviorComponents.push(new LaserShootingBehaviorComponent(this, options.laser));

		this.baseUpDirection = v3.create(0,1,0);
		this.upDirection = v3.copy(this.baseUpDirection);

		this.baseFrontDirection = v3.create(0,0,1);
		this.frontDirection = v3.copy(this.baseFrontDirection);

		this.baseLeftDirection = v3.create(-1,0,0);
		this.leftDirection = v3.copy(this.baseLeftDirection);
	}

	update(delta){
		super.update(delta);

		m4.transformDirection(this.transform.rotation, this.baseFrontDirection, this.frontDirection);
		m4.transformDirection(this.transform.rotation, this.baseUpDirection, this.upDirection);
		m4.transformDirection(this.transform.rotation, this.baseLeftDirection, this.leftDirection);
	}

	getFrontDirection(){
		return this.frontDirection;
	}

	getUpDirection(){
		return this.upDirection;
	}

	getLeftDirection(){
		return this.leftDirection;
	}

	rotate(x, y, z){
		this.motionComponent.rotate(x, y ,z);
	}

}
