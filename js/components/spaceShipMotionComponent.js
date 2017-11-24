'use strict';

// controls the motion of spaceships, which only move to the front and can rotate freely
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
		if (this.angularSpeed > 0){
			var q = new Quaternion(1, v3.mulScalar(this.angularSpeedDirection, this.angularSpeed * delta)).normalize();
			this.rotation = this.rotation.mul(q);
			this.owner.transform.rotation = this.rotation.toMatrix4();
		}

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
