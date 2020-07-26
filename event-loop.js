// node myFile.js

const pendingTimers = [];
const pendingOSTasks = [];
const pendingOperations = [];

// New timers, tasks, operations are recorded from myFile running
// When we start program, node immediately detects some initial tasks
// like accessing file system, set up a http port
// for this reason our event loop keeps waiting
myFile.runContents();

// Node performs three checks
// to decide weather or not
// to continue running the program
function shouldContinue() {
    // Check one: Any pending setTimeout, setInterval, setImmediate

    // Check two: Any pending OS tasks? (like server listening to port)

    // Check three: Any pending long running operations? (Like fs module)

    return pendingTimers.length || pendingOSTasks.length || pendingOperations.length;
}

// Event loop example
// Executes again and again
// Every iteration is called a TICK
while(shouldContinue()) {
    // 1) Node looks at pendingTimers and sees if any function
    // are ready to be called. ONLY (setTimeout, setInterval)

    // 2) Node looks at pendingOSTasks and pendingOperations
    // and calls relevant callbacks

    // 3) PAUSE execution. Continue when...
    // - a new pendingOSTask is done
    // - a pendingOperation is done
    // - a timer is about to complete

    // 4) Look at pendingTimers. Call any setImmediate

    // 5) Handle any 'close' event
    // e.g: Terminate processing
    // e.g: File Stream
}


// exit back to terminal
