const net = require('net');
const { setupInput } = require('./input');

//const connect = function() {
const conn = net.createConnection({
  host: '172.46.0.146', // change to IP address if connecting to another computer
  port: 3000
});

conn.setEncoding('utf8'); // interpret data as text

conn.on('data', (data) => {
  console.log('Server says: ', data);
});

conn.on('connection', (server) => {
  server.write('Hello from client!');
  server.setEncoding('utf8');
});
//return conn;
//}
//connect();
//setupInput(connect);

//module.exports = { connect };
