'use strict';

class PhysicsComponent {


	constructor(owner, body) {
		this.owner = owner;
		this.body = body;

		this.count = 0;
	}

	update(){
		this.owner.transform.position[0] = this.body.position.x;
		this.owner.transform.position[1] = this.body.position.y;
		this.owner.transform.position[2] = this.body.position.z;
		// TODO: rotations with body.quaternion
		this.owner.transform.calculateTransformMatrix();
	}

}
