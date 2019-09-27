var net = require('net');
let readline = require(`readline`);

const connect = function() {
  const conn = net.createConnection(
    {
      host: 'localhost', // change to IP address if connecting to another computer
      port: 3000
    });

  conn.setEncoding('utf8'); // interpret data as text

  conn.on('connect', () => {
    conn.write('Hello from client!');
    // conn.setEncoding('utf8');
  });

  conn.on('data', (data) => {
    console.log('Server says: ', data);
  }); //receives data from server?

  return conn;
}


const setupInput = function(conn) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.on('line', (data) => {
    conn.write(data);
  });


  // return stdin;
}

setupInput(connect()); //Needs return value of connect

// //module.exports = { connect };


/*
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

*/
