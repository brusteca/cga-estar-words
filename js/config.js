
var config = {

	resources: {
		models: {
			tie_interceptor : {
				color: { r: 200, g : 200, b : 200},
				front: { x: 0, y : 0, z : 1},
				lod_files: [
					{
						file: "resources/models/tie-intercept.obj",
						max_distance: -1
					},
				],
				texture: 'tie_placeholder',
			},
			tie_fighter: {
				color: { r: 200, g : 200, b : 200},
				front: { x: 0, y : 0, z : 1},
				lod_files: [
					{
						file: "resources/models/ships/TieFighter/TieFighter_100.obj",
						max_distance: 300
					},
					{
						file: "resources/models/ships/TieFighter/TieFighter_50.obj",
						max_distance: 800
					},
					{
						file: "resources/models/ships/TieFighter/TieFighter_20.obj",
						max_distance: 10000
					},
				],
				texture: 'tie_placeholder',
			},
			// falcon : {
			// 	lod_files: [
			// 		{file : "resources/models/millenium-falcon.obj",
			// 		max_distance: -1}
			// 	],
			// 	texture : "falcon",
			// 	color: { r: 200, g : 200, b : 200},
			// 	front: { x: 0, y : 0, z : 1}
			// },

			rock_01: {
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
			},
			rock_02: {
				lod_files: [
					{
						file: "resources/models/environment/rock2/Rock2_100.obj",
						max_distance: 400
					},
					{
						file: "resources/models/environment/rock2/Rock2_30.obj",
						max_distance: 800
					}
				],
				texture: 'rock_02',
				color: { r: 200, g : 200, b : 200},
				front: { x: 0, y : 0, z : 1}
			},
			rock_03: {
				lod_files: [
					{
						file: "resources/models/environment/rock3/Rock3_100.obj",
						max_distance: 400
					},
					{
						file: "resources/models/environment/rock3/Rock3_30.obj",
						max_distance: 800
					}
				],
				texture: 'rock_03',
				color: { r: 200, g : 200, b : 200},
				front: { x: 0, y : 0, z : 1}
			},
			rock_04: {
				lod_files: [
					{
						file: "resources/models/environment/rock4/Rock4_100.obj",
						max_distance: 400
					},
					{
						file: "resources/models/environment/rock4/Rock4_30.obj",
						max_distance: 800
					}
				],
				texture: 'rock_04',
				color: { r: 200, g : 200, b : 200},
				front: { x: 0, y : 0, z : 1}
			},
			rock_05: {
				lod_files: [
					{
						file: "resources/models/environment/rock5/Rock5_100.obj",
						max_distance: 400
					},
					{
						file: "resources/models/environment/rock5/Rock5_20.obj",
						max_distance: 800
					}
				],
				texture: 'rock_05',
				color: { r: 200, g : 200, b : 200},
				front: { x: 0, y : 0, z : 1}
			},
			rock_06: {
				lod_files: [
					{
						file: "resources/models/environment/rock6/Rock6_100.obj",
						max_distance: 400
					},
					{
						file: "resources/models/environment/rock6/Rock6_30.obj",
						max_distance: 800
					}
				],
				texture: 'rock_05',
				color: { r: 200, g : 200, b : 200},
				front: { x: 0, y : 0, z : 1}
			},
		},
		textures: {
			falcon : {
				src:  "resources/textures/falcon.jpg"
			},
			tie_placeholder: {
				src: "resources/textures/tie_placeholder.jpg"
			},
			skybox : {
				src: "resources/textures/space_skybox_1.png",
			},
			redLaser : {
				src: "resources/textures/redLaser.png",
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
				src: 'resources/textures/environment/rocks/rock-texture-surface.jpg',
			},
			rock_02 :{
				src: 'resources/textures/environment/rocks/rock5.jpg',
			},
			rock_03 :{
				src: 'resources/textures/environment/rocks/rock6.jpg',
			},
			rock_04 :{
				src: 'resources/textures/environment/rocks/rocktexture1.jpg',
			},
			rock_05 :{
				src: 'resources/textures/environment/rocks/rocktexture2.jpg',
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
			laser: {
				vertex: "3d-vertex-shader-laser",
				fragment: "3d-fragment-shader-laser"
			},
			laserExplosionParticle : {
				vertex: "3d-vertex-shader-laser-explosion-particle",
				fragment: "3d-fragment-shader-laser-explosion-particle"
			},
			shadowMap : {
				vertex: "3d-vertex-shader-shadow-map",
				fragment: "3d-fragment-shader-shadow-map"
			},
		}
	},

	scripts : {
		'emptyScript': [],
		'chased_1': [{"time":0,"key":87,"duration":13.19},{"time":2.700000000000001,"key":38,"duration":0.22},{"time":3.24,"key":40,"duration":0.38},{"time":3.24,"key":39,"duration":0.38},{"time":3.870000000000001,"key":38,"duration":0.18},{"time":4.290000000000001,"key":69,"duration":0.35},{"time":4.74,"key":39,"duration":0.5},{"time":4.74,"key":40,"duration":0.46},{"time":5.27,"key":69,"duration":0.18},{"time":5.49,"key":39,"duration":0.16},{"time":5.52,"key":40,"duration":0.13},{"time":6.42,"key":37,"duration":0.17},{"time":6.84,"key":81,"duration":0.15},{"time":7.1899999999999995,"key":38,"duration":0.13},{"time":7.540000000000001,"key":69,"duration":0.11},{"time":8.14,"key":39,"duration":0.21},{"time":8.55,"key":81,"duration":0.1},{"time":8.719999999999999,"key":40,"duration":0.15},{"time":9.149999999999999,"key":40,"duration":0.22},{"time":9.850000000000001,"key":38,"duration":0.12},{"time":10.469999999999999,"key":40,"duration":0.2},{"time":10.8,"key":81,"duration":0.12},{"time":11.02,"key":40,"duration":0.55},{"time":11.39,"key":81,"duration":0.13},{"time":11.899999999999999,"key":81,"duration":0.12},{"time":12.3,"key":81,"duration":0.2},{"time":13.420000000000002,"key":39,"duration":1.03},{"time":14.27,"key":38,"duration":0.13},{"time":15.09,"key":81,"duration":0.4},{"time":15.45,"key":37,"duration":0.17},{"time":15.969999999999999,"key":81,"duration":0.23},{"time":16.35,"key":37,"duration":0.12},{"time":17,"key":37,"duration":0.07},{"time":17.67,"key":40,"duration":0.15},{"time":18.37,"key":38,"duration":0.13},{"time":18.8,"key":39,"duration":0.2},{"time":19.15,"key":40,"duration":0.42},{"time":19.9,"key":38,"duration":0.09},{"time":20.34,"key":38,"duration":0.13},{"time":20.57,"key":83,"duration":1.58},{"time":22.27,"key":87,"duration":0.97},{"time":22.42,"key":40,"duration":0.2},{"time":22.54,"key":39,"duration":0.15},{"time":23.17,"key":39,"duration":0.22},{"time":23.47,"key":87,"duration":1.08},{"time":23.939999999999998,"key":37,"duration":0.1},{"time":24.5,"key":81,"duration":0.47},{"time":24.97,"key":37,"duration":0.33},{"time":25.5,"key":81,"duration":0.15},{"time":25.6,"key":37,"duration":0.02},{"time":25.799999999999997,"key":39,"duration":0.29},{"time":26,"key":40,"duration":0.5},{"time":26.17,"key":37,"duration":0.37},{"time":26.79,"key":40,"duration":0.26},{"time":26.79,"key":37,"duration":0.3},{"time":27.35,"key":37,"duration":0.17},{"time":27.35,"key":40,"duration":0.72},{"time":28.270000000000003,"key":40,"duration":0.25},{"time":28.770000000000003,"key":37,"duration":0.12},{"time":28.97,"key":38,"duration":0.28},{"time":29.520000000000003,"key":81,"duration":0.3},{"time":29.689999999999998,"key":37,"duration":0.21},{"time":30.07,"key":69,"duration":0.65},{"time":30.75,"key":40,"duration":0.1},{"time":31.39,"key":39,"duration":0.2},{"time":31.89,"key":69,"duration":0.16},{"time":38.24,"key":17,"duration":0},{"time":38.34,"key":79,"duration":0}],
		'chaser_1': [{"time":0,"key":87,"duration":3.05},{"time":0.620000000000001,"key":39,"duration":0.1},{"time":1.3200000000000003,"key":39,"duration":0.11},{"time":1.7700000000000014,"key":39,"duration":0.05},{"time":2.1500000000000004,"key":37,"duration":0.1},{"time":2.8000000000000007,"key":39,"duration":0.05},{"time":2.8500000000000014,"key":38,"duration":0.32},{"time":3.4300000000000015,"key":39,"duration":0.32},{"time":3.5200000000000014,"key":40,"duration":0.51},{"time":4.280000000000001,"key":39,"duration":0.25},{"time":4.33,"key":40,"duration":0.2},{"time":4.630000000000001,"key":38,"duration":0.34},{"time":5.23,"key":39,"duration":0.15},{"time":5.300000000000001,"key":38,"duration":0.42},{"time":6.07,"key":39,"duration":0.46},{"time":6.120000000000001,"key":40,"duration":0.41},{"time":6.780000000000001,"key":39,"duration":0.34},{"time":6.92,"key":69,"duration":0.28},{"time":7.270000000000001,"key":38,"duration":0.18},{"time":8,"key":39,"duration":0.1},{"time":8.27,"key":37,"duration":0.21},{"time":8.32,"key":81,"duration":0.3},{"time":8.830000000000002,"key":38,"duration":0.1},{"time":9.05,"key":32,"duration":0.23},{"time":9.280000000000001,"key":39,"duration":0.45},{"time":9.52,"key":40,"duration":0.21},{"time":9.82,"key":69,"duration":0.1},{"time":10.220000000000002,"key":37,"duration":0.26},{"time":10.420000000000002,"key":38,"duration":0.06},{"time":10.920000000000002,"key":32,"duration":0.21},{"time":11.129999999999999,"key":39,"duration":0.17},{"time":11.170000000000002,"key":40,"duration":0.3},{"time":11.52,"key":37,"duration":0.16},{"time":11.920000000000002,"key":40,"duration":0.41},{"time":11.920000000000002,"key":39,"duration":0.41},{"time":12.57,"key":32,"duration":0.15},{"time":12.900000000000002,"key":37,"duration":0.25},{"time":13.420000000000002,"key":38,"duration":0.13},{"time":13.720000000000002,"key":32,"duration":0.03},{"time":13.970000000000002,"key":69,"duration":0.25},{"time":14.05,"key":39,"duration":0.55},{"time":14.27,"key":40,"duration":0.71},{"time":15.07,"key":39,"duration":0.13},{"time":15.420000000000002,"key":40,"duration":0.26},{"time":16.18,"key":81,"duration":0.4},{"time":16.43,"key":37,"duration":0.2},{"time":16.580000000000002,"key":38,"duration":0.12},{"time":17.35,"key":38,"duration":0.27},{"time":17.43,"key":81,"duration":0.25},{"time":17.62,"key":37,"duration":0.43},{"time":18.37,"key":81,"duration":0.25},{"time":18.37,"key":38,"duration":0.38},{"time":18.45,"key":37,"duration":0.23},{"time":19.05,"key":39,"duration":0.35},{"time":19.67,"key":40,"duration":0.23},{"time":20.52,"key":39,"duration":0.11},{"time":21.23,"key":83,"duration":1.07},{"time":21.78,"key":38,"duration":0.12},{"time":22.77,"key":83,"duration":0.28},{"time":22.87,"key":37,"duration":0.03},{"time":23.17,"key":87,"duration":1.13},{"time":23.7,"key":32,"duration":0.2},{"time":24.430000000000003,"key":40,"duration":0.34},{"time":24.720000000000002,"key":39,"duration":0.1},{"time":25.13,"key":38,"duration":0.29},{"time":25.680000000000003,"key":37,"duration":0.35},{"time":26.12,"key":81,"duration":0.38},{"time":26.2,"key":37,"duration":0.3},{"time":26.27,"key":40,"duration":0.23},{"time":26.900000000000002,"key":37,"duration":0.37},{"time":27.599999999999998,"key":81,"duration":0},{"time":27.720000000000002,"key":83,"duration":1.1},{"time":27.98,"key":40,"duration":0.22},{"time":28.13,"key":37,"duration":0.22},{"time":28.779999999999998,"key":37,"duration":0.15},{"time":29.12,"key":83,"duration":0.4},{"time":29.37,"key":37,"duration":0.23},{"time":29.849999999999998,"key":40,"duration":0.25},{"time":30.720000000000002,"key":37,"duration":0.2},{"time":30.95,"key":87,"duration":1.3},{"time":31.279999999999998,"key":32,"duration":0.17},{"time":31.279999999999998,"key":39,"duration":0.17},{"time":31.7,"key":39,"duration":0.1},{"time":32.22,"key":39,"duration":0.3},{"time":32.25,"key":38,"duration":0.27},{"time":32.83,"key":38,"duration":0.05},{"time":32.879999999999995,"key":39,"duration":0.05},{"time":33.08,"key":40,"duration":0.35},{"time":33.43000000000001,"key":37,"duration":0.05},{"time":33.75,"key":38,"duration":0.12},{"time":34.2,"key":32,"duration":0.15},{"time":34.849999999999994,"key":38,"duration":0.32},{"time":35.57000000000001,"key":39,"duration":0.2},{"time":35.82000000000001,"key":40,"duration":0.25},{"time":36.53,"key":69,"duration":0.12},{"time":36.7,"key":37,"duration":0.17},{"time":36.97,"key":40,"duration":0.18},{"time":37.95,"key":38,"duration":0.08},{"time":38.730000000000004,"key":38,"duration":0.15},{"time":39.849999999999994,"key":40,"duration":0.07},{"time":40.67,"key":39,"duration":0.11},{"time":40.92,"key":69,"duration":0.25},{"time":41.78,"key":37,"duration":0.12},{"time":41.95,"key":83,"duration":3.42},{"time":45.849999999999994,"key":17,"duration":0},{"time":45.97,"key":79,"duration":0}],
		'chased_2': [{"time":0,"key":87,"duration":0.76},{"time":2.0500000000000007,"key":83,"duration":0.2},{"time":2.91,"key":37,"duration":0.07},{"time":5.41,"key":81,"duration":0.34},{"time":5.93,"key":37,"duration":0.18},{"time":5.93,"key":40,"duration":0.8},{"time":6.610000000000001,"key":37,"duration":0.12},{"time":7.300000000000001,"key":37,"duration":0.16},{"time":7.73,"key":81,"duration":0.22},{"time":8.13,"key":40,"duration":0.25},{"time":8.58,"key":69,"duration":0.23},{"time":9.13,"key":69,"duration":3.28},{"time":12.73,"key":69,"duration":0.35},{"time":13.18,"key":37,"duration":0.27},{"time":13.309999999999999,"key":38,"duration":0.14},{"time":14.100000000000001,"key":40,"duration":0.15},{"time":14.780000000000001,"key":38,"duration":0.15},{"time":14.850000000000001,"key":37,"duration":0.15},{"time":15.43,"key":40,"duration":0.12},{"time":16.2,"key":37,"duration":0.13},{"time":16.76,"key":40,"duration":0.05},{"time":16.93,"key":37,"duration":0.13},{"time":17.43,"key":32,"duration":0.15},{"time":18.3,"key":37,"duration":0.23},{"time":18.830000000000002,"key":40,"duration":0.25},{"time":19.63,"key":81,"duration":0.12},{"time":19.93,"key":37,"duration":0.27},{"time":20.53,"key":81,"duration":3.05},{"time":20.7,"key":40,"duration":0},{"time":21.03,"key":40,"duration":0.37},{"time":22.76,"key":37,"duration":0.12},{"time":23.580000000000002,"key":38,"duration":0.15},{"time":24.06,"key":39,"duration":0},{"time":24.56,"key":69,"duration":1.05},{"time":24.650000000000002,"key":39,"duration":0.36},{"time":24.650000000000002,"key":40,"duration":0.36},{"time":25.61,"key":39,"duration":0.17},{"time":25.61,"key":40,"duration":0.55},{"time":26.209999999999997,"key":37,"duration":0.25},{"time":26.500000000000004,"key":40,"duration":0.51},{"time":27.26,"key":40,"duration":0.47},{"time":27.51,"key":37,"duration":0.17},{"time":27.779999999999998,"key":81,"duration":0.15},{"time":28.180000000000003,"key":81,"duration":0.28},{"time":28.930000000000003,"key":81,"duration":0.33},{"time":29.610000000000003,"key":38,"duration":0.12},{"time":30.830000000000002,"key":87,"duration":1.23},{"time":32,"key":37,"duration":0.06},{"time":32.61,"key":40,"duration":0.07},{"time":34.959999999999994,"key":83,"duration":0.64},{"time":35.599999999999994,"key":69,"duration":0.56},{"time":36.58,"key":40,"duration":0.7},{"time":36.8,"key":39,"duration":0.2},{"time":37.58,"key":40,"duration":0.12},{"time":37.849999999999994,"key":69,"duration":0.28},{"time":38.129999999999995,"key":39,"duration":0.15},{"time":38.129999999999995,"key":81,"duration":0.15},{"time":38.209999999999994,"key":40,"duration":0.39},{"time":38.91,"key":81,"duration":0.5},{"time":39.480000000000004,"key":40,"duration":0.12},{"time":39.58,"key":81,"duration":0.1},{"time":40,"key":87,"duration":0.91},{"time":40.61,"key":81,"duration":0.1},{"time":41.209999999999994,"key":38,"duration":0.04},{"time":41.629999999999995,"key":81,"duration":0.15},{"time":43.25,"key":69,"duration":0.05},{"time":43.709999999999994,"key":40,"duration":0.55},{"time":44.480000000000004,"key":40,"duration":0.22},{"time":44.93000000000001,"key":40,"duration":0.45},{"time":45.58,"key":40,"duration":1.75},{"time":48.05,"key":40,"duration":0.18},{"time":48.879999999999995,"key":38,"duration":0.17},{"time":49.55,"key":39,"duration":0.15},{"time":49.81,"key":69,"duration":0.27},{"time":50.209999999999994,"key":39,"duration":0.24},{"time":50.260000000000005,"key":40,"duration":0.19},{"time":51.209999999999994,"key":39,"duration":0.09},{"time":51.95,"key":39,"duration":0.18},{"time":52.75,"key":40,"duration":0.11},{"time":52.8,"key":39,"duration":0},{"time":53.61,"key":38,"duration":0.14},{"time":53.93000000000001,"key":39,"duration":0.2},{"time":54.349999999999994,"key":40,"duration":0.26},{"time":55.010000000000005,"key":38,"duration":0},{"time":55.83,"key":38,"duration":0.05},{"time":59.010000000000005,"key":81,"duration":2.92},{"time":62.16000000000001,"key":38,"duration":0.09},{"time":62.510000000000005,"key":81,"duration":0.34},{"time":63.230000000000004,"key":38,"duration":0.12},{"time":63.5,"key":87,"duration":0.9},{"time":64.55,"key":37,"duration":0.05},{"time":66.35000000000001,"key":81,"duration":0.86},{"time":67,"key":37,"duration":0.13},{"time":67,"key":40,"duration":1.3},{"time":68.05,"key":37,"duration":0.25},{"time":68.71000000000001,"key":40,"duration":0.2},{"time":69.06,"key":69,"duration":0.14},{"time":69.56,"key":69,"duration":0.29},{"time":70.33,"key":69,"duration":0.03},{"time":71,"key":69,"duration":0.06},{"time":72.10000000000001,"key":81,"duration":0.1},{"time":72.73,"key":69,"duration":0.05},{"time":76.68,"key":40,"duration":0.05},{"time":81.38000000000001,"key":87,"duration":1.07},{"time":84.81,"key":17,"duration":0},{"time":84.91000000000001,"key":79,"duration":0}],
		'chaser_2': [{"time":4.33,"key":87,"duration":0.45},{"time":4.98,"key":39,"duration":0.12},{"time":5.85,"key":38,"duration":0.12},{"time":6.88,"key":32,"duration":0.14},{"time":7.83,"key":37,"duration":0},{"time":8.53,"key":40,"duration":0.24},{"time":9.15,"key":40,"duration":0.22},{"time":9.98,"key":37,"duration":0.57},{"time":11.18,"key":37,"duration":0.09},{"time":11.27,"key":81,"duration":0.33},{"time":12,"key":69,"duration":0.4},{"time":12.4,"key":81,"duration":1.9},{"time":13.15,"key":40,"duration":0.13},{"time":13.68,"key":40,"duration":0.4},{"time":14.03,"key":39,"duration":0.05},{"time":14.33,"key":38,"duration":0},{"time":14.33,"key":37,"duration":0.74},{"time":15.07,"key":38,"duration":0.73},{"time":15.07,"key":81,"duration":0.38},{"time":15.27,"key":37,"duration":0.43},{"time":16.58,"key":37,"duration":0.4},{"time":16.77,"key":38,"duration":0.21},{"time":17.43,"key":39,"duration":0.24},{"time":17.7,"key":32,"duration":0.15},{"time":19.08,"key":37,"duration":0.1},{"time":19.72,"key":40,"duration":0.05},{"time":19.83,"key":32,"duration":0.04},{"time":20.37,"key":40,"duration":0.18},{"time":20.88,"key":37,"duration":0.07},{"time":21.53,"key":38,"duration":0.07},{"time":21.92,"key":38,"duration":0.15},{"time":22.2,"key":37,"duration":0.23},{"time":22.98,"key":81,"duration":0.2},{"time":23.45,"key":37,"duration":0.23},{"time":23.45,"key":38,"duration":0.15},{"time":23.92,"key":40,"duration":0.31},{"time":24.32,"key":37,"duration":0.16},{"time":24.4,"key":40,"duration":0.08},{"time":24.4,"key":81,"duration":0.17},{"time":24.9,"key":38,"duration":0.25},{"time":25.47,"key":32,"duration":0.03},{"time":26.32,"key":69,"duration":0.66},{"time":26.32,"key":40,"duration":0.31},{"time":26.42,"key":39,"duration":0.21},{"time":27.22,"key":39,"duration":0.4},{"time":27.32,"key":40,"duration":0.3},{"time":27.98,"key":40,"duration":0.99},{"time":29.13,"key":37,"duration":0.17},{"time":29.52,"key":87,"duration":1.3},{"time":30.3,"key":39,"duration":0.22},{"time":31.15,"key":39,"duration":0.18},{"time":32.02,"key":40,"duration":0.6},{"time":32.88,"key":39,"duration":0.2},{"time":32.93,"key":40,"duration":0.15},{"time":33.4,"key":40,"duration":0.48},{"time":34.25,"key":40,"duration":0.28},{"time":34.53,"key":83,"duration":1.3},{"time":34.77,"key":40,"duration":0.25},{"time":35.02,"key":39,"duration":0.08},{"time":35.4,"key":39,"duration":0.3},{"time":36,"key":40,"duration":0.47},{"time":36.58,"key":39,"duration":0.25},{"time":36.83,"key":81,"duration":0.2},{"time":37.37,"key":37,"duration":0.16},{"time":37.87,"key":87,"duration":1.15},{"time":38.38,"key":81,"duration":0.17},{"time":39.02,"key":40,"duration":0.08},{"time":39.37,"key":39,"duration":0.73},{"time":39.53,"key":40,"duration":0.5},{"time":40.35,"key":38,"duration":0.1},{"time":40.73,"key":39,"duration":0.24},{"time":41.27,"key":39,"duration":0.23},{"time":41.6,"key":83,"duration":0.32},{"time":41.95,"key":39,"duration":0.52},{"time":42.68,"key":40,"duration":0.25},{"time":43.18,"key":40,"duration":0.09},{"time":43.52,"key":39,"duration":0.03},{"time":43.98,"key":87,"duration":0.14},{"time":44.12,"key":39,"duration":0.25},{"time":44.45,"key":40,"duration":0.37},{"time":44.82,"key":37,"duration":0.31},{"time":45.47,"key":40,"duration":0.45},{"time":46.42,"key":40,"duration":2.13},{"time":46.65,"key":37,"duration":0.05},{"time":46.78,"key":37,"duration":0.24},{"time":47.38,"key":37,"duration":0.22},{"time":49.03,"key":37,"duration":0.44},{"time":49.83,"key":38,"duration":0},{"time":50.07,"key":39,"duration":0.4},{"time":50.47,"key":32,"duration":0.15},{"time":50.8,"key":38,"duration":0.15},{"time":51.55,"key":39,"duration":0.23},{"time":51.78,"key":32,"duration":0.15},{"time":52,"key":39,"duration":0.18},{"time":52.6,"key":37,"duration":0.15},{"time":52.75,"key":69,"duration":0.38},{"time":53.32,"key":39,"duration":0.23},{"time":53.42,"key":40,"duration":0.13},{"time":54.17,"key":32,"duration":0.06},{"time":54.48,"key":38,"duration":0.07},{"time":55.08,"key":39,"duration":0.25},{"time":55.23,"key":40,"duration":0.1},{"time":55.72,"key":40,"duration":0.08},{"time":55.72,"key":39,"duration":0.08},{"time":56,"key":37,"duration":0.25},{"time":56.85,"key":39,"duration":0.22},{"time":57.07,"key":87,"duration":0.1},{"time":57.6,"key":37,"duration":0.13},{"time":58.77,"key":38,"duration":0.1},{"time":59.57,"key":40,"duration":0.16},{"time":60.88,"key":38,"duration":0.09},{"time":61.87,"key":40,"duration":0.1},{"time":62.98,"key":32,"duration":0.05},{"time":64.17,"key":38,"duration":0.25},{"time":65.92,"key":38,"duration":0.13},{"time":66.32,"key":32,"duration":0.08},{"time":66.7,"key":40,"duration":0.23},{"time":68.25,"key":40,"duration":0.13},{"time":70.32,"key":17,"duration":0},{"time":70.4,"key":79,"duration":0}],
		'chased_3': [{"time":0,"key":87,"duration":1.85},{"time":0.8800000000000008,"key":40,"duration":0.33},{"time":1.6600000000000001,"key":40,"duration":1.05},{"time":2.9299999999999997,"key":40,"duration":0.35},{"time":3.51,"key":38,"duration":0.22},{"time":3.66,"key":87,"duration":2.24},{"time":4.35,"key":69,"duration":1.51},{"time":5.200000000000001,"key":37,"duration":0.18},{"time":5.9,"key":37,"duration":0.15},{"time":6.33,"key":37,"duration":0.32},{"time":6.51,"key":40,"duration":0.52},{"time":6.75,"key":39,"duration":0.33},{"time":7.0600000000000005,"key":69,"duration":0.54},{"time":7.65,"key":39,"duration":0.35},{"time":7.800000000000001,"key":38,"duration":0.16},{"time":8.15,"key":40,"duration":0.25},{"time":8.56,"key":39,"duration":0.27},{"time":8.75,"key":38,"duration":0.11},{"time":8.950000000000001,"key":40,"duration":0.86},{"time":8.950000000000001,"key":39,"duration":0.86},{"time":10.379999999999999,"key":39,"duration":0.27},{"time":10.73,"key":38,"duration":0.32},{"time":10.91,"key":39,"duration":0.12},{"time":11.3,"key":40,"duration":0.11},{"time":11.309999999999999,"key":39,"duration":0.1},{"time":11.5,"key":69,"duration":0.21},{"time":11.55,"key":40,"duration":0.2},{"time":11.61,"key":39,"duration":0.14},{"time":12.530000000000001,"key":39,"duration":0.22},{"time":13.100000000000001,"key":40,"duration":1.18},{"time":13.100000000000001,"key":39,"duration":1.13},{"time":14.580000000000002,"key":40,"duration":0.18},{"time":14.580000000000002,"key":39,"duration":0.32},{"time":15.150000000000002,"key":40,"duration":0.25},{"time":15.600000000000001,"key":81,"duration":0.23},{"time":15.91,"key":83,"duration":1.37},{"time":16.03,"key":40,"duration":0.17},{"time":16.43,"key":40,"duration":0.17},{"time":16.91,"key":38,"duration":0.09},{"time":17.35,"key":37,"duration":0.13},{"time":17.6,"key":81,"duration":0.51},{"time":17.68,"key":37,"duration":0.72},{"time":18.48,"key":40,"duration":0.2},{"time":18.88,"key":40,"duration":0.1},{"time":19.11,"key":87,"duration":0.92},{"time":19.48,"key":37,"duration":0.25},{"time":19.93,"key":40,"duration":0.62},{"time":20.13,"key":37,"duration":0.47},{"time":20.93,"key":37,"duration":0.23},{"time":20.96,"key":40,"duration":0.4},{"time":21.55,"key":37,"duration":0.45},{"time":22.080000000000002,"key":40,"duration":0.43},{"time":22.830000000000002,"key":37,"duration":0.2},{"time":23.150000000000002,"key":69,"duration":0.48},{"time":23.78,"key":40,"duration":0.17},{"time":23.78,"key":39,"duration":0.17},{"time":24.18,"key":69,"duration":0.28},{"time":24.61,"key":39,"duration":0.17},{"time":25.18,"key":39,"duration":0.72},{"time":25.21,"key":40,"duration":0.65},{"time":25.63,"key":69,"duration":0.23},{"time":26.23,"key":40,"duration":0.35},{"time":26.250000000000004,"key":39,"duration":0.3},{"time":26.81,"key":40,"duration":0.52},{"time":27.48,"key":81,"duration":0.32},{"time":27.95,"key":40,"duration":0.25},{"time":28.250000000000004,"key":81,"duration":0.21},{"time":28.7,"key":37,"duration":0.03},{"time":28.73,"key":40,"duration":0.83},{"time":29.56,"key":37,"duration":0.27},{"time":30.099999999999998,"key":38,"duration":0.2},{"time":30.55,"key":87,"duration":1.05},{"time":31.63,"key":40,"duration":1.2},{"time":32.86,"key":37,"duration":0.2},{"time":33.31,"key":37,"duration":0.27},{"time":33.55,"key":40,"duration":0.3},{"time":34.879999999999995,"key":40,"duration":0.35},{"time":35.7,"key":40,"duration":0.2},{"time":36.61,"key":83,"duration":0.79},{"time":37.480000000000004,"key":39,"duration":1.32},{"time":38.2,"key":40,"duration":0.55},{"time":38.980000000000004,"key":39,"duration":0.22},{"time":38.980000000000004,"key":38,"duration":0.22},{"time":39.2,"key":69,"duration":2.65},{"time":40.33,"key":39,"duration":0.23},{"time":40.709999999999994,"key":39,"duration":0.45},{"time":40.91,"key":38,"duration":0.25},{"time":41.510000000000005,"key":39,"duration":0.89},{"time":41.56,"key":38,"duration":0.84},{"time":42.43000000000001,"key":87,"duration":1.32},{"time":42.66,"key":40,"duration":0.17},{"time":43.33,"key":37,"duration":0.18},{"time":43.629999999999995,"key":81,"duration":0.55},{"time":43.8,"key":37,"duration":1.26},{"time":43.91,"key":40,"duration":1.1},{"time":46.209999999999994,"key":37,"duration":0.12},{"time":46.8,"key":37,"duration":0.15},{"time":46.900000000000006,"key":38,"duration":0.11},{"time":47.349999999999994,"key":40,"duration":0.4},{"time":48.3,"key":83,"duration":3.21},{"time":50.900000000000006,"key":37,"duration":0.28},{"time":51.68000000000001,"key":87,"duration":1.5},{"time":52.400000000000006,"key":69,"duration":0.18},{"time":53,"key":40,"duration":0.18},{"time":54.08,"key":38,"duration":0.15},{"time":54.629999999999995,"key":37,"duration":0.12},{"time":54.91,"key":40,"duration":0.15},{"time":56.150000000000006,"key":83,"duration":1.25},{"time":57.650000000000006,"key":37,"duration":0.06},{"time":58.45,"key":83,"duration":0.38},{"time":59.7,"key":83,"duration":0.3},{"time":60.63000000000001,"key":83,"duration":0.08},{"time":62.63000000000001,"key":83,"duration":0.05},{"time":63.25,"key":83,"duration":0.06},{"time":64.16000000000001,"key":83,"duration":0.12},{"time":66.35000000000001,"key":66,"duration":0.36},{"time":67.71000000000001,"key":17,"duration":0},{"time":67.83,"key":79,"duration":0}],
		'chaser_3': [{"time":3.93,"key":87,"duration":0.7},{"time":3.97,"key":39,"duration":0.4},{"time":4.12,"key":40,"duration":0.21},{"time":4.33,"key":69,"duration":0.15},{"time":4.63,"key":39,"duration":0.45},{"time":4.63,"key":40,"duration":0.44},{"time":5.78,"key":39,"duration":0.22},{"time":6,"key":87,"duration":2.27},{"time":8.53,"key":39,"duration":0.14},{"time":9.02,"key":40,"duration":0.11},{"time":9.5,"key":87,"duration":0.92},{"time":9.87,"key":40,"duration":0.13},{"time":10.67,"key":40,"duration":0.15},{"time":11.57,"key":87,"duration":0.56},{"time":11.98,"key":40,"duration":0.14},{"time":12.12,"key":32,"duration":0.11},{"time":12.75,"key":37,"duration":0.68},{"time":13.2,"key":81,"duration":0.03},{"time":13.38,"key":40,"duration":0.27},{"time":13.43,"key":39,"duration":0.22},{"time":14.03,"key":40,"duration":0.12},{"time":14.07,"key":39,"duration":0.13},{"time":14.4,"key":38,"duration":0.23},{"time":14.78,"key":37,"duration":1.74},{"time":15.7,"key":40,"duration":0.47},{"time":16.42,"key":40,"duration":0.25},{"time":16.97,"key":40,"duration":0.18},{"time":17.77,"key":39,"duration":0},{"time":18.07,"key":87,"duration":0.33},{"time":18.53,"key":69,"duration":0.17},{"time":18.53,"key":39,"duration":0.6},{"time":18.73,"key":83,"duration":0.89},{"time":18.77,"key":40,"duration":0.26},{"time":19.3,"key":38,"duration":0.32},{"time":19.83,"key":39,"duration":0.25},{"time":20.25,"key":69,"duration":0.18},{"time":20.85,"key":38,"duration":0.08},{"time":21.18,"key":39,"duration":0.25},{"time":22.1,"key":32,"duration":0.13},{"time":22.23,"key":40,"duration":0.1},{"time":23.05,"key":37,"duration":0.22},{"time":23.6,"key":87,"duration":0.07},{"time":23.9,"key":87,"duration":0.25},{"time":24,"key":39,"duration":0.15},{"time":24.78,"key":39,"duration":0.12},{"time":25.1,"key":40,"duration":0.13},{"time":25.6,"key":38,"duration":0.13},{"time":25.73,"key":39,"duration":0.14},{"time":26.03,"key":39,"duration":0.34},{"time":26.03,"key":32,"duration":0.34},{"time":26.82,"key":38,"duration":0.38},{"time":26.92,"key":39,"duration":1.53},{"time":27.27,"key":40,"duration":0.48},{"time":27.58,"key":69,"duration":0.5},{"time":27.88,"key":38,"duration":0.54},{"time":28.53,"key":40,"duration":0.5},{"time":29.43,"key":40,"duration":0.05},{"time":29.62,"key":40,"duration":0.15},{"time":29.73,"key":83,"duration":0.5},{"time":30.17,"key":39,"duration":0.3},{"time":30.6,"key":40,"duration":0.18},{"time":30.78,"key":83,"duration":0.09},{"time":31.02,"key":87,"duration":0.85},{"time":31.23,"key":37,"duration":0.15},{"time":31.6,"key":37,"duration":0.75},{"time":31.65,"key":81,"duration":0.18},{"time":31.8,"key":38,"duration":0.33},{"time":32.57,"key":37,"duration":0.25},{"time":32.87,"key":39,"duration":0.31},{"time":33.22,"key":40,"duration":0.18},{"time":34.3,"key":37,"duration":0.43},{"time":34.47,"key":38,"duration":0.2},{"time":34.7,"key":32,"duration":0.12},{"time":35.13,"key":39,"duration":0.22},{"time":35.65,"key":39,"duration":0.12},{"time":35.92,"key":37,"duration":0.66},{"time":36.43,"key":40,"duration":0.15},{"time":37.07,"key":37,"duration":0.16},{"time":37.45,"key":37,"duration":0.4},{"time":38.23,"key":81,"duration":0.2},{"time":38.33,"key":37,"duration":0.22},{"time":38.95,"key":37,"duration":0.33},{"time":39.03,"key":40,"duration":0.19},{"time":39.68,"key":37,"duration":0.22},{"time":40.15,"key":38,"duration":0.15},{"time":40.42,"key":39,"duration":0.43},{"time":40.73,"key":40,"duration":0.09},{"time":40.92,"key":69,"duration":0.11},{"time":41.9,"key":39,"duration":0.22},{"time":42.05,"key":38,"duration":0.1},{"time":42.35,"key":40,"duration":0.13},{"time":42.35,"key":39,"duration":0.13},{"time":42.67,"key":39,"duration":2},{"time":42.93,"key":38,"duration":0.59},{"time":43.18,"key":69,"duration":0.15},{"time":43.37,"key":83,"duration":1.06},{"time":43.67,"key":40,"duration":0.43},{"time":44.4,"key":38,"duration":0.22},{"time":45.2,"key":83,"duration":0.37},{"time":45.47,"key":39,"duration":0.3},{"time":46.3,"key":39,"duration":0.42},{"time":46.48,"key":38,"duration":0.2},{"time":47.12,"key":40,"duration":0.18},{"time":47.12,"key":39,"duration":0.18},{"time":47.3,"key":39,"duration":0.75},{"time":48.45,"key":87,"duration":0.05},{"time":48.53,"key":87,"duration":0.32},{"time":48.73,"key":39,"duration":0.15},{"time":49.13,"key":39,"duration":0.14},{"time":49.4,"key":39,"duration":0.17},{"time":49.4,"key":38,"duration":0.17},{"time":49.65,"key":32,"duration":0.13},{"time":49.93,"key":37,"duration":0.19},{"time":50.08,"key":39,"duration":0.69},{"time":50.63,"key":40,"duration":0.14},{"time":51.1,"key":39,"duration":0.4},{"time":51.25,"key":69,"duration":0.18},{"time":51.82,"key":39,"duration":0.23},{"time":51.9,"key":40,"duration":0.13},{"time":53.18,"key":39,"duration":0.2},{"time":53.2,"key":40,"duration":0.13},{"time":53.75,"key":39,"duration":0.23},{"time":54.17,"key":38,"duration":0.03},{"time":54.33,"key":87,"duration":0.52},{"time":54.88,"key":38,"duration":0.17},{"time":54.97,"key":37,"duration":0.11},{"time":55.7,"key":32,"duration":0.1},{"time":57.62,"key":40,"duration":0.63},{"time":57.62,"key":39,"duration":1.03},{"time":58.47,"key":38,"duration":0.15},{"time":58.88,"key":40,"duration":0.27},{"time":58.88,"key":39,"duration":0.27},{"time":59.4,"key":40,"duration":0.17},{"time":60.07,"key":81,"duration":0.25},{"time":60.67,"key":39,"duration":0.25},{"time":61.28,"key":39,"duration":0.17},{"time":63.33,"key":37,"duration":0.14},{"time":63.77,"key":39,"duration":0.56},{"time":64.37,"key":87,"duration":2.76},{"time":64.97,"key":37,"duration":0.4},{"time":65.55,"key":81,"duration":0.2},{"time":66.15,"key":81,"duration":0.23},{"time":66.25,"key":37,"duration":0.13},{"time":66.88,"key":37,"duration":0.19},{"time":67.03,"key":81,"duration":0.1},{"time":67.5,"key":40,"duration":0.22},{"time":67.98,"key":40,"duration":0.07},{"time":68.55,"key":40,"duration":0.12},{"time":68.55,"key":39,"duration":0.18},{"time":69.3,"key":37,"duration":0.25},{"time":69.97,"key":39,"duration":0.28},{"time":70.03,"key":40,"duration":0.19},{"time":70.52,"key":37,"duration":0.36},{"time":70.72,"key":69,"duration":0.4},{"time":71.33,"key":69,"duration":0.24},{"time":71.57,"key":37,"duration":0.71},{"time":72.83,"key":66,"duration":4.62},{"time":73.1,"key":38,"duration":0.13},{"time":73.33,"key":39,"duration":0.3},{"time":73.95,"key":38,"duration":0.23},{"time":74.7,"key":40,"duration":0.17},{"time":78.58,"key":17,"duration":0},{"time":78.73,"key":79,"duration":0}],
		'chaser_4': [{"time":4.18,"key":39,"duration":0.19},{"time":4.5,"key":87,"duration":0.28},{"time":4.75,"key":39,"duration":1.18},{"time":6.25,"key":40,"duration":0.15},{"time":6.87,"key":87,"duration":2.51},{"time":7.15,"key":38,"duration":0.1},{"time":7.78,"key":39,"duration":0.09},{"time":7.82,"key":38,"duration":0.05},{"time":8.73,"key":32,"duration":0.14},{"time":9.57,"key":39,"duration":0.11},{"time":10.43,"key":40,"duration":0.07},{"time":11.17,"key":38,"duration":0.08},{"time":11.9,"key":83,"duration":0.15},{"time":12.65,"key":39,"duration":0.18},{"time":12.72,"key":40,"duration":0.08},{"time":13.08,"key":39,"duration":0},{"time":13.78,"key":39,"duration":0.2},{"time":13.87,"key":40,"duration":0.48},{"time":14.55,"key":39,"duration":0.18},{"time":14.58,"key":38,"duration":0.22},{"time":14.95,"key":87,"duration":0.98},{"time":15.25,"key":37,"duration":0.23},{"time":15.67,"key":40,"duration":0.08},{"time":15.78,"key":37,"duration":0.15},{"time":15.88,"key":40,"duration":0.2},{"time":16.27,"key":40,"duration":0.43},{"time":16.38,"key":39,"duration":0.55},{"time":16.93,"key":38,"duration":0.52},{"time":17.03,"key":39,"duration":0.65},{"time":17.68,"key":40,"duration":0.55},{"time":18.6,"key":32,"duration":0.13},{"time":18.73,"key":37,"duration":0.22},{"time":18.93,"key":38,"duration":0.25},{"time":19.62,"key":39,"duration":0.33},{"time":19.83,"key":40,"duration":0.52},{"time":20.42,"key":39,"duration":0.18},{"time":20.57,"key":40,"duration":0.51},{"time":21.23,"key":83,"duration":0.27},{"time":21.35,"key":39,"duration":0.48},{"time":21.98,"key":37,"duration":0.14},{"time":22.17,"key":87,"duration":0.93},{"time":22.58,"key":38,"duration":0.24},{"time":22.62,"key":37,"duration":0.2},{"time":23.12,"key":37,"duration":0.25},{"time":23.43,"key":81,"duration":0.49},{"time":23.62,"key":37,"duration":0.76},{"time":23.73,"key":38,"duration":0.54},{"time":24.33,"key":83,"duration":0.39},{"time":24.68,"key":40,"duration":0.19},{"time":24.83,"key":39,"duration":0.05},{"time":25.02,"key":40,"duration":0.91},{"time":25.5,"key":83,"duration":0.35},{"time":25.73,"key":39,"duration":0.77},{"time":26.1,"key":38,"duration":0.33},{"time":26.75,"key":39,"duration":0.62},{"time":26.97,"key":40,"duration":0.65},{"time":27.8,"key":39,"duration":0.3},{"time":28.42,"key":39,"duration":0.8},{"time":29.75,"key":40,"duration":0.2},{"time":30.53,"key":37,"duration":0.74},{"time":31.12,"key":38,"duration":0.15},{"time":31.65,"key":40,"duration":0.18},{"time":32.17,"key":87,"duration":0.91},{"time":32.83,"key":37,"duration":0.22},{"time":33.33,"key":37,"duration":0.54},{"time":34.25,"key":37,"duration":0},{"time":35.27,"key":37,"duration":0.66},{"time":36.22,"key":37,"duration":0.3},{"time":36.78,"key":37,"duration":0.44},{"time":37.55,"key":37,"duration":0.1},{"time":37.93,"key":39,"duration":0.42},{"time":38.05,"key":38,"duration":0.22},{"time":38.32,"key":83,"duration":0.55},{"time":38.85,"key":39,"duration":0.62},{"time":38.93,"key":38,"duration":0.19},{"time":39.52,"key":69,"duration":0.58},{"time":39.55,"key":40,"duration":0.2},{"time":39.55,"key":39,"duration":0.3},{"time":40.1,"key":39,"duration":0.3},{"time":40.47,"key":39,"duration":0.28},{"time":40.55,"key":40,"duration":0.17},{"time":41.22,"key":39,"duration":0.2},{"time":41.25,"key":40,"duration":0.12},{"time":41.72,"key":40,"duration":0.38},{"time":41.92,"key":37,"duration":0.3},{"time":42.62,"key":38,"duration":0.5},{"time":42.82,"key":39,"duration":0.25},{"time":43.73,"key":39,"duration":0.52},{"time":44.78,"key":40,"duration":0.14},{"time":44.85,"key":39,"duration":0.07},{"time":44.92,"key":39,"duration":0.5},{"time":45.85,"key":39,"duration":0.48},{"time":46.92,"key":38,"duration":0.46},{"time":47.03,"key":39,"duration":0.4},{"time":47.28,"key":32,"duration":0.1},{"time":47.68,"key":40,"duration":0.59},{"time":48.48,"key":38,"duration":0.22},{"time":48.92,"key":37,"duration":0.15},{"time":49.1,"key":40,"duration":0.3},{"time":49.13,"key":39,"duration":0.59},{"time":49.77,"key":39,"duration":0.21},{"time":50.13,"key":39,"duration":0.27},{"time":50.72,"key":39,"duration":0.25},{"time":51.45,"key":40,"duration":0.22},{"time":51.7,"key":39,"duration":0.1},{"time":52.2,"key":39,"duration":0.22},{"time":52.88,"key":39,"duration":0.17},{"time":53.35,"key":40,"duration":0.65},{"time":53.52,"key":39,"duration":0.51},{"time":54.75,"key":39,"duration":0.22},{"time":55.2,"key":39,"duration":0.38},{"time":55.2,"key":40,"duration":0},{"time":55.97,"key":37,"duration":0.3},{"time":56.18,"key":40,"duration":0.22},{"time":56.93,"key":38,"duration":0.14},{"time":57.45,"key":39,"duration":0.13},{"time":57.95,"key":32,"duration":0.22},{"time":58.23,"key":39,"duration":0.15},{"time":58.3,"key":40,"duration":0.12},{"time":58.53,"key":40,"duration":0.42},{"time":58.72,"key":39,"duration":1.81},{"time":59.57,"key":40,"duration":0.96},{"time":60.73,"key":37,"duration":0.69},{"time":61.08,"key":38,"duration":0.55},{"time":61.98,"key":81,"duration":0.1},{"time":62.37,"key":39,"duration":0.46},{"time":62.58,"key":38,"duration":0.17},{"time":62.75,"key":69,"duration":0.08},{"time":63.17,"key":83,"duration":0.26},{"time":63.57,"key":37,"duration":0.15},{"time":63.82,"key":87,"duration":0.35},{"time":64.17,"key":40,"duration":0.36},{"time":64.48,"key":39,"duration":0.52},{"time":64.48,"key":83,"duration":0.52},{"time":64.6,"key":40,"duration":0.1},{"time":65.12,"key":38,"duration":0.4},{"time":65.53,"key":83,"duration":0.4},{"time":65.92,"key":39,"duration":0.2},{"time":66.37,"key":37,"duration":0.28},{"time":66.55,"key":87,"duration":0.65},{"time":67.05,"key":37,"duration":0.23},{"time":67.2,"key":38,"duration":0.25},{"time":67.45,"key":83,"duration":0.5},{"time":67.75,"key":37,"duration":0.35},{"time":68.52,"key":87,"duration":0.8},{"time":68.87,"key":37,"duration":0.11},{"time":69.68,"key":40,"duration":0.14},{"time":70.27,"key":81,"duration":0.66},{"time":71.35,"key":37,"duration":0.2},{"time":71.47,"key":40,"duration":0.15},{"time":72.28,"key":32,"duration":0.15},{"time":72.42,"key":37,"duration":0.15},{"time":72.75,"key":40,"duration":0.7},{"time":73.08,"key":39,"duration":0.25},{"time":73.63,"key":37,"duration":0.57},{"time":73.8,"key":38,"duration":0.43},{"time":74.55,"key":40,"duration":0.33},{"time":75.63,"key":38,"duration":0.4},{"time":76.03,"key":83,"duration":1.39},{"time":76.87,"key":37,"duration":0.21},{"time":77.4,"key":39,"duration":0.18},{"time":77.8,"key":69,"duration":0.48},{"time":78.28,"key":83,"duration":0.27},{"time":78.7,"key":87,"duration":0.4},{"time":79.3,"key":83,"duration":0.35},{"time":79.73,"key":66,"duration":2.14},{"time":79.8,"key":37,"duration":0.13},{"time":80.6,"key":69,"duration":0.08},{"time":82.32,"key":66,"duration":0.25},{"time":83.08,"key":18,"duration":0.22},{"time":96.77,"key":17,"duration":0},{"time":96.95,"key":79,"duration":0}],

		'patroller_1': [{"time":0,"key":37,"duration":1.6},{"time":1.75,"key":38,"duration":0.12},{"time":1.8899999999999997,"key":87,"duration":4.28},{"time":2.6900000000000004,"key":40,"duration":0.08},{"time":5.55,"key":40,"duration":0.09},{"time":6.6000000000000005,"key":38,"duration":0.07},{"time":7.249999999999999,"key":81,"duration":0.54},{"time":7.999999999999999,"key":40,"duration":0.25},{"time":8.7,"key":38,"duration":0},{"time":8.7,"key":69,"duration":0.72},{"time":9.7,"key":39,"duration":0.25},{"time":10.45,"key":37,"duration":0.09},{"time":10.799999999999997,"key":81,"duration":0.22},{"time":11.189999999999998,"key":38,"duration":0.3},{"time":11.219999999999999,"key":37,"duration":0.3},{"time":11.849999999999998,"key":40,"duration":0.19},{"time":12.219999999999999,"key":39,"duration":0},{"time":12.89,"key":39,"duration":0.23},{"time":13.82,"key":39,"duration":0.13},{"time":14.14,"key":40,"duration":0.08},{"time":14.64,"key":81,"duration":0.83},{"time":15.59,"key":40,"duration":0.21},{"time":15.59,"key":37,"duration":0.15},{"time":16.07,"key":39,"duration":0.15},{"time":16.299999999999997,"key":40,"duration":0.29},{"time":17.619999999999997,"key":40,"duration":0.2},{"time":18.169999999999998,"key":69,"duration":0.37},{"time":19.25,"key":69,"duration":0.37},{"time":20.15,"key":69,"duration":0.55},{"time":20.74,"key":40,"duration":0.35},{"time":21.419999999999998,"key":81,"duration":0.45},{"time":21.74,"key":38,"duration":0.35},{"time":21.77,"key":37,"duration":0.37},{"time":22.45,"key":39,"duration":0.24},{"time":22.9,"key":81,"duration":0.44},{"time":23.419999999999998,"key":40,"duration":0.2},{"time":23.419999999999998,"key":37,"duration":0.17},{"time":23.89,"key":40,"duration":0.26},{"time":24.7,"key":69,"duration":0.14},{"time":25.34,"key":38,"duration":0.08},{"time":26.349999999999998,"key":38,"duration":0.09},{"time":27.64,"key":81,"duration":0.16},{"time":28.049999999999997,"key":40,"duration":0},{"time":28.5,"key":37,"duration":0.14},{"time":28.89,"key":40,"duration":0.21},{"time":30.299999999999997,"key":69,"duration":0.37},{"time":31.549999999999997,"key":81,"duration":3.84},{"time":33.839999999999996,"key":37,"duration":1.1},{"time":34.519999999999996,"key":38,"duration":0.2},{"time":35.089999999999996,"key":37,"duration":0.21},{"time":35.15,"key":40,"duration":0.52},{"time":35.55,"key":39,"duration":0.22},{"time":35.6,"key":69,"duration":0.54},{"time":35.85,"key":39,"duration":0.14},{"time":36.19,"key":39,"duration":0.23},{"time":36.769999999999996,"key":38,"duration":0.22},{"time":36.839999999999996,"key":37,"duration":0.13},{"time":37.4,"key":87,"duration":0.17},{"time":37.64,"key":37,"duration":0},{"time":37.64,"key":40,"duration":0.45},{"time":38.589999999999996,"key":69,"duration":0.3},{"time":38.839999999999996,"key":38,"duration":0.23},{"time":38.94,"key":37,"duration":0.18},{"time":40.15,"key":37,"duration":0.15},{"time":40.69,"key":37,"duration":0.21},{"time":42.54,"key":69,"duration":0.18},{"time":43.019999999999996,"key":69,"duration":0.38},{"time":43.57,"key":40,"duration":0.22},{"time":43.57,"key":39,"duration":0.22},{"time":44.17,"key":39,"duration":0.28},{"time":44.22,"key":40,"duration":0.38},{"time":44.8,"key":37,"duration":0.22},{"time":45.019999999999996,"key":40,"duration":0.12},{"time":45.6,"key":37,"duration":0.14},{"time":46.04,"key":81,"duration":0.21},{"time":46.6,"key":37,"duration":0.22},{"time":46.94,"key":38,"duration":0.13},{"time":47.62,"key":81,"duration":0.22},{"time":48.22,"key":39,"duration":0.22},{"time":48.85,"key":69,"duration":0.12},{"time":49.19,"key":38,"duration":0.06},{"time":49.47,"key":38,"duration":0.23},{"time":50.25,"key":87,"duration":0.37},{"time":50.57,"key":40,"duration":0.83},{"time":51.37,"key":39,"duration":0.15},{"time":53.07,"key":40,"duration":1.3},{"time":55,"key":40,"duration":0.85},{"time":56.54,"key":39,"duration":0.05},{"time":57.14,"key":40,"duration":0.13},{"time":57.22,"key":39,"duration":0.08},{"time":57.64,"key":69,"duration":0.21},{"time":58.269999999999996,"key":69,"duration":0.3},{"time":58.55,"key":39,"duration":0.2},{"time":58.599999999999994,"key":40,"duration":0.67},{"time":59.120000000000005,"key":39,"duration":0.18},{"time":60.019999999999996,"key":38,"duration":0.1},{"time":61,"key":69,"duration":0.15},{"time":62.22,"key":40,"duration":0.08},{"time":62.22,"key":39,"duration":0.12},{"time":62.84,"key":40,"duration":0.13},{"time":63.269999999999996,"key":40,"duration":0.15},{"time":64.12,"key":38,"duration":0.08},{"time":64.7,"key":81,"duration":0.6},{"time":65.89,"key":69,"duration":0},{"time":66.89,"key":69,"duration":0.13},{"time":67.92,"key":69,"duration":0.42},{"time":68.37,"key":40,"duration":0.6},{"time":68.37,"key":39,"duration":0.55},{"time":69.4,"key":39,"duration":0.72},{"time":69.42,"key":40,"duration":0.68},{"time":70.7,"key":37,"duration":0.15},{"time":71.12,"key":81,"duration":0.8},{"time":72.27,"key":38,"duration":0.12},{"time":73.19,"key":81,"duration":0.21},{"time":73.65,"key":40,"duration":0.44},{"time":73.67,"key":37,"duration":0.22},{"time":74.32,"key":69,"duration":0.32},{"time":74.94,"key":69,"duration":0.26},{"time":79.09,"key":83,"duration":1.55},{"time":80.67,"key":66,"duration":0.83},{"time":82.64,"key":17,"duration":0},{"time":84.53999999999999,"key":79,"duration":0}],
	},

	models : [

		// { type : "falcon", transform : { translate : {x : -1720.12, y : 96.92, z : 2199.07}, rotation : { x : 0, y : 90, z : 0}, scale : { x : 0.5, y : 0.5, z : 0.5 }}, options: {script : "patroller_1", laser: 'green', topSpeed: 4, acceleration: 1} },

		{ type : "tie_interceptor", transform : { translate : {x : 60, y : -240, z : 0}, rotation : { x : 0, y : 90, z : 0}}, options: {script : "chased_2", laser: 'green', topSpeed: 3, acceleration: 1} },
		{ type : "tie_interceptor", transform : { translate : {x : 40, y : -240, z : -20}, rotation : { x : 0, y : 90, z : 0}}, options: {script : "chased_2", laser: 'green', topSpeed: 3, acceleration: 1} },
		{ type : "tie_interceptor", transform : { translate : {x : 40, y : -240, z : 20}, rotation : { x : 0, y : 90, z : 0}}, options: {script : "chased_2", laser: 'green', topSpeed: 3, acceleration: 1} },
		{ type : "tie_fighter", transform : { translate : {x : 40, y : -140, z : 20}, rotation : { x : 0, y : 90, z : 0}, scale: {x: 16, y: 16, z: 16}}, options: {script : "chaser_2", laser: 'red', topSpeed: 4, acceleration: 1} },
		{ type : "tie_fighter", transform : { translate : { x : 394.078, y : -110.85, z : 0}, rotation : { x : 0, y : 90, z : 0}, scale: {x: 16, y: 16, z: 16}}, options: {script : "chased_1", laser: 'purple', topSpeed: 6, acceleration: 1} },
		{ type : "tie_interceptor", transform : { translate : { x : 410.078, y : -110.85, z : 30}, rotation : { x : 0, y : 90, z : 0}}, options: {script : "chased_1", laser: 'purple', topSpeed: 6, acceleration: 1} },
		{ type : "tie_interceptor", transform : { translate : { x : 454.078, y : -110.85, z : 0}, rotation : { x : 0, y : 90, z : 0}}, options: {script : "chaser_1", laser: 'purple', topSpeed: 6, acceleration: 1} }
		,
		{ type : "tie_fighter", transform : { translate :  {x : -1873.12, y : 56.92, z : 2199.07}, rotation : { x : 0, y : 90, z : 0}, scale: {x: 16, y: 16, z: 16}}, options: {script : 'patroller_1', laser: 'purple', topSpeed: 4, acceleration: 1} },
		{ type : "tie_interceptor", transform : { translate :  {x : -1720.12, y : 96.92, z : 2199.07}, rotation : { x : 0, y : 90, z : 0}, scale: {x: 1, y: 1, z: 1}}, options: {script : 'patroller_1', laser: 'purple', topSpeed: 4, acceleration: 1} },

		{ type : "tie_fighter", transform : { translate :  {x : -866.71, y : -240, z : 136.07}, rotation : { x : 0, y : 90, z : 0}, scale: {x: 16, y: 16, z: 16}}, options: {script : 'chaser_3', laser: 'green', topSpeed: 8, acceleration: 1} },
		{ type : "tie_fighter", transform : { translate :  {x : -856.71, y : -210, z : 130.07}, rotation : { x : 0, y : 90, z : 0}, scale: {x: 16, y: 16, z: 16}}, options: {script : 'chaser_3', laser: 'green', topSpeed: 8, acceleration: 1} },
		{ type : "tie_interceptor", transform : { translate :  {x : -866.71, y : -240, z : 136.07}, rotation : { x : 0, y : 90, z : 0}, scale: {x: 1, y: 1, z: 1}}, options: {script : 'chased_3', laser: 'green', topSpeed: 8, acceleration: 1} },
		{ type : "tie_interceptor", transform : { translate :  {x : -866.71, y : -240, z : 136.07}, rotation : { x : 0, y : 90, z : 0}, scale: {x: 1, y: 1, z: 1}}, options: {script : 'chaser_4', laser: 'green', topSpeed: 8, acceleration: 1} },

		//{ type : "tie", transform : { translate : {x : -20, y : 20, z : -120}}, script : "tieGroup1" },
		//{ type : "tie", transform : { translate : {x : -30, y : 25, z : -140}}, script : "tieGroup1" },
		//{ type : "tie", transform : { translate : {x : -10, y : 20, z : -140}}, script : "tieGroup1" },
	],

	camera : {
		position : { x : 60, y : -240, z : 0}
		// position : {x : -866.71, y : -240, z : 136.07}
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

	// laser constants
	lasers: {
		'red': {
			speed: 10,
			color: [1, 0, 0],
			lightIntensity: 80,
			texture: 'redLaser'
		},
		'green': {
			speed: 10,
			color: [0, 1, 0],
			lightIntensity: 80,
			texture: 'redLaser'
		},
		'purple': {
			speed: 10,
			color: [1, 0, 1],
			lightIntensity: 80,
			texture: 'redLaser'
		},
	},

	// explosion constants
	explosionSparkCount : 400,
	dirtToSparkRatio : 0.6
}
