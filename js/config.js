
var config = {

	resources : {
		models : {
			tie : "tie-intercept.obj",
			falcon : "millenium-falcon.obj"
		},
		textures : {
			falcon : "resources/textures/falcon.jpg",
			skybox : "resources/textures/space_skybox_1.png"
		}
	},

	modelDefaults: {
		tie : { file : "tie-intercept.obj", texture : "", color: { r: 200, g : 200, b : 200}, front: { x: 0, y : 0, z : 1} },
		falcon : { file : "millenium-falcon.obj", texture : "falcon.jpg", color: { r: 200, g : 200, b : 200}, front: { x: 0, y : 0, z : 1} }
	},

	scripts : {
		tieGroup1 : [ { time : 7, function : "setSpeed", parameters : { speed : 0.8 }}, { time : 9.5, function : "setAngularSpeed", parameters : { x : 0, y : 0, z : 3.14 }}, { time : 10.5, function : "setAngularSpeed", parameters : { x : -3.14, y : 0, z : 0 }}, { time : 11.5, function : "setAngularSpeed", parameters : { x : 0, y : 0, z : 0 } }]
	},

	models : [
		//{ type : "falcon", transform : { translate : {x : -600, y : -50, z : 800}, scale : { x : 0.5, y : 0.5, z : 0.5 }}, script : [] } ,
		{ type : "tie", transform : { translate : {x : -20, y : 20, z : -120}}, script : "tieGroup1" },
		{ type : "tie", transform : { translate : {x : -30, y : 25, z : -140}}, script : "tieGroup1" },
		{ type : "tie", transform : { translate : {x : -10, y : 20, z : -140}}, script : "tieGroup1" }

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
