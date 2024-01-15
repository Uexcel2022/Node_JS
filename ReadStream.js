const fs = require("fs");
const http = require("http");

const server = http.createServer();
server.listen(8080, "127.0.0.1", () => {
  console.log("Server started on port:8080");
});

// //1ST SOLUTION WITHOUT USING READABLE AND WRITABLE STREAM DisAdvange wait until done writing

// server.on("request", (req, resp) => {
//   fs.readFile("./Files/largeFile.txt", (error, data) => {
//     if (error) {
//       resp.end("Something went wrong!!");
//     }
//     resp.end(data);
//   });
// });

//2ND SOLUTION: USING READABLE AND WRITABLE STREAM - Disadvange: Back pressure

// server.on("request", (req, resp) => {
//   const rs = fs.createReadStream("./Files/largeFile.txt");

//   rs.on("data", (chunk) => {
//     resp.write(chunk);
//   });

//   rs.on("end", () => {
//     resp.end();
//   });

//   rs.on("error", (error) => {
//     resp.end(error.message);
//   });
// });

//#3 SOLUTION: USING PIPE METHOD. available on only readable stream
//it allows input of a readable stream into a writable stream.

server.on("request", (req, resp) => {
  const rs = fs.createReadStream("./Files/largeFile.txt");
  rs.pipe(resp);
});

console.log("Nodemon is working");
