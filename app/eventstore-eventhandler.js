var EventsEmitter = require("events");

class MyEmitter extends EventsEmitter{}
const eventHandlers = new MyEmitter();

/**
 * Register a event handler
 * @param {string} eventType Event type to subscribe to
 * @param {function} handler Event handler. A function with parameters subscription and event.
 */
function registerHandler(eventType, handler){
    if(typeof handler !== 'function'){
        throw new Error("argument 'handler' must be a function");
    }
    let found = eventHandlers.listeners(eventType).find(element => {
        return ''+element === ''+handler;
      });
    if(found === undefined)
        eventHandlers.addListener(eventType, handler);
}

/**
 * 
 * @param {string} eventType Event type to subscribe to
 * @param {*} subscription Eventstore subscription
 * @param {*} e The eventstore event. Payload available via e.orginalEvent.data (Buffer). 
 */
function emitEvent(eventType, subscription, e){
    eventHandlers.emit(eventType, subscription, e);
}

function removeAllListeners(){
    eventHandlers.removeAllListeners();
}

module.exports.registerHandler = registerHandler;
module.exports.emitEvent = emitEvent;
module.exports.removeAllListeners = removeAllListeners;