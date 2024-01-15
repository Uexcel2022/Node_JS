//CORE MODULES

// const readline = require('readline')
// const url = require('url')

const http = require("http");

const fs = require("fs");

const url = require("url");

//User Define Module

const replaceValue = require("./Modules/replaceHtml");

const user = require("./Modules/User");

// const server = http.createServer((request, response) => {
//   let { query, pathname } = url.parse(request.url, true);

//   // const servletPath = request.url.toLocaleLowerCase(); //before url persing
//   const servletPath = pathname.toLocaleLowerCase();

//   const html = fs.readFileSync("./Templates/index.html", "utf-8").toString();

//   const products = JSON.parse(fs.readFileSync("./Data/product.json", "utf-8"));
//   const productHtml = fs
//     .readFileSync("./Templates/product.html", "utf-8")
//     .toString();

//   const productDetailsHtml = fs
//     .readFileSync("./Templates/product_details.html", "utf-8")
//     .toString();

//   if (servletPath == "/" || servletPath == "/home") {
//     response.writeHead(200, {
//       "Content-Type": "text/html",
//     });
//     response.end(html.replace("{{%CONTENT%}}", "You are in the home page"));
//   } else if (servletPath == "/about") {
//     const about = fs.readFileSync("./Templates/about.html").toString();
//     response.writeHead(200, {
//       "Content-Type": "text/html",
//     });
//     response.end(html.replace("{{%CONTENT%}}", about));
//   } else if (servletPath == "/contact") {
//     const contact = fs.readFileSync("./Templates/contact.html").toString();
//     response.writeHead(200, {
//       "Content-Type": "text/html",
//     });
//     response.end(html.replace("{{%CONTENT%}}", contact));
//   } else if (servletPath == "/products") {
//     response.writeHead(200, {
//       "Content-Type": "text/html",
//     });
//     if (!query.id) {
//       let replacedHtml = products.map((prod) => {
//         return replaceValue(productHtml, prod);
//       });
//       response.end(html.replace("{{%CONTENT%}}", replacedHtml.join(" ")));
//     } else {
//       const product = products[query.id];
//       response.end(
//         html.replace("{{%CONTENT%}}", replaceValue(productDetailsHtml, product))
//       );
//     }
//   } else {
//     response.writeHead(400, {
//       "Content-Type": "text/html",
//     });
//     response.end(
//       html.toString().replace("{{%CONTENT%}}", "error 404: page not found!!!")
//     );
//   }
// });

// SERVER INHERITS FROM EVENTEMITTER

const server = http.createServer();

server.on("request", (request, response) => {
  // const servletPath = request.url.toLocaleLowerCase(); //before url persing

  let { query, pathname } = url.parse(request.url, true);

  const servletPath = pathname.toLocaleLowerCase();

  const html = fs.readFileSync("./Templates/index.html", "utf-8").toString();

  const products = JSON.parse(fs.readFileSync("./Data/product.json", "utf-8"));
  const productHtml = fs
    .readFileSync("./Templates/product.html", "utf-8")
    .toString();

  const productDetailsHtml = fs
    .readFileSync("./Templates/product_details.html", "utf-8")
    .toString();

  if (servletPath == "/" || servletPath == "/home") {
    response.writeHead(200, {
      "Content-Type": "text/html",
    });
    response.end(html.replace("{{%CONTENT%}}", "You are in the home page"));
  } else if (servletPath == "/about") {
    const about = fs.readFileSync("./Templates/about.html").toString();
    response.writeHead(200, {
      "Content-Type": "text/html",
    });
    response.end(html.replace("{{%CONTENT%}}", about));
  } else if (servletPath == "/contact") {
    const contact = fs.readFileSync("./Templates/contact.html").toString();
    response.writeHead(200, {
      "Content-Type": "text/html",
    });
    response.end(html.replace("{{%CONTENT%}}", contact));
  } else if (servletPath == "/products") {
    response.writeHead(200, {
      "Content-Type": "text/html",
    });
    if (!query.id) {
      let replacedHtml = products.map((prod) => {
        return replaceValue(productHtml, prod);
      });
      response.end(html.replace("{{%CONTENT%}}", replacedHtml.join(" ")));
    } else {
      const product = products[query.id];
      response.end(
        html.replace("{{%CONTENT%}}", replaceValue(productDetailsHtml, product))
      );
    }
  } else {
    response.writeHead(400, {
      "Content-Type": "text/html",
    });
    response.end(
      html.toString().replace("{{%CONTENT%}}", "error 404: page not found!!!")
    );
  }
});

server.listen(8080, "127.0.0.1", () => {
  console.log("Server has started");
});

//CUSTOM EVENT EMITTER DEMO

let myEmmiter = new user();

myEmmiter.on("create", (id, name) => {
  console.log(`New user Name: ${name} and id: ${id} created`);
});

myEmmiter.on("create", (id, name) => {
  console.log(`New user Name: ${name} and id: ${id} added to database`);
});

myEmmiter.emit("create", 5, "uexcel");
