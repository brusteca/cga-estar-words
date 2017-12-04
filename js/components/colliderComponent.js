'use strict';

class ColliderComponent {
	constructor(owner) {
		this.owner = owner;
	}

	collidesWith(collider){
		return false;
	}

	getMinX(){
		// overridable
		return 0;
	}

	getMaxX(){
		// overridable
		return 0;		
	}

	getMinY(){
		// overridable
		return 0;
	}

	getMaxY(){
		// overridable
		return 0;
	}

	getMinZ(){
		// overridable
		return 0;
	}

	getMaxZ(){
		// overridable
		return 0;
	}
}
