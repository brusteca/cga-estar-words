'use strict';

class World {
	constructor(instructions) {
		this.physics = new CANNON.World();
		this.physics.gravity.set(0, -9.82, 0); // m/s²
		// this.physics.gravity.set(0, 0, -9.82); // m/s²

		this.gameObjects = [];
		this.pointLights = [];
		this.events = new BehaviorComponent(instructions, this);

		// camera and viewport information
		this.cameraPosition = v3.create(60,0,0);
		this.cameraSpeed = v3.create(0,0,0);
		this.cameraAcceleration = v3.create(0,0,0);
		this.viewportCenter = v3.create(50,0,0);
		this.viewportUp = v3.create(0,1,0);

		this.skyDome = new SkyDome(new Transform());
		this.gameObjects.push(this.skyDome);


		this.inputComponent = new WorldInputComponent();
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

	update(delta_seconds){
		this.physics.step(delta_seconds);
		this.events.update(delta_seconds);

		for (let ii = 0, len = this.pointLights.length; ii < len; ++ii){
			this.pointLights[ii].update(delta_seconds);
		}
		// after updating the lights, set the internal cache
		this.setLightPositionsAndColors();

		for (let ii = 0, len = this.gameObjects.length; ii < len; ++ii) {
			this.gameObjects[ii].update(delta_seconds);
		}

		this.updateCamera(delta_seconds);
	}

	updateCamera(delta_seconds){
		// to do: don't waste so much memory...

		// to do: could improve accuracy using the method of the trapecio (no clue how to translate TRAPECIO)
		v3.add(this.cameraSpeed, v3.mulScalar(this.cameraAcceleration, delta_seconds), this.cameraSpeed);

		v3.add(this.cameraPosition, v3.mulScalar(this.cameraSpeed, delta_seconds), this.cameraPosition);
		v3.add(this.viewportCenter, v3.mulScalar(this.cameraSpeed, delta_seconds), this.viewportCenter);
		v3.add(this.skyDome.transform.position, v3.mulScalar(this.cameraSpeed, delta_seconds), this.skyDome.transform.position);
		this.skyDome.transform.calculateTransformMatrix();
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
		this.cameraRotation[0] = params.x;
		this.cameraRotation[1] = params.y;
		this.cameraRotation[2] = params.z;
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
	    var zFar = 20000;
	    var projectionMatrix = m4.perspective(fieldOfViewRadians, aspect, zNear, zFar);
	    return projectionMatrix;
	}

	handleInput(keyStatus){
		this.inputComponent.handleInput(keyStatus);

		for (var i = 0; i < keyStatus.length; i++){
			keyStatus[i].justPressed = false; // used to process inputs only on the first cycle after they are hit
		}
	}

}
