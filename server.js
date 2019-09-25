const net = require('net');

const server = net.createServer();

server.on('connection', (client) => {
  console.log('New client connected!');
  client.write('What file would you like?');
  client.setEncoding('utf8'); // interpret data as text
});

server.listen(3000, () => {
  console.log('Server listening on port 3000!');
});

server.on('data', (client) => {
  client.on('data', (data) => {
    console.log('Message from client: ', data)
  });
})