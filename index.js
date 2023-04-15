const logEvents = require( './LogEvents');
const EventEmitter = require( 'events')

 class MyEmitter  extends  EventEmitter {}

const myEmitter = new MyEmitter();

myEmitter.on('log' , (msg) => logEvents(msg))

setTimeout(() => {

    myEmitter.emit( 'log', 'log event emitted')
}, 2000)