
var config = {

	models : [
		//{ model : "millenium-falcon.obj", texture : "falcon.jpg", transform : { translate : {x : -600, y : -50, z : 600}, scale : { x : 0.2, y : 0.2, z : 0.2 }}, script : [] } ,
		{ model : "tie-intercept.obj", texture : "", color: { r: 200, g : 200, b : 200}, transform : { translate : {x : -30, y : -20, z : 30}, scale: {x : 10, y : 10, z : 10}}, script : []},

	],

	camera : {

	},

	globalEvents : [
		// ordered by time!
		{ time : 1, function : "setCameraAcceleration", parameters : { x : 10, y : 3, z : 0} },
		{ time : 6, function : "setCameraAcceleration", parameters : { x : -10, y : -3, z : 0} },
		{ time : 7, function : "setCameraAcceleration", parameters : { x : 0, y : 0, z : 0} },
		{ time : 7, function : "setCameraSpeed", parameters : { x : 0, y : 0, z : 0} }
	]

}
