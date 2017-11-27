
var config = {

	resources : {
		models : {
			tie : "tie-intercept.obj",
			falcon : "millenium-falcon.obj",

			// Environment
			rock_01_100 : "environment/rock1/Rock.obj",
		},
		textures : {
			falcon : "resources/textures/falcon.jpg",
			skybox : "resources/textures/space_skybox_1.png",
			heightmap : "resources/heightmaps/heightmap_Poland_512x512_16c.png",
			// heightmap : "resources/heightmaps/SluJkrJ_1024x1024.png",
			terrain_texture: 'resources/textures/Dirt00seamless_1024x1024.jpg',
			floor_texture : 'resources/textures/dea60ce67a5bb55100ba6a7b1b1620fe.jpg',

			// Environment
			rock_01 : 'resources/textures/environment/rock1/Rock-Texture-Surface.jpg',
		}
	},

	modelDefaults: {
		tie : { file : "tie-intercept.obj", texture : "", color: { r: 200, g : 200, b : 200}, front: { x: 0, y : 0, z : 1} },
		falcon : { file : "millenium-falcon.obj", texture : "falcon.jpg", color: { r: 200, g : 200, b : 200}, front: { x: 0, y : 0, z : 1} }
	},

	scripts : {
		//tieGroup1 : [ { time : 7, function : "setSpeed", parameters : { speed : 0.8 }}, { time : 9.5, function : "setAngularSpeed", parameters : { x : 0, y : 0, z : 3.14 }}, { time : 10.5, function : "setAngularSpeed", parameters : { x : -3.14, y : 0, z : 0 }}, { time : 11.5, function : "setAngularSpeed", parameters : { x : 0, y : 0, z : 0 } }]
		tieScript1 : [ {"time":3.463,"key":87,"duration":11.355},{"time":3.796,"key":73,"duration":0.4830000000000001},{"time":4.778,"key":38,"duration":0.633},{"time":8.957,"key":40,"duration":0.516},{"time":9.523,"key":69,"duration":0.6330000000000009},{"time":10.206,"key":40,"duration":0.45000000000000107},{"time":11.055,"key":81,"duration":1.165000000000001},{"time":12.47,"key":81,"duration":0.26699999999999946},{"time":12.787,"key":40,"duration":0.36599999999999966},{"time":13.869,"key":69,"duration":0.766} ],
		tieScript2 : [{"time":3.7,"key":69,"duration":1.12},{"time":3.7,"key":87,"duration":0},{"time":4.98,"key":87,"duration":95.74},{"time":6.4,"key":81,"duration":0.72},{"time":8.13,"key":81,"duration":0.57},{"time":9.3,"key":69,"duration":1},{"time":10.22,"key":40,"duration":0.33},{"time":11.25,"key":69,"duration":0.63},{"time":12.05,"key":40,"duration":0.1},{"time":12.33,"key":81,"duration":1.49},{"time":13.5,"key":40,"duration":0.17},{"time":14.4,"key":38,"duration":0.03},{"time":14.47,"key":81,"duration":0.08},{"time":15.78,"key":81,"duration":0.57},{"time":16.72,"key":69,"duration":0.46},{"time":17.25,"key":38,"duration":0.15},{"time":17.65,"key":81,"duration":0.62},{"time":17.88,"key":40,"duration":0.47},{"time":18.73,"key":40,"duration":0.09},{"time":19.25,"key":69,"duration":0.73},{"time":19.95,"key":38,"duration":0.03},{"time":20.28,"key":69,"duration":0.82},{"time":21.1,"key":40,"duration":0.1},{"time":21.47,"key":81,"duration":0.63},{"time":22.05,"key":40,"duration":0.03},{"time":22.8,"key":81,"duration":0.05},{"time":22.8,"key":40,"duration":0.05},{"time":23.18,"key":81,"duration":0.8},{"time":23.98,"key":40,"duration":0.12},{"time":24.32,"key":69,"duration":0.5},{"time":24.72,"key":38,"duration":0.11},{"time":25.15,"key":81,"duration":0.5},{"time":25.52,"key":40,"duration":0.21},{"time":26.05,"key":38,"duration":0.08},{"time":26.17,"key":69,"duration":0.98},{"time":26.97,"key":40,"duration":0.1},{"time":27.25,"key":81,"duration":0.28},{"time":27.4,"key":38,"duration":0.12},{"time":28.4,"key":69,"duration":0.07},{"time":28.98,"key":40,"duration":0.04},{"time":29.85,"key":40,"duration":0.02},{"time":30.15,"key":81,"duration":0.9},{"time":31.9,"key":40,"duration":0.07},{"time":32.45,"key":40,"duration":0.1},{"time":33.02,"key":69,"duration":0.55},{"time":33.37,"key":40,"duration":0.1},{"time":34.85,"key":38,"duration":0.03},{"time":35.7,"key":81,"duration":0.12},{"time":36.08,"key":81,"duration":0.24},{"time":36.53,"key":40,"duration":0.35},{"time":37,"key":81,"duration":0.07},{"time":37.52,"key":69,"duration":0.61},{"time":38.73,"key":38,"duration":0.07},{"time":39.55,"key":40,"duration":0.05},{"time":40,"key":38,"duration":0.17},{"time":40.47,"key":40,"duration":0.05},{"time":40.73,"key":40,"duration":0.04},{"time":40.93,"key":40,"duration":0.07},{"time":41.18,"key":40,"duration":0.07},{"time":41.48,"key":38,"duration":0.14},{"time":41.78,"key":40,"duration":0.14},{"time":42.2,"key":38,"duration":0.1},{"time":43.03,"key":69,"duration":0.77},{"time":43.73,"key":40,"duration":0.32},{"time":44.17,"key":81,"duration":0.76},{"time":45.15,"key":69,"duration":0.28},{"time":45.45,"key":38,"duration":0.13},{"time":45.9,"key":69,"duration":0.53},{"time":46.33,"key":40,"duration":0.3},{"time":46.77,"key":38,"duration":0.06},{"time":47,"key":81,"duration":0.65},{"time":47.55,"key":38,"duration":0.2},{"time":48.02,"key":81,"duration":0.46},{"time":48.27,"key":38,"duration":0.05},{"time":48.45,"key":40,"duration":0.43},{"time":48.82,"key":81,"duration":0.21},{"time":49.37,"key":69,"duration":0.71},{"time":51.42,"key":38,"duration":0.06},{"time":51.78,"key":69,"duration":0.94},{"time":52.4,"key":40,"duration":0.43},{"time":52.87,"key":81,"duration":0.35},{"time":53.18,"key":40,"duration":0.7},{"time":54.1,"key":38,"duration":0.22},{"time":54.42,"key":69,"duration":0.2},{"time":54.75,"key":40,"duration":0.33},{"time":55.35,"key":40,"duration":0.08},{"time":55.58,"key":40,"duration":0.39},{"time":56.22,"key":81,"duration":0.81},{"time":56.72,"key":38,"duration":0.23},{"time":57.73,"key":40,"duration":0.22},{"time":57.87,"key":69,"duration":0.05},{"time":58.52,"key":40,"duration":0.03},{"time":58.78,"key":40,"duration":0.07},{"time":59.55,"key":38,"duration":0.03},{"time":60.37,"key":81,"duration":0.65},{"time":60.92,"key":38,"duration":0.13},{"time":61.05,"key":37,"duration":0.22},{"time":61.17,"key":40,"duration":0.61},{"time":61.83,"key":69,"duration":0.25},{"time":62.02,"key":38,"duration":0.11},{"time":62.57,"key":40,"duration":0.15},{"time":62.6,"key":69,"duration":0.03},{"time":62.77,"key":69,"duration":0.11},{"time":63,"key":38,"duration":0.12},{"time":63.53,"key":38,"duration":0.02},{"time":63.73,"key":69,"duration":0.1},{"time":64.97,"key":38,"duration":0.3},{"time":65.33,"key":69,"duration":0.12},{"time":65.58,"key":40,"duration":0.17},{"time":66.53,"key":40,"duration":0.09},{"time":66.85,"key":40,"duration":0.05},{"time":66.95,"key":69,"duration":0.12},{"time":67.37,"key":40,"duration":0.13},{"time":67.73,"key":69,"duration":0.14},{"time":67.97,"key":38,"duration":0.13},{"time":68.48,"key":40,"duration":0.07},{"time":68.63,"key":69,"duration":0.27},{"time":69.17,"key":69,"duration":0.93},{"time":70.22,"key":40,"duration":0.1},{"time":70.9,"key":40,"duration":0.08},{"time":71.08,"key":69,"duration":1.55},{"time":72,"key":40,"duration":0.23},{"time":72.62,"key":40,"duration":0.15},{"time":72.88,"key":40,"duration":0.05},{"time":73.2,"key":38,"duration":0.1},{"time":74.03,"key":38,"duration":0.07},{"time":75.05,"key":69,"duration":0.45},{"time":75.7,"key":38,"duration":0.1},{"time":75.87,"key":69,"duration":0.18},{"time":76.37,"key":40,"duration":0.28},{"time":76.73,"key":69,"duration":0.44},{"time":77.07,"key":40,"duration":0.28},{"time":77.33,"key":81,"duration":0.14},{"time":77.58,"key":40,"duration":0.62},{"time":77.85,"key":81,"duration":0.08},{"time":78.05,"key":81,"duration":0.15},{"time":78.35,"key":81,"duration":0.08},{"time":78.5,"key":40,"duration":0.07},{"time":78.63,"key":81,"duration":1.2},{"time":78.75,"key":40,"duration":0.08},{"time":79.65,"key":40,"duration":0.17},{"time":80.63,"key":81,"duration":0.12},{"time":81.05,"key":81,"duration":0.12},{"time":81.23,"key":40,"duration":0.05},{"time":81.55,"key":69,"duration":0.8},{"time":82.18,"key":38,"duration":0.1},{"time":82.5,"key":81,"duration":0.65},{"time":82.65,"key":40,"duration":0.3},{"time":83.47,"key":69,"duration":0.78},{"time":83.72,"key":38,"duration":0.26},{"time":84.87,"key":40,"duration":0.15},{"time":85.63,"key":38,"duration":0.07},{"time":87.62,"key":81,"duration":0.75},{"time":88.43,"key":40,"duration":0.12},{"time":89.13,"key":81,"duration":0.09},{"time":89.52,"key":40,"duration":0.2},{"time":90.12,"key":69,"duration":0.85},{"time":91.03,"key":38,"duration":0.1},{"time":91.33,"key":40,"duration":0.25},{"time":91.4,"key":69,"duration":0.65},{"time":92,"key":40,"duration":0.12},{"time":92.68,"key":38,"duration":0.17},{"time":93.4,"key":81,"duration":0.52},{"time":95.07,"key":38,"duration":0.06},{"time":95.95,"key":81,"duration":0.92},{"time":96.82,"key":40,"duration":0.16},{"time":97.2,"key":69,"duration":0.93},{"time":98.53,"key":40,"duration":0.05},{"time":100.78,"key":17,"duration":0},{"time":100.87,"key":79,"duration":0}],
		tieGroup1 : [{"time":4.33,"key":87,"duration":49.99},{"time":7.63,"key":69,"duration":0.9},{"time":8.62,"key":40,"duration":0.51},{"time":9.5,"key":40,"duration":0.32},{"time":9.7,"key":81,"duration":0.88},{"time":10.38,"key":40,"duration":0.14},{"time":11.22,"key":69,"duration":0.11},{"time":11.7,"key":69,"duration":0.67},{"time":12.37,"key":40,"duration":0.6},{"time":13.38,"key":69,"duration":0.2},{"time":13.68,"key":38,"duration":0.27},{"time":13.88,"key":81,"duration":1.02},{"time":14.35,"key":38,"duration":0.23},{"time":15.05,"key":38,"duration":0.05},{"time":16.03,"key":69,"duration":0.09},{"time":18.6,"key":81,"duration":0.77},{"time":19.42,"key":40,"duration":0.73},{"time":20.15,"key":69,"duration":0.52},{"time":20.2,"key":40,"duration":0.45},{"time":20.92,"key":38,"duration":0.08},{"time":21.45,"key":40,"duration":0.17},{"time":21.62,"key":81,"duration":0.26},{"time":22.08,"key":69,"duration":2.45},{"time":24.38,"key":38,"duration":1.77},{"time":28.12,"key":40,"duration":0.43},{"time":29.95,"key":69,"duration":0.27},{"time":30.72,"key":32,"duration":0.06},{"time":30.95,"key":32,"duration":0.03},{"time":31.03,"key":32,"duration":0.09},{"time":31.22,"key":32,"duration":0.03},{"time":31.32,"key":32,"duration":0.06},{"time":31.53,"key":32,"duration":0.09},{"time":32.62,"key":40,"duration":0.23},{"time":54.28,"key":17,"duration":0},{"time":54.35,"key":79,"duration":0}]
	},

	models : [
		//{ type : "falcon", transform : { translate : {x : -600, y : -50, z : 800}, scale : { x : 0.5, y : 0.5, z : 0.5 }}, script : [] } ,
		{ type : "tie", transform : { translate : {x : 60, y : 0, z : 0}, rotation : { x : 0, y : 90, z : 0} }, script : "tieScript1" },
		{ type : "tie", transform : { translate : {x : 60, y : -240, z : 0}, rotation : { x : 0, y : 90, z : 0}}, script : "tieScript2" },
		{ type : "tie", transform : { translate : {x : 60, y : -240, z : 0}, rotation : { x : 0, y : 90, z : 0}}, script : "tieGroup1" },
		{ type : "tie", transform : { translate : {x : 40, y : -240, z : -20}, rotation : { x : 0, y : 90, z : 0}}, script : "tieGroup1" },
		{ type : "tie", transform : { translate : {x : 40, y : -240, z : 20}, rotation : { x : 0, y : 90, z : 0}}, script : "tieGroup1" }
	],

	camera : {
		position : { x : 60, y : -240, z : 0}
	},

	globalEvents : [
		// ordered by time!
		/*
		{ time : 1, function : "setCameraAcceleration", parameters : { x : 10, y : 3, z : 0} },
		{ time : 6, function : "setCameraAcceleration", parameters : { x : -10, y : -3, z : 0} },
		{ time : 7, function : "setCameraAcceleration", parameters : { x : 0, y : 0, z : 0} },
		{ time : 7, function : "setCameraSpeed", parameters : { x : 0, y : 0, z : 0} }
		*/
	],

	// generic constants
	laserSpeed : 10

}
