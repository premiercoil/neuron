let Neuron = require('./neuron.js')

let N = new Neuron()

let ins = [0.1, 0.2, 0.3]
let outs = [0.2, 0.3, 0.4]

N.print

N.activate(ins)

N.print

N.learn(ins, outs)

N.print
