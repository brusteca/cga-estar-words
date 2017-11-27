'use strict';

class World {
	constructor(instructions, cameraPosition) {
		this.physics = new CANNON.World();
		this.physics.gravity.set(0, -9.82, 0); // m/s²

		this.gameObjects = [];
		this.pointLights = [];
		this.events = new BehaviorComponent(instructions, this);

		this.camera = new Camera(new Transform(v3.create(cameraPosition.x,cameraPosition.y,cameraPosition.z)), this, v3.create(-1, 0, 0), 10);
		this.gameObjects.push(this.camera);

		this.skyDome = new SkyDome(new Transform());
		this.gameObjects.push(this.skyDome);

		this.inputComponent = new WorldInputComponent();
	}

	setTerrain(terrain) {
		this.terrain = terrain;
		this.gameObjects.push(terrain);
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
		this.pointLightMaxDistances = new Float32Array(
			this.pointLights.map(
				pointLight =>  pointLight.getMaxDistance()
			)
		);
	}

	update(delta_seconds, gameTime){
		this.physics.step(delta_seconds);
		this.events.update(delta_seconds);

		for (let ii = 0, len = this.pointLights.length; ii < len; ++ii){
			this.pointLights[ii].update(delta_seconds);
		}
		// after updating the lights, set the internal cache
		this.setLightPositionsAndColors();

		for (let ii = 0, len = this.gameObjects.length; ii < len; ++ii) {
			this.gameObjects[ii].update(delta_seconds, gameTime);
		}

	}

	getCameraPosition(){
		return this.camera.transform.position;
	}

	getViewportCenter(){
	    return this.camera.viewportCenter;
	}

	getViewportUpVector(){
	    return this.camera.viewportUp;
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

		for (var i = 0; i < keyStatus.length; i++){
			keyStatus[i].justPressed = false; // used to process inputs only on the first cycle after they are hit
		}
	}

}
