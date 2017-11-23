'use strict';

// controls the motion of spaceships, which only move to the front
class SpaceShipMotionComponent extends MotionComponent{

	constructor(owner) {
		super(owner);

		this.speed = 0;
		this.acceleration = 0;
		this.angularSpeedDirection = v3.create(0, 0, 0);
		this.angularSpeed = 0;

		this.angularRotation = 0;

		this.rotation = new Quaternion();
	}

	update(delta){
		super.update(delta);

		// rotate the gameobject 

		//if (this.angularSpeedDirection[0] != 0 || this.angularSpeedDirection[1] != 0 || this.angularSpeedDirection[2] != 0)
		//	m4.axisRotate(this.owner.transform.rotation, this.angularSpeedDirection, this.angularSpeed * delta, this.owner.transform.rotation);
		var q = new Quaternion(1, v3.mulScalar(this.angularSpeedDirection, this.angularSpeed * delta)).normalize();
		this.rotation = this.rotation.mul(q);
		this.owner.transform.rotation = this.rotation.toMatrix4();
		//m4.multiply(this.owner.transform.rotation, this.angularSpeedDirection);

		//m4.rotateX(this.owner.transform.rotation, this.angularSpeed[0] * delta, this.owner.transform.rotation);
		//m4.rotateY(this.owner.transform.rotation, this.angularSpeed[1] * delta, this.owner.transform.rotation);
		//m4.rotateZ(this.owner.transform.rotation, this.angularSpeed[2] * delta, this.owner.transform.rotation);

		// speed
		this.speed += this.acceleration * delta;
		this.owner.translate(v3.mulScalar(this.owner.getFrontDirection(), this.speed));

		this.owner.transform.calculateTransformMatrix();
	}

	setSpeed(speed){
		this.speed = speed;
	}

	setAngularSpeed(xSpeed, ySpeed, zSpeed){
		this.angularSpeedDirection[0] = xSpeed;
		this.angularSpeedDirection[1] = ySpeed;
		this.angularSpeedDirection[2] = zSpeed;
	}
}
