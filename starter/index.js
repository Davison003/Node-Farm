const fs = require("fs");
const http = require("http");

//FILES

//Blocking, synchronous way

// const textIn = fs.readFileSync("./txt/input.txt", "utf8");
// const textOut = `This is info about the avocado: ${textIn}.\n Created on ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOut);
// console.log(textIn);

//Non-blocking, asynchronous way

// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     console.log(data2);
//   });
// });
// console.log("Will read file");

//SERVER

http.createServer(function (req, res) {
  res.end("hello there");
});
