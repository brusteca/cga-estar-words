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
		}else if (collider instanceof Float32Array && collider.length == 3){
			// point
			// this shouldn't be here, but no time
			let lowerLeft = m4.transformPoint(this.owner.transform.transformMatrix, v3.create(this.x1, this.y1, this.z1));
			let upperRight = m4.transformPoint(this.owner.transform.transformMatrix, v3.create(this.x2, this.y2, this.z2));
			
			if (lowerLeft[0] < collider[0] &&
				upperRight[0] > collider[0] &&
				lowerLeft[1] < collider[1] &&
				upperRight[1] > collider[1] &&
				lowerLeft[2] < collider[2] &&
				upperRight[2] > collider[2]){
				collides = true;
			}
		}
		return collides;
	}

	getMinX(){
		return this.x1;
	}

	getMaxX(){
		return this.x2;
	}

	getMinY(){
		return this.y1;
	}

	getMaxY(){
		return this.y2;
	}

	getMinZ(){
		return this.z1;
	}

	getMaxZ(){
		return this.z2;
	}
}
