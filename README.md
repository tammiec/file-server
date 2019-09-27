# file-server

This code is used for learning purposes. The objective is to create an interface whereby a client can connect to a TCP server and access data from a file server.

## how to use

To start the server use server.js. Any files you would like to share can be saved in a /data-files folder.


This code uses netcat for the client input and deals with commands using the server.js file. For PDFs the server will send the file encoded in ascii format, for .jpgs it will be encoded in base64, all other file formats will be encoded in utf8.

## old versions

client-old.js and input-old.js are previous workings of this code using a different approach. They are no longer in use for the final product.

## possible features
- A feature where the output of the stream is written to the client's file system 


## collaborators
[@tammiec](https://github.com/tammiec)
[@ThilakshanArulnesan](https://github.com/ThilakshanArulnesan)
[@TYLER-JM](https://github.com/TYLER-JM)
