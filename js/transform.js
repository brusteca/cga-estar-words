'use strict';

class Transform {
	constructor(position, rotation, scale) {
		// a position vector
		this.position = position || v3.create();
		// a rotation matrix
		this.rotation = rotation || m4.create();
		this.scale = scale || v3.create(1, 1, 1);

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
		let transformMatrix = m4.identity();
		transformMatrix = m4.translate(
			transformMatrix, this.position, transformMatrix);
		transformMatrix = m4.multiply(
			transformMatrix, this.rotation, transformMatrix);
		transformMatrix = m4.scale(
			transformMatrix, this.scale, transformMatrix);

		this.transformMatrix = transformMatrix;	
	}
}
