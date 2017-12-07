'use strict';

class Transform {
	constructor(position, rotation, scale, parent=null) {
		this.parent = parent;
		// a position vector
		this.position = position || v3.create();
		// a rotation matrix
		this.rotation = rotation || m4.create();
		this.scale = scale || v3.create(1, 1, 1);

		// transformMatrix is worldTransformMatrix
		this.transformMatrix = m4.create();
		this.inverseTransformMatrix = m4.create();
		this.localTransformMatrix = m4.create();
		this.localInverseTransformMatrix = m4.create();
		this.calculateTransformMatrix();
	}

	copy(){
		var t = new Transform(
			v3.copy(this.position),
			m4.copy(this.rotation),
			v3.copy(this.scale),
			this.parent
		);
		return t;
	}

	setLocalPosition(newPosition, calculateTransform=true){
		v3.copy(newPosition, this.position);
		if (calculateTransform) {
			this.calculateTransformMatrix();
		}
	}

	setLocalRotation(newRotation, calculateTransform=true){
		m4.copy(newRotation, this.rotation);
		if (calculateTransform) {
			this.calculateTransformMatrix();
		}
	}

	setLocalScale(newScale, calculateTransform=true){
		v3.copy(newScale, this.scale);
		if (calculateTransform) {
			this.calculateTransformMatrix();
		}
	}

	translate(vector, calculateTransform=true){
		v3.add(this.position, vector, this.position);
		if (calculateTransform) {
			this.calculateTransformMatrix();
		}
	}

	rotateY(angle, calculateTransform=true){
		m4.rotateY(this.rotation, angle, this.rotation);
		if (calculateTransform) {
			this.calculateTransformMatrix();
		}
	}

	applyScale(amount, calculateTransform=true){
		v3.mulScalar(this.scale, amount, this.scale);
		if (calculateTransform) {
			this.calculateTransformMatrix();
		}
	}

	getWorldPosition(dst) {
		return m4.getTranslation(this.transformMatrix, dst);
	}

	calculateTransformMatrix(){
		m4.identity(this.localTransformMatrix);
		m4.translate(this.localTransformMatrix, this.position, this.localTransformMatrix);
		m4.multiply(this.localTransformMatrix, this.rotation, this.localTransformMatrix);
		m4.scale(this.localTransformMatrix, this.scale, this.localTransformMatrix);
		m4.inverse(this.localTransformMatrix, this.localInverseTransformMatrix);

		if (this.parent != null) {
			m4.multiply(this.parent.transformMatrix, this.localTransformMatrix, this.transformMatrix);
			// not sure if this is right
			m4.inverse(this.transformMatrix, this.inverseTransformMatrix);
		} else {
			m4.copy(this.localTransformMatrix, this.transformMatrix);
			m4.copy(this.localInverseTransformMatrix, this.inverseTransformMatrix);
		}
	}
}
