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
	constructor(transform, color, intensity=-1) {
		super(transform, color);
		// if intensity is -1 then the light won't have attenuation
		this.intensity = intensity;
		this.owner = null;
	}

	getWorldPosition(){
		return [
			this.transform.transformMatrix[12],
			this.transform.transformMatrix[13],
			this.transform.transformMatrix[14]
		];
	}

	getIntensity(){
		return this.intensity;
	}

	update(delta) {
		super.update(delta);
		if (this.owner != null && this.owner != world) {
			this.transform.setLocalPosition(this.owner.transform.position);
		}
	}
};
