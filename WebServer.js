const http = require("http");

const fs = require("fs");

const url = require("url");

const server = http.createServer((request, response) => {
  let { query, pathname, path } = url.parse(request.url, true);

  // const servletPath = request.url.toLocaleLowerCase(); //before url persing
  const servletPath = pathname.toLocaleLowerCase();

  const html = fs.readFileSync("./Templates/index.html", "utf-8").toString();

  const products = JSON.parse(fs.readFileSync("./Data/product.json", "utf-8"));
  const productHtml = fs
    .readFileSync("./Templates/product.html", "utf-8")
    .toString();

  const productDetailsHtml = fs
    .readFileSync("./Templates/product_details.html", "utf-8")
    .toString();

  // const productList = product.map((prod) => {
  //   let output = productHtml.replace("{{%IMAGE%}}", prod.productImage);
  //   output = output.replace("{{%ID%}}", prod.id);
  //   output = output.replace("{{%NAME%}}", prod.name);
  //   output = output.replace("{{%PRICE%}}", prod.price);
  //   output = output.replace("{{%COLOR%}}", prod.color);
  //   output = output.replace("{{%SIZE%}}", prod.size);
  //   output = output.replace("{{%CAMERA%}}", prod.camera);
  //   output = output.replace("{{%PRICE%}}", prod.price);
  //   output = output.replace("{{%MODELNAME%}}", prod.modeName);
  //   output = output.replace("{{%MODELNO%}}", prod.modelNumber);
  //   output = output.replace("{{%ROM%}}", prod.ROM);
  //   output = output.replace("{{%DESC%}}", prod.Description);
  //   return output;
  // });

  function replaceValue(htmlPage, product) {
    let output = htmlPage.replace("{{%IMAGE%}}", product.productImage);
    output = output.replace("{{%ID%}}", product.id);
    output = output.replace("{{%NAME%}}", product.name);
    output = output.replace("{{%PRICE%}}", product.price);
    output = output.replace("{{%COLOR%}}", product.color);
    output = output.replace("{{%SIZE%}}", product.size);
    output = output.replace("{{%CAMERA%}}", product.camera);
    output = output.replace("{{%PRICE%}}", product.price);
    output = output.replace("{{%MODELNAME%}}", product.modeName);
    output = output.replace("{{%MODELNO%}}", product.modelNumber);
    output = output.replace("{{%ROM%}}", product.ROM);
    output = output.replace("{{%DESC%}}", product.Description);
    return output;
  }

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
