use std::net::{TcpStream};
use std::io::{Read, Write};
use std::str::{from_utf8, Utf8Error};

fn main() -> Result<(), Utf8Error> {
    match TcpStream::connect("localhost:8000") {
        Ok(mut stream) => {
            println!("Successfully connected to server in port 8000");

            let msg = b"Hello!";

            stream.write(msg).unwrap();
            println!("Send \"{}\", awaiting reply...", from_utf8(msg)?);

            let mut data = [0 as u8; 6]; // using 6 byte buffer
            match stream.read_exact(&mut data) {
                Ok(_) => {
                    println!("Reply is \"{}\"", from_utf8(&data)?);    
                },
                Err(e) => {
                    println!("Failed to receive data: {}", e);
                }
            }
        },
        Err(e) => {
            println!("Failed to connect: {}", e);
        }
    }
    println!("Terminated.");
    Ok(())
}
