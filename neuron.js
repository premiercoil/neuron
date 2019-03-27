function sigmoid(X) {
	return 1 / (1 + Math.exp(X))
}

function RELU(X) {
	return Math.max(0, X)
}


defaults = {
    bias: 1,            // the base signal (to avoid zero flibbity)
    dimension: 3,       // the number of inputs & outputs (this is a parallelepiped construct)
    learn_rate: 0.1,    // dampening of the weight adjustments; higher is faster/unstabler
    stability: 1,       // moving average of the error/cost; higher is more erroroneousness
    threshold: 0.1      // the target error for learning
}

module.exports = class Neuron {
    constructor(opts) {
        this.data = []

        this.dimension = opts.dimension || 3
        this.bias = opts.bias || 1
        this.learn_rate = opts.learn_rate || 0.1
        this.stability = opts.stability || 1
        this.threshold = opts.threshold || 0.1

        for (let X = 0; X < this.dimension; X++) {
            this.data[X] = new Array(this.dimension)

            for (let Y = 0; Y < this.dimension; Y++){
                this.data[X][Y] = new Array(this.dimension)

                for (let Z = 0; Z <= this.dimension; Z++){
                    this.data[X][Y][Z] = Math.random()
                }
            }
        }
    }

    learn(expectation, newThreshold) {
        if (typeof newThreshold == 'number') this.threshold = newThreshold

        while (Math.abs(this.stability) > this.threshold){
            this.train(expectation)
        }
    }

    get model() {
        let result = {
            bias: this.bias,
            data: this.data,
            dimension: this.dimension,
            learn_rate: this.learn_rate,
            threshold: this.threshold
        }

        return JSON.stringify(result)
    }

    set model(M) {
        let thisn = JSON.parse(M)

        for (let X in thisn)
            this[X] = thisn[X]
    }

    output(inputs) {
        for (let I in inputs) this.data[0][I][0] = inputs[I]

        for (let X = 1; X < this.dimension; X++){
            this.vector(X)    
        }

        return this.vector(this.dimension-1)
    }
    
    prettyPrint() {
        let line = ""

        console.log(`===`)
        for (let Z = 0; Z <= this.dimension; Z++) {
            for (let Y = 0; Y < this.dimension; Y++) {
                line = ""
                
                for (let X = 0; X < this.dimension; X++) {
                    line += this.data[X][Y][Z] + "\t"
                }   
                console.log(`${line}`)
            }
            console.log(`---`)
        }
        console.log(`=====`)
    }

    signal(X, Y) {
        // calculates a single signal-output
        this.data[X][Y][0] = this.bias

        for (let Z = 1; Z <= this.dimension; Z++){
            this.data[X][Y][0] += RELU(this.data[X-1][Z-1][0] * this.data[X-1][Y][Z])
        }
        
        return this.data[X][Y][0]
    }

    vector(X) {
        let result = []
        // returns an array representing the output of the prior layer's weighted sum; i.e. the neuronal calculation
        for (let Y = 0; Y < this.dimension; Y++){
            result.push(this.signal(X, Y))
        }

        return result
    }

    train_layer(X, expected) {
        let error = 1

        for (let Y = 0; Y < this.dimension; Y++){
            let activation = this.data[X][Y][0]

            error = expected[Y] - activation
            this.stability = Math.max(this.stability, error)

            let diff = error * activation * this.learn_rate

            for (let Z = 1; Z <= this.dimension; Z++){
                // adjust the weights
                this.data[X-1][Y][Z] += diff
            }
        }
    }

    train(expectation){
        let expected = expectation

        this.stability = 1  // need to reset this each for clarity

        for (let X = this.dimension-1; X > 0; X--){
console.log(expected)
            this.train_layer(X, expected)

            expected = this.vector(X)
console.log(expected)
        }
    }
}
