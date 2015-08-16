// Boilerplate.  This is all meant to be loaded via URL:  http://ianrrees.github.io/itch/itch.js
(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    ext.my_first_block = function() {
        init();
        console.log("The block was run!");
    };

    ext.power = function(base, exponent) {
        console.log("Power block was run!");
        return Math.pow(base, exponent);
    };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            // Block type, block name, function name
            [' ', 'my first block', 'my_first_block'],
            // Block type, block name, function name, param1 default value, param2 default value
            ['r', '%n ^ %n', 'power', 2, 3],
        ]
    };

    // Register the extension
    ScratchExtensions.register('Ian\'s websocket extension', descriptor, ext);

var wsUri = "ws://localhost:8000/";
var output;

function init() {
    console.log("running websocket init");
    testWebSocket();
}

function testWebSocket() {
    websocket = new WebSocket(wsUri);
    websocket.onopen = function(evt) { onOpen(evt) };
    websocket.onclose = function(evt) { onClose(evt) };
    websocket.onmessage = function(evt) { onMessage(evt) };
    websocket.onerror = function(evt) { onError(evt) };
}

function onOpen(evt) {
    console.log("Connected websocket doodad");
    doSend("WebSocket testatron");
}

function onClose(evt) {
    console.log("Disconnected websocket doodad");
}

function onMessage(evt) {
    console.log("Response is " + evt.data);
    websocket.close();
}

function onError(evt) {
    console.log("Error was " + evt.data);
}

function doSend(message) {
    console.log("Sent " + message);
    websocket.send(message);
}

})

({});
