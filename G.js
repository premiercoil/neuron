function arrayMax(arr) {
	let result = 0

	for (let X of arr) 
		if (Math.abs(X) > result) result = X

	return result
}

let Neuron = require('./neuron.js')

let dimension = []
let fore = [
	[3,4,5],
	[3,4,5],
	[3,4,5],
	[6,7,8],
	[6,7,8],
	[6,7,8],
	[],
	[],
	[]
]
let back = []		// auto-populated
let layerNum = []
let layers = []		// auto-populated
let nodes = []
let size = 9


function vector() {

}


module.exports = class {
	constructor(opts={}) {
		size = fore.length

		dimension = new Array(size)
		dimension.fill(0)

		layerNum = new Array(size)
		layerNum.fill(0)

		for (let I in fore) back[I] = []	// init back array

		for (let I in fore) {
			let links = fore[I]	// node[I] points forward to other nodes

			for (let X of links) {
				back[X].push(+I)		// creating the back array
				layerNum[X] = layerNum[I] + 1		// glean layer number of each node
			}
		}

		for (let I = 0; I <= arrayMax(layerNum); I++)	// init layers array
			layers[I] = []

		for (let I in layerNum)
			layers[layerNum[I]].push(+I)	// populate the topology

		for (let layer of layers)
			for (let nodeIndex of layer)
				dimension[nodeIndex] = layer.length

		for (let I = 0; I < size; I++) {
			nodes.push(new Neuron({dimension:dimension[I]}))
		}
console.log(nodes)
	}

	activate() {

	}

	set input(V) {
		let vector = V

		for (let layer of layers) {
console.log(vector)
			// load the input vector into the layer's nodes
			for (let nodeIndex of layer)
				nodes[nodeIndex].input = vector

			// re-generate the input vector for the next layer
			vector = []
			for (let nodeIndex of layer)
				vector.push(nodes[nodeIndex].input)
		}
	}

	get nodes() {
		return nodes
	}

	get topology() {
		return {
			fore: fore,
			back: back,
			dimension: dimension,
			layerNum: layerNum,
			layers: layers
		}
	}
}



