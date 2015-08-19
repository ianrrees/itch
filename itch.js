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

        if (typeof ext.ws == 'undefined') {
            ext.ws = "Hi, I'm not really a websocket sorry :(";
            console.log("Made a new websocket");
        } else {
            console.log("Didn't need to make a new websocket");
        }
    }

    ext.ledOnBlockActivated = function() {
        console.log("Sending LED on command");
        console.log("Socket is " + ext.ws);
    };

    ext.ledOffBlockActivated = function() {
        console.log("Sending LED off command");
        console.log("Socket is " + ext.ws);
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
        ext.ws.close();
    }

    ext._wsOnError = function(evt) {
        console.log("WS Error was " + evt.data);
    }
})

({});
