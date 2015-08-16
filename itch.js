// Boilerplate.  This is all meant to be loaded via URL:  http://ianrrees.github.io/itch/itch.js
(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    var wsUri = "ws://localhost:8000/";
    var output;

    function initSocket() {
        if (typeof ext.ws !== 'undefined' &&
            ext.ws.readyState != CLOSED) {
            console.log("Websocket is not undefined or closed");
            console.log(ext.ws.readyState);
            return;
        }

        ext.ws = new WebSocket(wsUri);
        ext.ws.onopen = function(evt) { onOpen(evt) };
        ext.ws.onclose = function(evt) { onClose(evt) };
        ext.ws.onmessage = function(evt) { onMessage(evt) };
        ext.ws.onerror = function(evt) { onError(evt) };
    }

    ext.ledOnBlockActivated = function() {
        console.log("Sending LED command");
        initSocket();
        doSend(ext.ws, "LED On");
    };

    ext.ledOffBlockActivated = function() {
        console.log("Sending LED command");
        initSocket();
        doSend(ext.ws, "LED Off");
    };

    ext.power = function(base, exponent) {
        console.log("Power (as in exponentiation) block was run!");
        return Math.pow(base, exponent);
    };

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

function onOpen(evt) {
    console.log("Connected websocket doodad");
}

function onClose(evt) {
    console.log("Disconnected websocket doodad");
}

function onMessage(evt) {
    console.log("Response is " + evt.data);
    ext.ws.close();
}

function onError(evt) {
    console.log("Error was " + evt.data);
}

function doSend(ext.ws, message) {
    ext.ws.send(message);
}

})

({});
