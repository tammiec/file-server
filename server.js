const net = require('net');
const fs = require(`fs`);


net.createServer(function(socket) {
  let fileName;

  socket.on('data', (data) => {
    fileName = String(data).trim();

    const findFile = function(file, callback) {
      console.log(`User has requested ${file}. sending now...`);

      //Reads file with a specific encoding
      fs.readFile(`./data-files/${file}`, (error, data) => {
        if (!error) {
          console.log(`File has been sent successfully!`);
          callback(error, data);
        } else {
          console.log("The file did not exist!");
          callback(error, "The file does not exist, please try again.\n");
        }

      });
    };

    findFile(fileName, (error, data) => {
      if (error) {
        socket.write(data);
      } else {
        //We need to append some text at the beginning and at the end of the buffer to show that it is a file that should be saved. The client side code will be looking for this signature
        //This is analagous to how HTTP works, each request made will specify the filetypes expected, the server will send a response header that will indicate the type of information and size of information that will be received. This is essentially how a protocol works
        // We can define our own protocols. Some common models are to include some "Start" bits, a "payload length" bit, a checksum, and then a payload.
        let bs = Buffer.concat([Buffer.from("X200X"), data, Buffer.from("X400X")]);
        socket.write(bs);
      }
    });



  });

}).listen(8080);

