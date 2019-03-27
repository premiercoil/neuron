let bias = 1
let error = []
let inputs = []
let net = []
let outputs = []
let rate = 1
let size = 3
let stability = 1
let threshold = 0.1


function initalize() {
	for (let X = 0; X < size; X++) {
		net[X] = new Array(size)
		
		for (let Y = 0; Y < size; Y++){
			net[X][Y] = new Array(size)
			
			for (let Z = 0; Z <= size; Z++){
				net[X][Y][Z] = 0.5
			}
		}
	}
}

function prettyPrint(msg="") {
	let line = ""

	console.log()
	console.log(msg)
	console.log(`===`)
	for (let Z = 0; Z <= size; Z++) {
		for (let Y = 0; Y < size; Y++) {
			line = ""
			
			for (let X = 0; X < size; X++) {
				line += (Math.round(net[X][Y][Z] * 100) / 100) + "\t"
			}   
			console.log(`${line}`)
		}
		console.log(`---`)
	}
	console.log(`=====`)
}

function activate() {
	// glean inputs
	for (let Y = 0; Y < size; Y++) net[0][Y][0] = inputs[Y]

	// update signals (top Z-layer)
	for (let X = 1; X < size; X++) {
		for (let Y = 0; Y < size; Y++){
			for (let Z = 1; Z <= size; Z++){
				net[X][Y][0] = Math.max(net[X][Y][Z] * net[X-1][Y][0], 0)	// RELU activation
			}
		}
	}
}

function train() {
	let expected = outputs
	let inputs = []
	for (let Y = 0; Y < size; Y++) inputs.push(net[0][Y][0])

	stability = 0

	for (let X = 1; X < size; X++) {
console.log(expected)
		for (let Y = 0; Y < size; Y++) {	// count the costs
			error[Y] = expected[Y] - net[X][Y][0]

			stability = Math.max(stability, error[Y])
		}

		for (let Y = 0; Y < size; Y++) {
			let diff = error[Y] * net[X][Y][0] * rate

			for (let Z = 1; Z <= size; Z++) {
				net[X][Y][Z] += diff
			}
		}

		activate(inputs)
		
		for (let Y = 0; Y < size; Y++)	// glean the expected values for nexties
			expected[Y] = net[X][Y][0]
	}

console.log(stability)
}

function learn() {
	while (stability > threshold) {
console.log("learntrain", outputs)
		train()
	}
}


initalize()

inputs = [0.1, 0.2, 0.3]

activate()
prettyPrint()

outputs = [0.2, 0.3, 0.4]
learn([0.2, 0.3, 0.4])
prettyPrint()
