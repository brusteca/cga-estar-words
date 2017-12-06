'use strict';

// handles all the crap lying about on the field
class Decorations extends GameObject {
	constructor(transform) {
		// should have a centered transform or it won't work
		// coz this is a fucking hack
		super(transform);

		this.rocks = [];
		let rockQty = 1000;
		// here generate the rocks
		// hacks and shit, beware
		let terrain = world.terrain;
		let min_corner = m4.transformPoint(
			terrain.transform.transformMatrix,
			terrain.position_buffer[0]
		);
		let max_corner = m4.transformPoint(
			terrain.transform.transformMatrix,
			terrain.position_buffer[terrain.position_buffer.length - 1]
		);
		function getRandomArbitrary(min, max) {
			return Math.random() * (max - min) + min;
		}
		const models = [
			'rock_01',
			'rock_02',
			'rock_03',
			'rock_04',
			'rock_05',
			'rock_06'
		];
		const textures = [
			'rock_01',
			'rock_02',
			'rock_03',
			'rock_04',
			'rock_05'
		];
		let minX = min_corner[0];
		let minZ = min_corner[2];
		let maxX = max_corner[0];
		let maxZ = max_corner[2];
		for (let ii = 0; ii < rockQty; ++ii) {
			let modelId = models[Utils.randomInteger(0, models.length - 1)];
			let textureId = textures[Utils.randomInteger(0, textures.length - 1)];
			let positionX = getRandomArbitrary(minX, maxX);
			let positionZ = getRandomArbitrary(minZ, maxZ);
			let position = v3.create(positionX, 0, positionZ);
			let positionY = terrain.getHeightAt(position);
			position[1] = positionY;
			let scale = getRandomArbitrary(2, 10);
			let scaleModY = getRandomArbitrary(-2.5, 2.5);
			let scaleModZ = getRandomArbitrary(-2.5, 2.5);
			let rotation = m4.identity();
			// m4.rotateX(rotation, getRandomArbitrary(0, 2*Math.PI), rotation);
			// m4.rotateY(rotation, getRandomArbitrary(0, 2*Math.PI), rotation);
			// m4.rotateZ(rotation, getRandomArbitrary(0, 2*Math.PI), rotation);
			this.rocks.push(new Model(
				modelId,
				textureId,
				new Transform(
					position,
					rotation,
					v3.create(scale, scale + scaleModY, scale + scaleModZ),
					this.transform
				),
				[]
			))
		}

	}

	update(delta) {
		for (let ii = 0, len = this.rocks.length; ii < len; ++ii) {
			this.rocks[ii].update(delta)
		}
	}

	draw(viewProjectionMatrix, worldMatrix=null) {
		for (let ii = 0, len = this.rocks.length; ii < len; ++ii) {
			this.rocks[ii].draw(viewProjectionMatrix, worldMatrix=null)
		}
	}
}
