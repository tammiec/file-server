const net = require('net');
const readline = require(`readline`);
const fs = require('fs');
let fileName = "default";
let receivedVerification = false;

const connect = function() {
  const conn = net.createConnection(
    {
      host: 'localhost', //'172.46.3.232', // change to IP address if connecting to another computer
      port: 8080
    });


  //conn.setEncoding('utf8'); // interpret data as text
  // conn.setEncoding('ascii'); // interpret data as text
  // conn.setEncoding('base64'); // interpret data as text

  conn.on('connect', () => {
    //conn.write('Hello from client!');
    // console.log("enter file name:\n");
    // conn.setEncoding('utf8');
  });

  let bs;
  let fileIncoming = false; //True when we are starting to read a file

  conn.on('data', (data) => {
    let stringData = data.toString();//turns buffer to string for checking

    if (!fileIncoming) {
      bs = Buffer.from([]); //We need to store our content in a buffer (Buffer = Uint8Array, an array containing bytes (can be represented using to hexadecimal characters so will appear as "ff 56 af ..."" in the console)). When writing a buffer we are storing the literal bits the file. We need to be careful not to convert to a string or some other format o/w the writeFile may write the character symbols instead.

      if (stringData.slice(0, 5) === "X200X") { //This code signals a file is being sent
        fileIncoming = true;
        console.log("A file is incoming!");
        data = data.slice(5); //Get rid of the header content
      } else {
        console.log(data.toString());
      }
    }


    if (fileIncoming) {

      if (stringData.slice(stringData.length - 5, stringData.length) === "X400X") {//Checks if end of file
        fileIncoming = false;

        data = data.slice(0, data.length - 5); //Don't include the last part which was indicating the end of transmission

        bs = Buffer.concat([Buffer.from(bs), Buffer.from(data)]);

        fs.writeFile(`./incoming-files/${fileName}`, bs, { flag: 'a' }, (err) => {
          if (err) {
            // Handle error
            console.log("Failed to write to file. File path invalid");
            return;
          } else {
            console.log(`The file ${fileName} has successfully downloaded. Please type another file or press cntrl+c to exit`)
          }
        });
      }
      console.log("Packet received"); //This is just here for to show how many times the conn.on("data") is being called.

      bs = Buffer.concat([bs, data]);//Appends the data to the buffer to be written at the end of transmission
    }
  });

  conn.on("close", () => rl.close()); //Closes if the server is closed.
  return conn;
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


const setupInput = function(conn) {
  //This will trigger every time a new line is sent in by the user:
  rl.on('line', (data) => {
    if (!receivedVerification) { //Prevents multiple request form overwriting each other.
      fileName = data;//Saves the filename for later, this is where the output will be saved

      //TODO: Add logic that will prevent overwriting an existing file (delete if needed.)

      conn.write(data); //Sends the line to the server
    } else {
      console.log("Please wait for your last request to finish");
    }
  });
};

// The setup
setupInput(connect());
