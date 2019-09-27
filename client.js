const net = require('net');
const readline = require(`readline`);
const fs = require('fs');

let flag = false;

const connect = function() {
  const conn = net.createConnection(
    {
      host: 'localhost', //'172.46.3.232', // change to IP address if connecting to another computer
      port: 3000
    });

  
  conn.setEncoding('utf8'); // interpret data as text
  // conn.setEncoding('ascii'); // interpret data as text
  // conn.setEncoding('base64'); // interpret data as text

  conn.on('connect', () => {
    // conn.write('Hello from client!');
    // console.log("enter file name:\n");
    // conn.setEncoding('utf8');
  });

  conn.on('data', (data) => {


    fs.writeFile('./received.txt', data,'base64', (err) => {
      if (err) {
        // Handle error
        console.log("Failed to write to file. File path invalid");
        return;
      }
    });
    // if (flag) {
    //   flag = false;
    // } else {
    //   console.log('Server says: ', data);
    // }
    // if (data === "data incoming") {
    //   flag = true;
    // }
  });

  return conn;
};


const setupInput = function(conn) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.on('line', (data) => {
    conn.write(data);
  });


  // return stdin;
};

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
