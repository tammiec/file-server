let connection;
//onst { connect } = require('./client');
//Updated comment
const setupInput = function(conn) {
  //console.log(connect);
  //let conn = connect();
  connection = conn();
  console.log(connection);

  const stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.setEncoding('utf8');
  stdin.resume();
  stdin.on('data', handleUserInput);
  return stdin;
};

const handleUserInput = function(input) {
  /* input.on('data', data => {
     connection.write(data);
   });*/
  if (input === "a") {
    connection.write(input);
  }

  console.log("here");
  // if (input === constants.MOVE_UP_KEY) {
  //   connection.write("Move: up");
  // };
  // if (input === constants.MOVE_LEFT_KEY) {
  //   connection.write("Move: left");
  // };
  // if (input === constants.MOVE_DOWN_KEY) {
  //   connection.write("Move: down");
  // };
  // if (input === constants.MOVE_RIGHT_KEY) {
  //   connection.write("Move: right");
  // };
  // for (let key in constants.MESSAGES) {
  //   if (input === key) {
  //     connection.write(`Say: ${constants.MESSAGES[key]}`);
  //   };
  // };
};

// setupInput();

module.exports = {
  setupInput
};

