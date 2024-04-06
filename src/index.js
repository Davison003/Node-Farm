const fs = require("fs");
const http = require("http");
const url = require("url");

const replaceTemplate = require("./modules/replaceTemplate.js");
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

// Reading Files
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const productData = JSON.parse(data);

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/html/template-overview.html`,
  "utf-8"
);

const tempProduct = fs.readFileSync(
  `${__dirname}/templates/html/template-product.html`,
  "utf-8"
);

const tempCard = fs.readFileSync(
  `${__dirname}/templates/html/template-card.html`,
  "utf-8"
);

const server = http.createServer(function (req, res) {
  // console.log(req.headers);

  const { query, pathname } = url.parse(req.url, true);

  // overview page
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });

    const cardsHtml = productData
      .map((el) => replaceTemplate(tempCard, el))
      .join("");

    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);
    res.end(output);

    // product page
  } else if (pathname === "/product") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    const product = productData[query.id];
    const output = replaceTemplate(tempProduct, product);

    res.end(output);

    // api page
  } else if (pathname === "/api") {
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    res.end(data);

    // not found page
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-header": "hello there",
    });
    res.end(`<h1>Page not Found! - ${pathname}</h1>`);
  }
});

server.listen(8000, "localhost", () => {
  console.log(`Server listening for requests`);
});
