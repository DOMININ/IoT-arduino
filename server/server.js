const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(require('cors')());

const PORT = 5000;

const SerialPort = require('serialport');

let MyPort;

const parsers = SerialPort.parsers;
const parser = new parsers.Readline({ delimiter: '\r\n' });

SerialPort.list().then((ports) => {
  ports.forEach((port) => {
    if (port.manufacturer && port.manufacturer.includes('arduino')) {
      MyPort = port.path;
    }
  });

  port = new SerialPort(MyPort, {
    baudRate: 9600,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false,
  });

  port.pipe(parser);
});

io.on('connection', (socket) => {
  // Светодиод
  socket.on('lights', (data) => {
    port.write(data.status);
  });

  // Дальномер
  parser.on('data', (data) => {
    io.emit('data', data);
  });
});

http.listen(PORT, (err) => {
  if (err) {
    throw Error(err);
  }
  console.log('Сервер запущен на порту', PORT);
});
