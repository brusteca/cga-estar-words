
var config = {

	resources: {
		models: {
			tie : {
				color: { r: 200, g : 200, b : 200},
				front: { x: 0, y : 0, z : 1},
				lod_files: [
					{
						file: "resources/models/tie-intercept.obj",
						max_distance: -1
					},
				],
				texture: 'rock_01',
			},
			// falcon : {
			// 	file : "resources/models/millenium-falcon.obj",
			// 	texture : "falcon.jpg",
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
			falcon : "resources/textures/falcon.jpg",
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
			}
		}
	},

	scripts : {
		'chased_1': [{"time":0,"key":87,"duration":13.19},{"time":2.700000000000001,"key":38,"duration":0.22},{"time":3.24,"key":40,"duration":0.38},{"time":3.24,"key":39,"duration":0.38},{"time":3.870000000000001,"key":38,"duration":0.18},{"time":4.290000000000001,"key":69,"duration":0.35},{"time":4.74,"key":39,"duration":0.5},{"time":4.74,"key":40,"duration":0.46},{"time":5.27,"key":69,"duration":0.18},{"time":5.49,"key":39,"duration":0.16},{"time":5.52,"key":40,"duration":0.13},{"time":6.42,"key":37,"duration":0.17},{"time":6.84,"key":81,"duration":0.15},{"time":7.1899999999999995,"key":38,"duration":0.13},{"time":7.540000000000001,"key":69,"duration":0.11},{"time":8.14,"key":39,"duration":0.21},{"time":8.55,"key":81,"duration":0.1},{"time":8.719999999999999,"key":40,"duration":0.15},{"time":9.149999999999999,"key":40,"duration":0.22},{"time":9.850000000000001,"key":38,"duration":0.12},{"time":10.469999999999999,"key":40,"duration":0.2},{"time":10.8,"key":81,"duration":0.12},{"time":11.02,"key":40,"duration":0.55},{"time":11.39,"key":81,"duration":0.13},{"time":11.899999999999999,"key":81,"duration":0.12},{"time":12.3,"key":81,"duration":0.2},{"time":13.420000000000002,"key":39,"duration":1.03},{"time":14.27,"key":38,"duration":0.13},{"time":15.09,"key":81,"duration":0.4},{"time":15.45,"key":37,"duration":0.17},{"time":15.969999999999999,"key":81,"duration":0.23},{"time":16.35,"key":37,"duration":0.12},{"time":17,"key":37,"duration":0.07},{"time":17.67,"key":40,"duration":0.15},{"time":18.37,"key":38,"duration":0.13},{"time":18.8,"key":39,"duration":0.2},{"time":19.15,"key":40,"duration":0.42},{"time":19.9,"key":38,"duration":0.09},{"time":20.34,"key":38,"duration":0.13},{"time":20.57,"key":83,"duration":1.58},{"time":22.27,"key":87,"duration":0.97},{"time":22.42,"key":40,"duration":0.2},{"time":22.54,"key":39,"duration":0.15},{"time":23.17,"key":39,"duration":0.22},{"time":23.47,"key":87,"duration":1.08},{"time":23.939999999999998,"key":37,"duration":0.1},{"time":24.5,"key":81,"duration":0.47},{"time":24.97,"key":37,"duration":0.33},{"time":25.5,"key":81,"duration":0.15},{"time":25.6,"key":37,"duration":0.02},{"time":25.799999999999997,"key":39,"duration":0.29},{"time":26,"key":40,"duration":0.5},{"time":26.17,"key":37,"duration":0.37},{"time":26.79,"key":40,"duration":0.26},{"time":26.79,"key":37,"duration":0.3},{"time":27.35,"key":37,"duration":0.17},{"time":27.35,"key":40,"duration":0.72},{"time":28.270000000000003,"key":40,"duration":0.25},{"time":28.770000000000003,"key":37,"duration":0.12},{"time":28.97,"key":38,"duration":0.28},{"time":29.520000000000003,"key":81,"duration":0.3},{"time":29.689999999999998,"key":37,"duration":0.21},{"time":30.07,"key":69,"duration":0.65},{"time":30.75,"key":40,"duration":0.1},{"time":31.39,"key":39,"duration":0.2},{"time":31.89,"key":69,"duration":0.16},{"time":38.24,"key":17,"duration":0},{"time":38.34,"key":79,"duration":0}],
		'chaser_1': [{"time":0,"key":87,"duration":3.05},{"time":0.620000000000001,"key":39,"duration":0.1},{"time":1.3200000000000003,"key":39,"duration":0.11},{"time":1.7700000000000014,"key":39,"duration":0.05},{"time":2.1500000000000004,"key":37,"duration":0.1},{"time":2.8000000000000007,"key":39,"duration":0.05},{"time":2.8500000000000014,"key":38,"duration":0.32},{"time":3.4300000000000015,"key":39,"duration":0.32},{"time":3.5200000000000014,"key":40,"duration":0.51},{"time":4.280000000000001,"key":39,"duration":0.25},{"time":4.33,"key":40,"duration":0.2},{"time":4.630000000000001,"key":38,"duration":0.34},{"time":5.23,"key":39,"duration":0.15},{"time":5.300000000000001,"key":38,"duration":0.42},{"time":6.07,"key":39,"duration":0.46},{"time":6.120000000000001,"key":40,"duration":0.41},{"time":6.780000000000001,"key":39,"duration":0.34},{"time":6.92,"key":69,"duration":0.28},{"time":7.270000000000001,"key":38,"duration":0.18},{"time":8,"key":39,"duration":0.1},{"time":8.27,"key":37,"duration":0.21},{"time":8.32,"key":81,"duration":0.3},{"time":8.830000000000002,"key":38,"duration":0.1},{"time":9.05,"key":32,"duration":0.23},{"time":9.280000000000001,"key":39,"duration":0.45},{"time":9.52,"key":40,"duration":0.21},{"time":9.82,"key":69,"duration":0.1},{"time":10.220000000000002,"key":37,"duration":0.26},{"time":10.420000000000002,"key":38,"duration":0.06},{"time":10.920000000000002,"key":32,"duration":0.21},{"time":11.129999999999999,"key":39,"duration":0.17},{"time":11.170000000000002,"key":40,"duration":0.3},{"time":11.52,"key":37,"duration":0.16},{"time":11.920000000000002,"key":40,"duration":0.41},{"time":11.920000000000002,"key":39,"duration":0.41},{"time":12.57,"key":32,"duration":0.15},{"time":12.900000000000002,"key":37,"duration":0.25},{"time":13.420000000000002,"key":38,"duration":0.13},{"time":13.720000000000002,"key":32,"duration":0.03},{"time":13.970000000000002,"key":69,"duration":0.25},{"time":14.05,"key":39,"duration":0.55},{"time":14.27,"key":40,"duration":0.71},{"time":15.07,"key":39,"duration":0.13},{"time":15.420000000000002,"key":40,"duration":0.26},{"time":16.18,"key":81,"duration":0.4},{"time":16.43,"key":37,"duration":0.2},{"time":16.580000000000002,"key":38,"duration":0.12},{"time":17.35,"key":38,"duration":0.27},{"time":17.43,"key":81,"duration":0.25},{"time":17.62,"key":37,"duration":0.43},{"time":18.37,"key":81,"duration":0.25},{"time":18.37,"key":38,"duration":0.38},{"time":18.45,"key":37,"duration":0.23},{"time":19.05,"key":39,"duration":0.35},{"time":19.67,"key":40,"duration":0.23},{"time":20.52,"key":39,"duration":0.11},{"time":21.23,"key":83,"duration":1.07},{"time":21.78,"key":38,"duration":0.12},{"time":22.77,"key":83,"duration":0.28},{"time":22.87,"key":37,"duration":0.03},{"time":23.17,"key":87,"duration":1.13},{"time":23.7,"key":32,"duration":0.2},{"time":24.430000000000003,"key":40,"duration":0.34},{"time":24.720000000000002,"key":39,"duration":0.1},{"time":25.13,"key":38,"duration":0.29},{"time":25.680000000000003,"key":37,"duration":0.35},{"time":26.12,"key":81,"duration":0.38},{"time":26.2,"key":37,"duration":0.3},{"time":26.27,"key":40,"duration":0.23},{"time":26.900000000000002,"key":37,"duration":0.37},{"time":27.599999999999998,"key":81,"duration":0},{"time":27.720000000000002,"key":83,"duration":1.1},{"time":27.98,"key":40,"duration":0.22},{"time":28.13,"key":37,"duration":0.22},{"time":28.779999999999998,"key":37,"duration":0.15},{"time":29.12,"key":83,"duration":0.4},{"time":29.37,"key":37,"duration":0.23},{"time":29.849999999999998,"key":40,"duration":0.25},{"time":30.720000000000002,"key":37,"duration":0.2},{"time":30.95,"key":87,"duration":1.3},{"time":31.279999999999998,"key":32,"duration":0.17},{"time":31.279999999999998,"key":39,"duration":0.17},{"time":31.7,"key":39,"duration":0.1},{"time":32.22,"key":39,"duration":0.3},{"time":32.25,"key":38,"duration":0.27},{"time":32.83,"key":38,"duration":0.05},{"time":32.879999999999995,"key":39,"duration":0.05},{"time":33.08,"key":40,"duration":0.35},{"time":33.43000000000001,"key":37,"duration":0.05},{"time":33.75,"key":38,"duration":0.12},{"time":34.2,"key":32,"duration":0.15},{"time":34.849999999999994,"key":38,"duration":0.32},{"time":35.57000000000001,"key":39,"duration":0.2},{"time":35.82000000000001,"key":40,"duration":0.25},{"time":36.53,"key":69,"duration":0.12},{"time":36.7,"key":37,"duration":0.17},{"time":36.97,"key":40,"duration":0.18},{"time":37.95,"key":38,"duration":0.08},{"time":38.730000000000004,"key":38,"duration":0.15},{"time":39.849999999999994,"key":40,"duration":0.07},{"time":40.67,"key":39,"duration":0.11},{"time":40.92,"key":69,"duration":0.25},{"time":41.78,"key":37,"duration":0.12},{"time":41.95,"key":83,"duration":3.42},{"time":45.849999999999994,"key":17,"duration":0},{"time":45.97,"key":79,"duration":0}],
		'chased_2': [{"time":0,"key":87,"duration":0.76},{"time":2.0500000000000007,"key":83,"duration":0.2},{"time":2.91,"key":37,"duration":0.07},{"time":5.41,"key":81,"duration":0.34},{"time":5.93,"key":37,"duration":0.18},{"time":5.93,"key":40,"duration":0.8},{"time":6.610000000000001,"key":37,"duration":0.12},{"time":7.300000000000001,"key":37,"duration":0.16},{"time":7.73,"key":81,"duration":0.22},{"time":8.13,"key":40,"duration":0.25},{"time":8.58,"key":69,"duration":0.23},{"time":9.13,"key":69,"duration":3.28},{"time":12.73,"key":69,"duration":0.35},{"time":13.18,"key":37,"duration":0.27},{"time":13.309999999999999,"key":38,"duration":0.14},{"time":14.100000000000001,"key":40,"duration":0.15},{"time":14.780000000000001,"key":38,"duration":0.15},{"time":14.850000000000001,"key":37,"duration":0.15},{"time":15.43,"key":40,"duration":0.12},{"time":16.2,"key":37,"duration":0.13},{"time":16.76,"key":40,"duration":0.05},{"time":16.93,"key":37,"duration":0.13},{"time":17.43,"key":32,"duration":0.15},{"time":18.3,"key":37,"duration":0.23},{"time":18.830000000000002,"key":40,"duration":0.25},{"time":19.63,"key":81,"duration":0.12},{"time":19.93,"key":37,"duration":0.27},{"time":20.53,"key":81,"duration":3.05},{"time":20.7,"key":40,"duration":0},{"time":21.03,"key":40,"duration":0.37},{"time":22.76,"key":37,"duration":0.12},{"time":23.580000000000002,"key":38,"duration":0.15},{"time":24.06,"key":39,"duration":0},{"time":24.56,"key":69,"duration":1.05},{"time":24.650000000000002,"key":39,"duration":0.36},{"time":24.650000000000002,"key":40,"duration":0.36},{"time":25.61,"key":39,"duration":0.17},{"time":25.61,"key":40,"duration":0.55},{"time":26.209999999999997,"key":37,"duration":0.25},{"time":26.500000000000004,"key":40,"duration":0.51},{"time":27.26,"key":40,"duration":0.47},{"time":27.51,"key":37,"duration":0.17},{"time":27.779999999999998,"key":81,"duration":0.15},{"time":28.180000000000003,"key":81,"duration":0.28},{"time":28.930000000000003,"key":81,"duration":0.33},{"time":29.610000000000003,"key":38,"duration":0.12},{"time":30.830000000000002,"key":87,"duration":1.23},{"time":32,"key":37,"duration":0.06},{"time":32.61,"key":40,"duration":0.07},{"time":34.959999999999994,"key":83,"duration":0.64},{"time":35.599999999999994,"key":69,"duration":0.56},{"time":36.58,"key":40,"duration":0.7},{"time":36.8,"key":39,"duration":0.2},{"time":37.58,"key":40,"duration":0.12},{"time":37.849999999999994,"key":69,"duration":0.28},{"time":38.129999999999995,"key":39,"duration":0.15},{"time":38.129999999999995,"key":81,"duration":0.15},{"time":38.209999999999994,"key":40,"duration":0.39},{"time":38.91,"key":81,"duration":0.5},{"time":39.480000000000004,"key":40,"duration":0.12},{"time":39.58,"key":81,"duration":0.1},{"time":40,"key":87,"duration":0.91},{"time":40.61,"key":81,"duration":0.1},{"time":41.209999999999994,"key":38,"duration":0.04},{"time":41.629999999999995,"key":81,"duration":0.15},{"time":43.25,"key":69,"duration":0.05},{"time":43.709999999999994,"key":40,"duration":0.55},{"time":44.480000000000004,"key":40,"duration":0.22},{"time":44.93000000000001,"key":40,"duration":0.45},{"time":45.58,"key":40,"duration":1.75},{"time":48.05,"key":40,"duration":0.18},{"time":48.879999999999995,"key":38,"duration":0.17},{"time":49.55,"key":39,"duration":0.15},{"time":49.81,"key":69,"duration":0.27},{"time":50.209999999999994,"key":39,"duration":0.24},{"time":50.260000000000005,"key":40,"duration":0.19},{"time":51.209999999999994,"key":39,"duration":0.09},{"time":51.95,"key":39,"duration":0.18},{"time":52.75,"key":40,"duration":0.11},{"time":52.8,"key":39,"duration":0},{"time":53.61,"key":38,"duration":0.14},{"time":53.93000000000001,"key":39,"duration":0.2},{"time":54.349999999999994,"key":40,"duration":0.26},{"time":55.010000000000005,"key":38,"duration":0},{"time":55.83,"key":38,"duration":0.05},{"time":59.010000000000005,"key":81,"duration":2.92},{"time":62.16000000000001,"key":38,"duration":0.09},{"time":62.510000000000005,"key":81,"duration":0.34},{"time":63.230000000000004,"key":38,"duration":0.12},{"time":63.5,"key":87,"duration":0.9},{"time":64.55,"key":37,"duration":0.05},{"time":66.35000000000001,"key":81,"duration":0.86},{"time":67,"key":37,"duration":0.13},{"time":67,"key":40,"duration":1.3},{"time":68.05,"key":37,"duration":0.25},{"time":68.71000000000001,"key":40,"duration":0.2},{"time":69.06,"key":69,"duration":0.14},{"time":69.56,"key":69,"duration":0.29},{"time":70.33,"key":69,"duration":0.03},{"time":71,"key":69,"duration":0.06},{"time":72.10000000000001,"key":81,"duration":0.1},{"time":72.73,"key":69,"duration":0.05},{"time":76.68,"key":40,"duration":0.05},{"time":81.38000000000001,"key":87,"duration":1.07},{"time":84.81,"key":17,"duration":0},{"time":84.91000000000001,"key":79,"duration":0}],
		'chaser_2': [{"time":4.33,"key":87,"duration":0.45},{"time":4.98,"key":39,"duration":0.12},{"time":5.85,"key":38,"duration":0.12},{"time":6.88,"key":32,"duration":0.14},{"time":7.83,"key":37,"duration":0},{"time":8.53,"key":40,"duration":0.24},{"time":9.15,"key":40,"duration":0.22},{"time":9.98,"key":37,"duration":0.57},{"time":11.18,"key":37,"duration":0.09},{"time":11.27,"key":81,"duration":0.33},{"time":12,"key":69,"duration":0.4},{"time":12.4,"key":81,"duration":1.9},{"time":13.15,"key":40,"duration":0.13},{"time":13.68,"key":40,"duration":0.4},{"time":14.03,"key":39,"duration":0.05},{"time":14.33,"key":38,"duration":0},{"time":14.33,"key":37,"duration":0.74},{"time":15.07,"key":38,"duration":0.73},{"time":15.07,"key":81,"duration":0.38},{"time":15.27,"key":37,"duration":0.43},{"time":16.58,"key":37,"duration":0.4},{"time":16.77,"key":38,"duration":0.21},{"time":17.43,"key":39,"duration":0.24},{"time":17.7,"key":32,"duration":0.15},{"time":19.08,"key":37,"duration":0.1},{"time":19.72,"key":40,"duration":0.05},{"time":19.83,"key":32,"duration":0.04},{"time":20.37,"key":40,"duration":0.18},{"time":20.88,"key":37,"duration":0.07},{"time":21.53,"key":38,"duration":0.07},{"time":21.92,"key":38,"duration":0.15},{"time":22.2,"key":37,"duration":0.23},{"time":22.98,"key":81,"duration":0.2},{"time":23.45,"key":37,"duration":0.23},{"time":23.45,"key":38,"duration":0.15},{"time":23.92,"key":40,"duration":0.31},{"time":24.32,"key":37,"duration":0.16},{"time":24.4,"key":40,"duration":0.08},{"time":24.4,"key":81,"duration":0.17},{"time":24.9,"key":38,"duration":0.25},{"time":25.47,"key":32,"duration":0.03},{"time":26.32,"key":69,"duration":0.66},{"time":26.32,"key":40,"duration":0.31},{"time":26.42,"key":39,"duration":0.21},{"time":27.22,"key":39,"duration":0.4},{"time":27.32,"key":40,"duration":0.3},{"time":27.98,"key":40,"duration":0.99},{"time":29.13,"key":37,"duration":0.17},{"time":29.52,"key":87,"duration":1.3},{"time":30.3,"key":39,"duration":0.22},{"time":31.15,"key":39,"duration":0.18},{"time":32.02,"key":40,"duration":0.6},{"time":32.88,"key":39,"duration":0.2},{"time":32.93,"key":40,"duration":0.15},{"time":33.4,"key":40,"duration":0.48},{"time":34.25,"key":40,"duration":0.28},{"time":34.53,"key":83,"duration":1.3},{"time":34.77,"key":40,"duration":0.25},{"time":35.02,"key":39,"duration":0.08},{"time":35.4,"key":39,"duration":0.3},{"time":36,"key":40,"duration":0.47},{"time":36.58,"key":39,"duration":0.25},{"time":36.83,"key":81,"duration":0.2},{"time":37.37,"key":37,"duration":0.16},{"time":37.87,"key":87,"duration":1.15},{"time":38.38,"key":81,"duration":0.17},{"time":39.02,"key":40,"duration":0.08},{"time":39.37,"key":39,"duration":0.73},{"time":39.53,"key":40,"duration":0.5},{"time":40.35,"key":38,"duration":0.1},{"time":40.73,"key":39,"duration":0.24},{"time":41.27,"key":39,"duration":0.23},{"time":41.6,"key":83,"duration":0.32},{"time":41.95,"key":39,"duration":0.52},{"time":42.68,"key":40,"duration":0.25},{"time":43.18,"key":40,"duration":0.09},{"time":43.52,"key":39,"duration":0.03},{"time":43.98,"key":87,"duration":0.14},{"time":44.12,"key":39,"duration":0.25},{"time":44.45,"key":40,"duration":0.37},{"time":44.82,"key":37,"duration":0.31},{"time":45.47,"key":40,"duration":0.45},{"time":46.42,"key":40,"duration":2.13},{"time":46.65,"key":37,"duration":0.05},{"time":46.78,"key":37,"duration":0.24},{"time":47.38,"key":37,"duration":0.22},{"time":49.03,"key":37,"duration":0.44},{"time":49.83,"key":38,"duration":0},{"time":50.07,"key":39,"duration":0.4},{"time":50.47,"key":32,"duration":0.15},{"time":50.8,"key":38,"duration":0.15},{"time":51.55,"key":39,"duration":0.23},{"time":51.78,"key":32,"duration":0.15},{"time":52,"key":39,"duration":0.18},{"time":52.6,"key":37,"duration":0.15},{"time":52.75,"key":69,"duration":0.38},{"time":53.32,"key":39,"duration":0.23},{"time":53.42,"key":40,"duration":0.13},{"time":54.17,"key":32,"duration":0.06},{"time":54.48,"key":38,"duration":0.07},{"time":55.08,"key":39,"duration":0.25},{"time":55.23,"key":40,"duration":0.1},{"time":55.72,"key":40,"duration":0.08},{"time":55.72,"key":39,"duration":0.08},{"time":56,"key":37,"duration":0.25},{"time":56.85,"key":39,"duration":0.22},{"time":57.07,"key":87,"duration":0.1},{"time":57.6,"key":37,"duration":0.13},{"time":58.77,"key":38,"duration":0.1},{"time":59.57,"key":40,"duration":0.16},{"time":60.88,"key":38,"duration":0.09},{"time":61.87,"key":40,"duration":0.1},{"time":62.98,"key":32,"duration":0.05},{"time":64.17,"key":38,"duration":0.25},{"time":65.92,"key":38,"duration":0.13},{"time":66.32,"key":32,"duration":0.08},{"time":66.7,"key":40,"duration":0.23},{"time":68.25,"key":40,"duration":0.13},{"time":70.32,"key":17,"duration":0},{"time":70.4,"key":79,"duration":0}]
	},

	models : [

		//{ type : "falcon", transform : { translate : {x : -600, y : -50, z : 800}, scale : { x : 0.5, y : 0.5, z : 0.5 }}, script : [] } ,

		// { type : "tie", transform : { translate : {x : 60, y : 0, z : 0}, rotation : { x : 0, y : 90, z : 0} }, options: {script : "tieScript1"} },
		// { type : "tie", transform : { translate : {x : 60, y : -240, z : 0}, rotation : { x : 0, y : 90, z : 0}}, options: {script : "tieScript2"} },
		{ type : "tie", transform : { translate : {x : 60, y : -240, z : 0}, rotation : { x : 0, y : 90, z : 0}}, options: {script : "chased_2", laser: 'green', topSpeed: 3, acceleration: 1} },
		{ type : "tie", transform : { translate : {x : 40, y : -240, z : -20}, rotation : { x : 0, y : 90, z : 0}}, options: {script : "chased_2", laser: 'green', topSpeed: 3, acceleration: 1} },
		{ type : "tie", transform : { translate : {x : 40, y : -240, z : 20}, rotation : { x : 0, y : 90, z : 0}}, options: {script : "chased_2", laser: 'green', topSpeed: 3, acceleration: 1} },
		{ type : "tie", transform : { translate : {x : 40, y : -140, z : 20}, rotation : { x : 0, y : 90, z : 0}}, options: {script : "chaser_2", laser: 'red', topSpeed: 4, acceleration: 1} },
		{ type : "tie", transform : { translate : { x : 394.078, y : -110.85, z : 0}, rotation : { x : 0, y : 90, z : 0}}, options: {script : "chased_1", laser: 'purple', topSpeed: 6, acceleration: 1} },
		{ type : "tie", transform : { translate : { x : 410.078, y : -110.85, z : 30}, rotation : { x : 0, y : 90, z : 0}}, options: {script : "chased_1", laser: 'purple', topSpeed: 6, acceleration: 1} },
		{ type : "tie", transform : { translate : { x : 454.078, y : -110.85, z : 0}, rotation : { x : 0, y : 90, z : 0}}, options: {script : "chaser_1", laser: 'purple', topSpeed: 6, acceleration: 1} },

		//{ type : "tie", transform : { translate : {x : -20, y : 20, z : -120}}, script : "tieGroup1" },
		//{ type : "tie", transform : { translate : {x : -30, y : 25, z : -140}}, script : "tieGroup1" },
		//{ type : "tie", transform : { translate : {x : -10, y : 20, z : -140}}, script : "tieGroup1" },
		// { type : "rock_01", transform : { translate : {x : -10, y : 20, z : -140}, scale: {x: 100, y: 100, z: 100}}, script : [] },

	],

	camera : {
		// position : { x : 60, y : -240, z : 0}
		position : {x : 40, y : -140, z : 20}
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
