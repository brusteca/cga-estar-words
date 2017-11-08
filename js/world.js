'use strict';

class World {
	constructor(instructions) {
		this.gameObjects = [];
		this.pointLights = [];
		this.events = new BehaviorComponent(instructions, this);

		// camera and viewport information
		this.cameraPosition = v3.create(10,20,0);
		this.cameraSpeed = v3.create(0,0,0);
		this.cameraAcceleration = v3.create(0,0,0);
		this.viewportCenter = v3.create(0,20,0);
		this.viewportUp = v3.create(0,1,0);
	}

	setLightPositionsAndColors() {
		// after updating the lights, set the internal cache
		// TODO: don't make a new instance each time
		this.pointLightPositions = new Float32Array(
			[].concat.apply([], this.pointLights.map(
				pointLight =>  pointLight.getPosition()
			))
		);
		this.pointLightColors = new Float32Array(
			[].concat.apply([], this.pointLights.map(
				pointLight =>  pointLight.getColor()
			))
		);


	}

	update(delta){
		this.events.update(delta);

		for (let ii = 0, len = this.pointLights.length; ii < len; ++ii){
			this.pointLights[ii].update(delta);
		}
		// after updating the lights, set the internal cache
		this.setLightPositionsAndColors();

		for (let ii = 0, len = this.gameObjects.length; ii < len; ++ii) {
			this.gameObjects[ii].update(delta);
		}

		this.updateCamera(delta);

	}

	updateCamera(delta){
		// to do: don't waste so much memory...

		// to do: could improve accuracy using the method of the trapecio (no clue how to translate TRAPECIO)
		v3.add(this.cameraSpeed, v3.mulScalar(this.cameraAcceleration, delta), this.cameraSpeed);

		v3.add(this.cameraPosition, v3.mulScalar(this.cameraSpeed, delta), this.cameraPosition);
		v3.add(this.viewportCenter, v3.mulScalar(this.cameraSpeed, delta), this.viewportCenter);
	}

	setCameraSpeed(params){
		this.cameraSpeed[0] = params.x;
		this.cameraSpeed[1] = params.y;
		this.cameraSpeed[2] = params.z;
	}

	setCameraAcceleration(params){
		this.cameraAcceleration[0] = params.x;
		this.cameraAcceleration[1] = params.y;
		this.cameraAcceleration[2] = params.z;
	}

	setCameraRotation(){

	}

	setCameraRotationSpeed(){

	}

	setCameraRotationAcceleration(){

	}

	getCameraPosition(){
		return this.cameraPosition;
	}

	getViewportCenter(){
	    return this.viewportCenter;
	}

	getViewportUpVector(){
	    return this.viewportUp;
	}

	getProjectionMatrix(){
	    // Compute the projection matrix
	    var aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
	    var zNear = 1;
	    var zFar = 2000;
	    var projectionMatrix = m4.perspective(fieldOfViewRadians, aspect, zNear, zFar);
	    return projectionMatrix;
	}

}
