'use strict';

// A grid is a data structure that keeps tracks of the positions of the objects in space efficiently
// Best used with static objects
class AxisAlignedGrid {

	constructor(xStart, xResolution, xGridSize, yStart, yResolution, yGridSize, zStart, zResolution, zGridSize) {

		this.xStart = xStart;
		this.xGridSize = xGridSize;
		this.xResolution = xResolution;
		this.yStart = yStart;
		this.yGridSize = yGridSize;
		this.yResolution = yResolution;
		this.zStart = zStart;
		this.zGridSize = zGridSize;
		this.zResolution = zResolution;

		// indexed with x, y and z coordinates
		this.grid = [];
		for (var i = 0; i < xResolution; i++){
			this.grid.push([]);
			for (var j = 0; j < yResolution; j++){
				this.grid[i].push([])		
				for (var k = 0; k < zResolution; k++){
					this.grid[i][j].push([])		
					
				}			
			}			
		}
	}

	// adds an object to the grid
	// to use the grid, the element must have a collider
	insertObject(gameObject){
		// to do: transform with the game object info!

		// calculate the indexes which span
		var minX = gameObject.collider.getMinX();
		var maxX = gameObject.collider.getMaxX();
		var minY = gameObject.collider.getMinY();
		var maxY = gameObject.collider.getMaxY();
		var minZ = gameObject.collider.getMinZ();
		var maxZ = gameObject.collider.getMaxZ();

		// rocks do not have a rotation, have they?
		var transformedLowerLeft = m4.transformPoint(gameObject.transform.transformMatrix, v3.create(minX, minY, minZ));
		var transformedUpperRight = m4.transformPoint(gameObject.transform.transformMatrix, v3.create(maxX, maxY, maxZ));

		var xMinIndex = this.fromXToIndex(transformedLowerLeft[0]);
		var xMaxIndex = this.fromXToIndex(transformedUpperRight[0]);
		var yMinIndex = this.fromYToIndex(transformedLowerLeft[1]);
		var yMaxIndex = this.fromYToIndex(transformedUpperRight[1]);
		var zMinIndex = this.fromZToIndex(transformedLowerLeft[2]); 
		var zMaxIndex = this.fromZToIndex(transformedUpperRight[2]);

		for (var i = xMinIndex; i <= xMaxIndex; i++){
			for (var j = yMinIndex; j <= yMaxIndex; j++){
				for (var k = zMinIndex; k <= zMaxIndex; k++){
					this.grid[i][j][k].push(gameObject);
				}			
			}			
		}
	}	

	fromXToIndex(x){
		return clamp(Math.floor((x - this.xStart) / this.xGridSize), 0, this.xResolution - 1); 
	}

	fromYToIndex(y){
		return clamp(Math.floor((y - this.yStart) / this.yGridSize), 0, this.yResolution - 1); 
	}

	fromZToIndex(z){
		return clamp(Math.floor((z - this.zStart) / this.zGridSize), 0, this.zResolution - 1); 
	}

	getObjectsInPoint(x, y, z){
		var xIndex = this.fromXToIndex(x);
		var yIndex = this.fromYToIndex(y);
		var zIndex = this.fromZToIndex(z);

		return this.grid[xIndex][yIndex][zIndex];
	}


}
