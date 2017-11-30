
var config = {

	resources: {
		models: {
			// tie : {
			// 	file : "resources/models/tie-intercept.obj",
			// 	texture : "",
			// 	color: { r: 200, g : 200, b : 200},
			// 	front: { x: 0, y : 0, z : 1}
			// },
			// falcon : {
			// 	file : "resources/models/millenium-falcon.obj",
			// 	texture : "falcon.jpg",
			// 	color: { r: 200, g : 200, b : 200},
			// 	front: { x: 0, y : 0, z : 1}
			// },

			rock: {
				lod_files: [
					{
						file: "resources/models/environment/rock1/Rock1_100.obj",
						max_distance: 300
					},
					{
						file: "resources/models/environment/rock1/Rock1_50.obj",
						max_distance: 800
					},
					{
						file: "resources/models/environment/rock1/Rock1_10.obj",
						max_distance: 10000
					}
				],
				texture: 'rock_01',
				color: { r: 200, g : 200, b : 200},
				front: { x: 0, y : 0, z : 1}
			}
		},
		textures: {
			falcon : "resources/textures/falcon.jpg",
			skybox : {
				src: "resources/textures/space_skybox_1.png",
			},
			heightmap : "resources/heightmaps/heightmap_Poland_512x512_16c.png",
			// heightmap : "resources/heightmaps/SluJkrJ_1024x1024.png",
			terrain_texture: {
				src: 'resources/textures/Dirt00seamless_1024x1024.jpg',
				wrap: gl.REPEAT,
				auto: true
			},
			floor_texture : 'resources/textures/dea60ce67a5bb55100ba6a7b1b1620fe.jpg',

			// Environment
			rock_01 :{
				src: 'resources/textures/environment/rock1/Rock-Texture-Surface.jpg',
			},
		},
		shaders: {
			default: {
				vertex: "3d-vertex-shader",
				fragment: "3d-fragment-shader"
			},
			minimal: {
				vertex: "3d-vertex-shader-terrain",
				fragment: "3d-fragment-shader-terrain"
			},
			skybox: {
				vertex: "3d-vertex-shader-skydome",
				fragment: "3d-fragment-shader-skydome"
			},
		}
	},

	scripts : {
		tieGroup1 : [ { time : 7, function : "setSpeed", parameters : { speed : 0.8 }}, { time : 9.5, function : "setAngularSpeed", parameters : { x : 0, y : 0, z : 3.14 }}, { time : 10.5, function : "setAngularSpeed", parameters : { x : -3.14, y : 0, z : 0 }}, { time : 11.5, function : "setAngularSpeed", parameters : { x : 0, y : 0, z : 0 } }]
	},

	models : [
		//{ type : "falcon", transform : { translate : {x : -600, y : -50, z : 800}, scale : { x : 0.5, y : 0.5, z : 0.5 }}, script : [] } ,
		//{ type : "tie", transform : { translate : {x : -20, y : 20, z : -120}}, script : "tieGroup1" },
		//{ type : "tie", transform : { translate : {x : -30, y : 25, z : -140}}, script : "tieGroup1" },
		//{ type : "tie", transform : { translate : {x : -10, y : 20, z : -140}}, script : "tieGroup1" },
		// { type : "rock", transform : { translate : {x : -10, y : 20, z : -140}}, script : [] },

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
	],

	// generic constants
	laserSpeed : 50

}
