
var config = {
	
	models : [
		//{ model : "millenium-falcon.obj", texture : "falcon.jpg", transform : { translate : {x : -600, y : -50, z : 600}, scale : { x : 0.2, y : 0.2, z : 0.2 }}, script : [] } ,
		{ model : "tie-intercept.obj", texture : "", color: { r: 200, g : 200, b : 200}, ransform : { translate : {x : -60, y : -20, z : 60}}, script : []},
		
	],

	camera : {

	},

	globalEvents : [
		// ordered by time!
		{ time : 1, function : "setCameraAcceleration", parameters : { x : 10, y : 10, z : 10} },
		{ time : 6, function : "setCameraAcceleration", parameters : { x : -10, y : -10, z : -10} }
	]

}
