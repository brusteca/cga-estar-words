'use strict';

class Transform {
	constructor(position, rotation, scale) {
		// a position vector
		this.position = position || v3.create();
		// a rotation matrix
		this.rotation = rotation || m4.create();
		this.scale = scale || v3.create(1, 1, 1);

		this.transformMatrix = m4.create();
		this.calculateTransformMatrix();
	}

	setPosition(newPosition){
		this.position = newPosition;
	}

	setRotation(newRotation){
		this.rotation = newRotation;
	}

	setScale(newScale){
		this.scale = newScale;
	}

	calculateTransformMatrix(){
		m4.identity(this.transformMatrix);
		m4.translate(this.transformMatrix, this.position, this.transformMatrix);
		m4.multiply(this.transformMatrix, this.rotation, this.transformMatrix);
		m4.scale(this.transformMatrix, this.scale, this.transformMatrix);
	}
}
