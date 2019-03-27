let bias = 1
let net = []
let prior_inputs = []
let rate = 1
let signal = 0
let size = 3
let stability = 1
let threshold = 0.1
let weight = []


module.exports = class {
	constructor(opts={}) {
		bias = opts.bias || bias
		rate = opts.rate || rate
		size = opts.size || size
		threshold = opts.threshold || threshold
		weight = opts.weight || weight

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

	get print() {
		let line = ""

		console.log()
		console.log(`==${size}==`)
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
		console.log(`==${size}==`)
	}

	activate(inputs) {
		if (typeof inputs == 'object')
			for (let Y = 0; Y < size; Y++) net[0][Y][0] = inputs[Y]	// glean inputs
	
		for (let X = 1; X < size; X++) {	// update signals (top Z-layer)
			for (let Y = 0; Y < size; Y++){
				for (let Z = 1; Z <= size; Z++){
					net[X][Y][0] = Math.max(net[X][Y][Z] * net[X-1][Y][0], 0)	// RELU activation
				}
			}
		}
	}

	train(inputter, expectation) {
		let error = []
		let expected = expectation.slice()
		let inputs = []
		for (let Y = 0; Y < size; Y++) inputs.push(net[0][Y][0])

		stability = 0
		
		for (let X = 1; X < size; X++) {
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

			this.activate(inputter)
			
			for (let Y = 0; Y < size; Y++)	// glean the expected values for nexties
			expected[Y] = net[X][Y][0]
		}
	}

	learn(ins, outs) {
		while (stability > threshold) this.train(ins, outs)
	}
}
