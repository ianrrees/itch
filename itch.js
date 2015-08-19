// Boilerplate.  This is all meant to be loaded via URL:  http://ianrrees.github.io/itch/itch.js
(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    ext.initSocket = function() {
        console.log("Top of initSocket()");

        if (typeof ext._ws == 'undefined' || ext._ws.readyState == 3) {
            console.log("Making a new websocket");

            ext._ws = new WebSocket("ws://localhost:8000/");
            ext._ws.onopen = function(evt) { ext._wsOnOpen(evt) };
            ext._ws.onclose = function(evt) { ext._wsOnClose(evt) };
            ext._ws.onmessage = function(evt) { ext._wsOnMessage(evt) };
            ext._ws.onerror = function(evt) { ext._wsOnError(evt) };
            ext._wsRetriesLeft = 10;
        } else {
            console.log("Didn't need to make a new websocket");
        }
    }

    ext.ledOnBlockActivated = function() {
        console.log("About to send LED on command, socket state is " + ext._ws.readyState);
        if (ext._ws.readyState == 3) {
            ext.initSocket();
        }
        if (ext._ws.readyState == 0) { // 0 => Not yet open
            if (ext._wsRetriesLeft > 0) {
                ext._wsRetriesLeft -= 1;
                console.log("Set timer to try again");
                setTimeout(ext.ledOnBlockActivated(), 250);
            } else {
                console.log("Ran out of retries.");
            }
        } else {
            console.log("actually sending");
            ext._ws.send("LED On");
        }
    };

    ext.ledOffBlockActivated = function() {
        console.log("About to send LED off command, socket state is " + ext._ws.readyState);
        if (ext._ws.readyState == 3) { // 3 => connection closed or couldn't be opened
            ext.initSocket();
        }
        if (ext._ws.readyState == 0) { // 0 => Not yet open
            if (ext._wsRetriesLeft > 0) {
                ext._wsRetriesLeft -= 1;
                console.log("Set timer to try again");
                setTimeout(ext.ledOffBlockActivated(), 250);
            } else {
                console.log("Ran out of retries.");
            }
        } else {
            console.log("actually sending");
            ext._ws.send("LED Off");
        }
    };

/*    ext.power = function(base, exponent) {
        console.log("Power (as in exponentiation) block was run!");
        return Math.pow(base, exponent);
    }; */

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            // Block type, block name, function name[, param1 default value, param2 default value]
            [' ', 'Turn LED On!', 'ledOnBlockActivated'],
            [' ', 'Turn LED Off!', 'ledOffBlockActivated'],
//         ['r', '%n ^ %n', 'power', 2, 3],
        ]
    };

    // Register the extension
    ScratchExtensions.register('Ian\'s LED Blinker', descriptor, ext);
    ext.initSocket();

    ext._wsOnOpen = function(evt) {
        console.log("WS Connected");
    }

    ext._wsOnClose = function(evt) {
        console.log("WS Disconnected");
    }

    ext._wsOnMessage = function(evt) {
        console.log("WS Response is " + evt.data);
        ext._ws.close();
    }

    ext._wsOnError = function(evt) {
        console.log("WS Error was " + evt.data);
    }
})

({});
