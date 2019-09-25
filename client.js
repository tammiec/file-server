const net = require('net');

const connect = function() {
  const conn = net.createConnection({ 
    host: '172.46.0.146', // change to IP address if connecting to another computer
    port: 3000
  });
  
  conn.setEncoding('utf8'); // interpret data as text
  
  conn.on('data', (data) => {
    console.log('Server says: ', data);
  });
  
  conn.on('connect', () => {
    conn.write('Hello from client!');
  });
  return conn;
}

module.exports = { connect };