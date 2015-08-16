from geventwebsocket import WebSocketServer, WebSocketApplication, Resource
from collections import OrderedDict
from serial import Serial

serialPortFile = "/dev/cu.wchusbserial1420"

class EchoApplication(WebSocketApplication):
    def on_open(self):
        print "Connection opened"
        self.serialPort = Serial(serialPortFile, 9600, timeout = 1)

    def on_message(self, message):
        if message == None:
            return

        print "Got message: ", message
        if message == "LED On":
            self.serialPort.write('l')
            self.serialPort.flush()
        if message == "LED Off":
            self.serialPort.write('k')
            self.serialPort.flush()

        self.ws.send(message)

    def on_close(self, reason):
        self.serialPort.close()
        print "Closing", reason

apps = OrderedDict()
apps["/"] = EchoApplication

WebSocketServer( ('', 8000),
                 Resource(apps),
                 ).serve_forever()
