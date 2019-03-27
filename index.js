const neuron = require('./neuron.js')


let N = new neuron({
    dimmension: 3
})

let flit = [0.1, 0.2, 0.3]
let flot = [0.2, 0.3, 0.4]


console.clear()

N.output(flit)

N.prettyPrint()

N.train(flot)
N.prettyPrint()
N.train(flot)
N.prettyPrint()
N.train(flot)
N.prettyPrint()
N.train(flot)
N.prettyPrint()
N.train(flot)
N.prettyPrint()


console.log(N)
