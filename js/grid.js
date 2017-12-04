'use strict';

// A grid is a data structure that keeps tracks of the positions of the objects in space efficiently
// Best used with static objects
class AxisAlignedGrid {

	constructor(xStart, xResolution, xGridSize, yStart, yResolution, yGridSize, yStart, yResolution, yGridSize) {

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
		// calculate the indexes which span
		var minX = gameObject.collider.getMinX();
		var maxX = gameObject.collider.getMaxX();
		var xMinIndex = clamp(Math.floor((minX - this.xStart) / xResolution), 0, this.xResolution - 1); 
		var xMaxIndex = clamp(Math.floor((maxX - this.xStart) / xResolution), 0, this.xResolution - 1); 

		var minY = gameObject.collider.getMinY();
		var maxY = gameObject.collider.getMaxY();
		var yMinIndex = clamp(Math.floor((minY - this.yStart) / yResolution), 0, this.yResolution - 1); 
		var yMaxIndex = clamp(Math.floor((maxY - this.yStart) / yResolution), 0, this.yResolution - 1); 

		var minZ = gameObject.collider.getMinZ();
		var maxZ = gameObject.collider.getMaxZ();
		var zMinIndex = clamp(Math.floor((minZ - this.zStart) / zResolution), 0, this.zResolution - 1); 
		var zMaxIndex = clamp(Math.floor((maxZ - this.zStart) / zResolution), 0, this.zResolution - 1); 

		for (var i = minX; i <= maxX; i++){
			for (var j = minY; j < maxY; j++){
				for (var k = minZ; k < maxZ; k++){
					this.grid[i][j][k].push(gameObject);		
				}			
			}			
		}
	}	



}
