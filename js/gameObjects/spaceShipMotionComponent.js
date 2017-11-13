'use strict';

// controls the motion of spaceships, which only move to the front
class SpaceShipMotionComponent extends MotionComponent{

	constructor(owner) {
		super(owner);

		this.speed = 0;
		this.acceleration = 0;
		this.angularSpeed = v3.create(0, 1, 0);
	}

	update(delta){
		super.update(delta);

		// rotate the gameobject 
		m4.rotateX(this.owner.transform.rotation, this.angularSpeed[0] * delta, this.owner.transform.rotation);
		m4.rotateY(this.owner.transform.rotation, this.angularSpeed[1] * delta, this.owner.transform.rotation);
		m4.rotateZ(this.owner.transform.rotation, this.angularSpeed[2] * delta, this.owner.transform.rotation);

		// speed
		this.speed += this.acceleration * delta;
		var frontDirection = v3.copy(this.owner.getFrontDirection());
		m4.transformDirection(this.owner.transform.rotation, frontDirection, frontDirection);

		v3.add(this.owner.transform.position, v3.mulScalar(frontDirection, this.speed), this.owner.transform.position);

		this.owner.transform.calculateTransformMatrix();
	}

	setSpeed(speed){
		this.speed = speed;
	}

	setAngularSpeed(xSpeed, ySpeed, zSpeed){
		this.angularSpeed[0] = xSpeed;
		this.angularSpeed[1] = ySpeed;
		this.angularSpeed[2] = zSpeed;
	}
}
