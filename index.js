const neuron = require('./neuron.js')


let N = new neuron({
    dimmension: 3
})

let flat = [0.1, 0.2, 0.3]

console.clear()

N.output(flat)

N.prettyPrint()

N.train(flat)
N.train(flat)
N.train(flat)
N.train(flat)
N.train(flat)

N.prettyPrint()

N.output(flat)
