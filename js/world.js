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

		this.shadowMaps = [];
		this.shadowMapTextures = [];
		this.shadowMapUses = [];
		this.shadowMapMVPLightMatrixes = [];

		this.grid = null; // set in main.js
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
				pointLight => pointLight.getWorldPosition()
			))
		);
		this.pointLightColors = new Float32Array(
			[].concat.apply([], this.pointLights.map(
				pointLight => pointLight.getColor()
			))
		);
		this.pointLightIntensities = new Float32Array(
			this.pointLights.map(
				pointLight => pointLight.getIntensity()
			)
		);
	}

	setShadowMapsVariables(){
		this.shadowMapMVPLightMatrixes = [];
		for(var i = 0; i < this.shadowMaps.length; i++){
			var smap = this.shadowMaps[i];
			this.shadowMapUses[i] = smap.useShadowMap;
			for (var j = 0; j < smap.lightViewProjectionMatrix.length; j++){
				this.shadowMapMVPLightMatrixes.push(smap.lightViewProjectionMatrix[j]);				
			}
		}
	}

	update(delta_seconds, gameTime){
		this.physics.step(delta_seconds);
		this.events.update(delta_seconds);

		// only lights that don't have owner are updated here
		for (let ii = 0, len = this.pointLights.length; ii < len; ++ii){
			let light = this.pointLights[ii];
			if (light.owner == null || light.owner == this) {
				light.update(delta_seconds);
			}
		}

		// reverse loop cause some game objects can remove themseles from the gameObjects array on update
		for (let ii = this.gameObjects.length - 1; ii >= 0; --ii) {
			this.gameObjects[ii].update(delta_seconds, gameTime);
		}

		// after updating the lights, set the internal cache
		this.setLightPositionsAndColors();

		// disable the 'one time' hits
		for (var i = 0; i < keyStatus.length; i++){
			keyStatus[i].justPressed = false; // used to process inputs only on the first cycle after they are hit
		}
	}

	getCameraPosition(dst){
		return this.camera.transform.getWorldPosition(dst);
	}

	getViewportCenter(){
	    return this.camera.viewportCenter;
	}

	getViewportUpVector(){
	    return this.camera.viewportUp;
	}

	getProjectionMatrix(aspect, fieldOfViewRadians){
	    // Compute the projection matrix
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

	getDynamicLight(dynamicIndex){
		return this.pointLights[STATIC_LIGHT_COUNT + dynamicIndex];
	}

	removeGameObject(gameObject){
		let index = this.gameObjects.indexOf(gameObject);
		if (index != -1){
			this.gameObjects.splice(index, 1);
		}
	}
}
