const NumberOfSockets = 2000;
// Include Nodejs' net module.
const { Socket } = require('dgram');
const Net = require('net');
// The port number and hostname of the server.
const port = 8000;
const host = 'localhost';

for(let x = 0;x < NumberOfSockets;x++){
    // Create a new TCP client.
    const client = new Net.Socket();
    // Send a connection request to the server.
    client.connect({ port: port, host: host }, () => {
        // If there is no error, the server has accepted the request and created a new 
        // socket dedicated to us.
        console.log('TCP connection established with the server.');

        // The client can now send data to the server by writing to its socket.
        let ax = 0;
        let i = setInterval(()=>{
            if(ax % 2 == 0)
                client.write('Hello, server');
            else
                client.write(`|Random Number: ${Math.round(Math.random() * 100)}|`.split("").reverse().join(""));
            // Request an end to the connection after the data has been received.
            if(++ax > 20) {
                clearInterval(i);
                client.end();
            }
        }, 100);
    });

    // The client can also receive data from the server by reading from its socket.
    client.on('data', function(chunk) {
        console.log(`Data received from the server: "${chunk.toString()}"`);


    });

    client.on('end', function() {
        console.log('Requested an end to the TCP connection');
    });
}
