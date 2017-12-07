'use strict';

class LaserShot extends GameObject{

	constructor(transform) {
		super(transform);
		// setup GLSL program
		this.programInfo = shaderManager.programInfos['laser'];

		let arrays = {
			// Estos nombres dependen de las variables de los shaders
			a_position: {numComponents: 3, data: this.getGeometry()},
			a_texcoord: {numComponents: 2, data: this.getTextureCoords()}
		};

		this.bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);

		this.useTexture = true;
		this.texture = textureManager.textures['laser'];

 		this.color = [ 1, 0, 0, 1 ]; // pure red, maybe add as an attribute?

 		// controls movement. Its' overkill, as that motion component has plenty more options,
 		// but at least we are reusing components. Name could change, though.
 		this.motionComponent = new SpaceShipMotionComponent(this);

 		// front direction is used to control where the laser moves
 		// required by the motion component
 		this.frontDirection = null;

		this.light = world.getFreeDynamicLight();
		this.light.color = config.laserColor;
		this.light.intensity = 200;
		this.light.owner = this;
	}

	update(delta){
		super.update(delta);

		// if I still have control over my light
		if (this.light.owner == this) {
			this.light.update();
		}
		let position = this.transform.position;
		let terrainHeight = world.terrain.getHeightAt(position);
		// collision against terrain or the shot is outside the terrain
		if (position[1] <= terrainHeight || terrainHeight == -Number.MAX_SAFE_INTEGER) {
			world.removeGameObject(this);
			// if I still have control over my light
			if (this.light.owner == this) {
				this.light.intensity = 0;
				this.light.owner = null;
			}
			// make an explosion if the shot hit the terrain
			if (position[1] <= terrainHeight) {
				let explosionPosition = v3.copy(position);
				explosionPosition[1] = terrainHeight;
				let explosion = new Explosion(new Transform(explosionPosition));
				world.gameObjects.push(explosion);
			}

		}
	}

	setPreDrawGLProperties(){
		// disable cull face to render the laser from all sides
		gl.disable(gl.CULL_FACE);
	}

	setPostDrawGLProperties(){
		gl.enable(gl.CULL_FACE);
	}

	getUniforms(viewProjectionMatrix, worldMatrix) {
		let uniforms = {
			//u_color : this.color,
			u_texture: this.texture
		};
		this.addGameObjectUniforms(uniforms, viewProjectionMatrix, worldMatrix);
		return uniforms;
	}

	getFrontDirection(){
		return this.frontDirection;
	}

	getGeometry() {
		return new Float32Array([
			// horizontal
			 250,  0, -3,
			-250,  0, -3,
			-250,  0,  3,

			-250,  0,  3,
			 250,  0,  3,
			 250,  0, -3,

			 // vertical
			 250, -3,  0,
			-250, -3,  0,
			-250,  3,  0,

			-250,  3,  0,
			 250,  3,  0,
			 250, -3,  0


			 /*

			 // left


			 // right
			 -250, -3,  3,
			 -250, -3, -3,
			 -250,  3, -3,

			 -250,  3, -3,
			 -250,  3,  3,
			 -250, -3,  3,

			 // front
			  250, -3,  3,
			 -250, -3,  3,
			 -250,  3,  3,

			 -250,  3,  3,
			  250,  3,  3,
			  250, -3,  3,

			 // back
			 -250,  3, -3,
			 -250, -3, -3,
			  250, -3, -3,

			  250, -3, -3,
			  250,  3, -3,
			 -250,  3, -5
			 */
		]);
	};

	getTextureCoords() {
		return new Float32Array([
			// horizontal
			0, 1,
			0, 1,
			1, 0,

			1, 0,
			1, 0,
			0, 1,

			// vertical
			0, 1,
			0, 1,
			1, 0,

			1, 0,
			1, 0,
			0, 1
		]);
	};

}
