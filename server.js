// const net = require('net');

// const server = net.createServer();

// server.on('connection', (client) => {
//   console.log('New client connected!');
//   client.write('What file would you like?');
//   client.setEncoding('utf8'); // interpret data as text
// });

// server.listen(3000, () => {
//   console.log('Server listening on port 3000!');

var net = require('net');
let fs = require(`fs`);


net.createServer(function(socket) {
  socket.write('Hello client!\n');
  let fileName;
  // });

  socket.on('data', (data) => {
    fileName = String(data).trim();
    if (!fileName.includes(".txt")) {
      fileName += ".txt"
    }
    console.log(`Looking for file ${fileName}`);

    //Find the file within the /data-files subdirectory

    const findFile = function(file, callback) {
      fs.readFile(`./data-files/${file}`, 'utf8', (error, data) => {
        if (!error) {
          callback(data);
        } else {
          console.log("The file does not exist!");
          callback(undefined);
        }

      });
      //Send it back
    }

    findFile(fileName, (data) => {
      socket.write(data);
    });



  });

}).listen(3000);

