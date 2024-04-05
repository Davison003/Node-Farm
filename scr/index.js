const fs = require("fs");
const http = require("http");
const url = require("url");

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

const server = http.createServer(function (req, res) {
  console.log(req.headers);

  const pathName = req.url;

  if (pathName === "/" || pathName === "/overview") {
    res.end("Welcome, this is the overview page");
  } else if (pathName === "/product") {
    res.end("You're seeing a product");
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-header": "hello there",
    });
    res.end(`<h1>Page not Found! - ${pathName}</h1>`);
  }
  //   res.end("hello there");
});

server.listen(8000, "localhost", () => {
  console.log(`Server listening for requests`);
});
