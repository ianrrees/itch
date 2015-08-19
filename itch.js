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

        if (typeof ext._ws == 'undefined') {
            console.log("Making a new websocket");

            ext._ws = new WebSocket("ws://localhost:8000/");
            ext._ws.onopen = function(evt) { ext._wsOnOpen(evt) };
            ext._ws.onclose = function(evt) { ext._wsOnClose(evt) };
            ext._ws.onmessage = function(evt) { ext._wsOnMessage(evt) };
            ext._ws.onerror = function(evt) { ext._wsOnError(evt) };
        } else {
            console.log("Didn't need to make a new websocket");
        }
    }

    ext.ledOnBlockActivated = function() {
        console.log("Sending LED on command, socket state is " + ext._ws.readyState);
        ext._ws.send("LED On");
        console.log("Socket is " + ext._ws);
    };

    ext.ledOffBlockActivated = function() {
        console.log("Sending LED off command, socket state is " + ext._ws.readyState);
        ext._ws.send("LED Off");
        console.log("Socket is " + ext._ws);
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
