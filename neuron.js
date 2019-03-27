defaults = {
    bias: 1,
    dimension: 3,
    learn_rate: 0.1,
    threshold: 0.1
}

module.exports = class Neuron {
    constructor(opts) {
        this.data = []

        this.dimension = opts.dimension || 3
        this.bias = opts.bias || 1
        this.learn_rate = opts.learn_rate || 0.1

        for (let X = 0; X < this.dimension; X++) {
            this.data[X] = new Array(this.dimension)

            for (let Y = 0; Y < this.dimension; Y++){
                this.data[X][Y] = new Array(this.dimension)

                for (let Z = 0; Z <= this.dimension; Z++){
                    this.data[X][Y][Z] = Math.random() } } }
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
        console.log(`===`)
    }

    output(inputs) {
        for (let X = 1; X < this.dimension; X++){
            this.vector(X)    
        }
    }

    signal(X, Y) {
        // calculates a single signal-output
        this.data[X][Y][0] = this.bias

        for (let Z = 1; Z <= this.dimension; Z++){
            this.data[X][Y][0] += this.data[X-1][Z-1][0] * this.data[X][Y][Z]
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
            error = expected[Y] - this.data[X][Y][0]

            for (let Z = 1; Z <= this.dimension; Z++){
                // adjust the weights
                this.data[X][Y][Z] = this.data[X][Y][Z] + (error * this.data[X][Y][0] * this.learn_rate)
            }
        }
    }

    train(expectation){
        let expected = expectation

        for (let X = this.dimension-1; X > 1; X--){
            this.train_layer(X, expected)

            expected = this.vector(X)
        }
    }
}
