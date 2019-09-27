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
  //let flag = false;
  socket.write('Hello client! Please enter a file you would like to retrieve: \n>');
  let fileName;
  // });

  socket.on('data', (data) => {
    fileName = String(data).trim();

    // if (!fileName.includes(".txt")) {
    //   fileName += ".txt"
    // }
    console.log(`Looking for file ${fileName}`);

    //Find the file within the /data-files subdirectory

    const findFile = function(file, callback) {
      let fileType = file.split('.')[1];
      let enc;
      switch (fileType) {

        case 'pdf':
          enc = "ascii";
          break;
        case 'jpg':
          enc = "base64";
          break;
        default:
          enc = "utf8";
          break;
      }

      console.log(`Filetype is ${fileType}, encoding it with ${enc}`);


      fs.readFile(`./data-files/${file}`, enc, (error, data) => {
        if (!error) {
          callback(data);
        } else {
          console.log("The file does not exist!");
          callback("The file does not exist, please try again.\n");
        }

      });
      //Send it back
    }

    findFile(fileName, (data) => {

      //socket.write("data incoming");
      //socket.fush
      socket.write(data);
      // socket.write("\n Would you like another file? If so enter it, otherwise press ctrl+c to exit: \n>");
    });



  });

}).listen(3000);

