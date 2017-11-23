'use strict';

class Camera extends GameObject{
	
	constructor(transform, world, frontDirection, viewportDistance) {
		super(transform);

		this.motionComponent = new SpaceShipMotionComponent(this);
		this.inputComponent = new FirstPersonFlyInputComponent(this);

		// camera and viewport information
		this.baseViewportUp = v3.create(0,1,0);
		this.viewportUp = v3.create(0,1,0);

		this.baseFrontDirection = v3.copy(frontDirection); // front direction before applying any transforms
		this.frontDirection = frontDirection;		
		
		this.baseLeftDirection = v3.create(0,0,-1); // front direction before applying any transforms
		this.leftDirection = v3.copy(this.baseLeftDirection);
		
		this.viewportCenter = v3.create(0,0,0);
		this.viewportDistance = viewportDistance;
		this.viewportCenterCameraSegment = v3.create(0,0,0); // to avoid allocations
		this.calculateViewportCenter();

		this.world = world;
	}

	update(delta){
		// call game object's update method to trigger component functions 
		super.update(delta); 

		// process rotation by rotation the front and up directions and then calculating the center of the viewport
		m4.transformDirection(this.transform.rotation, this.baseFrontDirection, this.frontDirection);
		m4.transformDirection(this.transform.rotation, this.baseViewportUp, this.viewportUp);
		m4.transformDirection(this.transform.rotation, this.baseLeftDirection, this.leftDirection);

		this.calculateViewportCenter();
	}

	draw(){
		// override gameObject draw function so it actually doesn't draw anything
	}

	getFrontDirection(){
		return this.frontDirection;
	}

	getUpDirection(){
		return this.viewportUp;
	}

	getLeftDirection(){
		return this.leftDirection;	
	}

	calculateViewportCenter(){
		v3.add(this.transform.position, 
			v3.mulScalar(this.frontDirection, this.viewportDistance, this.viewportCenterCameraSegment),
			this.viewportCenter);
	}

	translate(direction){
		v3.add(this.transform.position, direction, this.transform.position);
		
		// override function to move skybox and viewport as well
		v3.add(this.viewportCenter, direction, this.viewportCenter);
		v3.add(this.world.skyDome.transform.position, direction, this.world.skyDome.transform.position);
		this.world.skyDome.transform.calculateTransformMatrix();
	}

}