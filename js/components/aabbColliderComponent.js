'use strict';

class AABBColliderComponent extends ColliderComponent{
	constructor(owner, x1, x2, y1, y2, z1, z2) {
		super(owner);

		// assumes normalized!
		this.x1 = x1;
		this.x2 = x2;
		this.y1 = y1;
		this.y2 = y2;
		this.z1 = z1;
		this.z2 = z2;
	}

	collidesWith(collider){
		let collides = false;
		if (collider instanceof AABBColliderComponent){
			// aabb colision detection
			let aabb = collider;
			if (this.x1 < aabb.x1 + Math.abs(aabb.x2 - aabb.x1) &&
				this.x1 + Math.abs(this.x2 - this.x1) > aabb.x1 &&
				this.y1 < aabb.y1 + Math.abs(aabb.y2 - aabb.y1) &&
				this.y1 + Math.abs(this.y2 - this.y1) > aabb.y1 &&
				this.z1 < aabb.z1 + Math.abs(aabb.z2 - aabb.z1) &&
				this.z1 + Math.abs(this.z2 - this.z1) > aabb.z1){
				
				collides = true;
			}
		}
		return collides;
	}
}
