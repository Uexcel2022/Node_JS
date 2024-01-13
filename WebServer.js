const http = require("http");

const fs = require("fs");

const server = http.createServer((request, response) => {
  const path = request.url.toLocaleLowerCase();

  const html = fs.readFileSync("./Templates/index.html", "utf-8").toString();

  const product = JSON.parse(fs.readFileSync("./Data/product.json", "utf-8"));
  const productHtml = fs
    .readFileSync("./Templates/product.html", "utf-8")
    .toString();

  const productList = product.map((prod) => {
    let output = productHtml.replace("{{%IMAGE%}}", prod.productImage);
    output = output.replace("{{%NAME%}}", prod.name);
    output = output.replace("{{%PRICE%}}", prod.price);
    output = output.replace("{{%COLOR%}}", prod.color);
    output = output.replace("{{%SIZE%}}", prod.size);
    output = output.replace("{{%CAMERA%}}", prod.camera);
    output = output.replace("{{%PRICE%}}", prod.price);
    output = output.replace("{{%MODELNAME%}}", prod.modeName);
    output = output.replace("{{%MODELNO%}}", prod.modelNumber);
    output = output.replace("{{%ROM%}}", prod.ROM);
    output = output.replace("{{%DESC%}}", prod.Description);
    return output;
  });

  if (path == "/" || path == "/home") {
    response.writeHead(200, {
      "Content-Type": "text/html",
    });
    response.end(html.replace("{{%CONTENT%}}", "You are in the home page"));
  } else if (path == "/about") {
    const about = fs.readFileSync("./Templates/about.html").toString();
    response.writeHead(200, {
      "Content-Type": "text/html",
    });
    response.end(html.replace("{{%CONTENT%}}", about));
  } else if (path == "/contact") {
    const contact = fs.readFileSync("./Templates/contact.html").toString();
    response.writeHead(200, {
      "Content-Type": "text/html",
    });
    response.end(html.replace("{{%CONTENT%}}", contact));
  } else if (path == "/products") {
    response.writeHead(200, {
      "Content-Type": "text/html",
    });
    response.end(html.replace("{{%CONTENT%}}", productList.join(" ")));
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
