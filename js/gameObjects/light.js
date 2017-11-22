'use strict';

class Light extends GameObject {
	constructor(transform, color) {
		super(transform);
		this.color = color;
	}

	draw(viewProjectionMatrix, worldMatrix=null) {
		// you don't draw lights
	}

	getColor() {
		return this.color;
	}

};

class PointLight extends Light {
	constructor(transform, color, max_distance) {
		super(transform, color);
		this.max_distance = max_distance;
	}

	getPosition(){
		return [
			this.transform.transformMatrix[12],
			this.transform.transformMatrix[13],
			this.transform.transformMatrix[14]
		];
	}

	getMaxDistance(){
		return this.max_distance;
	}
};
