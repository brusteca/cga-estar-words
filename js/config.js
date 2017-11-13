
var config = {

	modelDefaults: {
		tie : { file : "tie-intercept.obj", texture : "", color: { r: 200, g : 200, b : 200}, front: { x: 0, y : 0, z : 1} },
		falcon : { file : "millenium-falcon.obj", texture : "falcon.jpg", color: { r: 200, g : 200, b : 200}, front: { x: 0, y : 0, z : 1} }
	},

	models : [
		//{ type : "falcon", transform : { translate : {x : -600, y : -50, z : 800}, scale : { x : 0.5, y : 0.5, z : 0.5 }}, script : [] } ,
		{ type : "tie", transform : { translate : {x : 0, y : 0, z : -20}, scale : { x : 1, y : 1, z : 1 }, rotation: { x : 0, y : 0, z : 0}}, script : [ { time : 5, function : "setSpeed", parameters : { speed : 0.3 } } ]},
		//{ type : "tie", transform : { translate : {x : -10, y : 20, z : 0}, scale : { x : 1, y : 1, z : 1 }}, script :  [ { time : 5, function : "setSpeed", parameters : { speed : 0 } } ]},
		//{ type : "tie", transform : { translate : {x : -10, y : 20, z : 0}, scale : { x : 1, y : 1, z : 1 }}, script : [ { time : 5, function : "setSpeed", parameters : { speed : 0 } } ]},


	],

	camera : {
		position : [0, 0, 0]
	},

	globalEvents : [
		// ordered by time!
		/*
		{ time : 1, function : "setCameraAcceleration", parameters : { x : 10, y : 3, z : 0} },
		{ time : 6, function : "setCameraAcceleration", parameters : { x : -10, y : -3, z : 0} },
		{ time : 7, function : "setCameraAcceleration", parameters : { x : 0, y : 0, z : 0} },
		{ time : 7, function : "setCameraSpeed", parameters : { x : 0, y : 0, z : 0} }
		*/
	]

}
