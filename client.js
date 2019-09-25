// const net = require('net');
// const { setupInput } = require('./input');

// //const connect = function() {
// const conn = net.createConnection({
//   host: '172.46.0.146', // change to IP address if connecting to another computer
//   port: 3000
// });

// conn.setEncoding('utf8'); // interpret data as text

// conn.on('data', (data) => {
//   console.log('Server says: ', data);
// });

// conn.on('connection', (server) => {
//   server.write('Hello from client!');
//   server.setEncoding('utf8');
// });
// //return conn;
// //}
// //connect();
// //setupInput(connect);

// //module.exports = { connect };

var net = require('net');

var client = new net.Socket();
client.connect(3000, '172.46.0.146', function() {
	console.log('Connected');
	client.write('Hello, server! Love, Client.');
});

client.on('data', function(data) {
	console.log('Received: ' + data);
	client.destroy(); // kill client after server's response
});

client.on('close', function() {
	console.log('Connection closed');
});