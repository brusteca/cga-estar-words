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

		// index in the array of the next free light
		this.availableLight = 0;
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

		// reverse loop cause some game objects can remove themseles from the gameObjects array on updat4e
		for (let ii = this.gameObjects.length - 1; ii >= 0; --ii) {
			this.gameObjects[ii].update(delta_seconds, gameTime);
		}

		// disable the 'one time' hits
		for (var i = 0; i < keyStatus.length; i++){
			keyStatus[i].justPressed = false; // used to process inputs only on the first cycle after they are hit
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

	getFreeDynamicLight(){
		// hardcoded stride and maxlights...
		var pointLight = this.pointLights[this.availableLight + STATIC_LIGHT_COUNT]; // first 3 light are fixed lights
		this.availableLight = (this.availableLight + 1) % DYNAMIC_LIGHT_COUNT;
		return pointLight;
	}

	removeGameObject(gameObject){
		let index = this.gameObjects.indexOf(gameObject);
		if (index != -1){
			this.gameObjects.splice(index, 1);
		}
	}
}
