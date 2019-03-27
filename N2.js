function sigmoid(X) {
	return 1 / (1 + Math.exp(X))
}

function RELU(X) {
	return Math.max(0, X)
}

function prettyPrint(msg="") {
	let line = ""

	console.log()
	console.log(msg)
	console.log(`===`)
	for (let Z = 0; Z <= dimension; Z++) {
		for (let Y = 0; Y < dimension; Y++) {
			line = ""
			
			for (let X = 0; X < dimension; X++) {
				line += signal[X][Y][Z] + "\t"
			}   
			console.log(`${line}`)
		}
		console.log(`---`)
	}
	console.log(`=====`)
}

function initialize() {
	for (let X = 0; X < dimension; X++) {
		signal[X] = new Array(dimension)
	
		for (let Y = 0; Y < dimension; Y++){
			signal[X][Y] = new Array(dimension)
	
			for (let Z = 0; Z <= dimension; Z++){
				signal[X][Y][Z] = Math.random()
			}
		}
	}
}

function input(V) {
	for (let I in V) signal[0][I][0] = V[I]
}

function update() {
	for (let X = 1; X < dimension; X++) {
		for (let Y = 0; Y < dimension; Y++){
			signal[X][Y][0] = bias

			for (let Z = 1; Z <= dimension; Z++){
				signal[X][Y][0] += RELU(signal[X-1][Z-1][0] * signal[X-1][Y][Z])
			}
		}
	}
}

function vector(X) {
	let result = []

	for (let Y = 0; Y < dimension; Y++) result.push(signal[X][Y][0])

	return result
}

function train_layer(X, expected) {
console.log(expected)
	for (let Y = 0; Y < dimension; Y++){
		let error = expected[Y] - signal[X][Y][0]

		stability = Math.max(stability, error)

		let diff = error * signal[X][Y][0] * learn_rate

		for (let Z = 1; Z <= dimension; Z++){
			signal[X-1][Y][Z] += diff
		}
	}
}

function train(expect) {
	let expected = expect

	for (let X = dimension-1; X > 0; X--) {
console.log(X)
		train_layer(X, expected)

		expected = vector(X)
	}

	update()
}


let bias = 1			// the base signal (to avoid zero flibbity)
let dimension = 3		// the number of inputs & outputs (this is a parallelepiped construct)
let learn_rate = 0.1	// dampening of the weight adjustments; higher is faster/unstabler
let signal = []			// the heart of the matter
let stability = 1		// moving average of the error/cost; higher is more erroroneousness
let threshold = 0.1		// the target error for learning


initialize()
input([0.1, 0.2, 0.3])
prettyPrint("initial state")

update()
prettyPrint("initial calc")

let flat = [0.2, 0.3, 0.4]

train(flat)
train(flat)
train(flat)
train(flat)
train(flat)
train(flat)
train(flat)
train(flat)
train(flat)
train(flat)
train(flat)
train(flat)
prettyPrint("train")
