const fs = require("fs");
// Syschronous Reading
// let file = fs.readFileSync("./Files/input.txt", "utf-8");
// console.log(file);

// const content = `This file: "${file}" was read from input.txt. \n Created: ${new Date()} `;
// fs.writeFileSync("./Files/output.txt", content);

fs.readFile("./Files/Star.txt", "utf-8", (error1, data1) => {
  console.log(data1);
  fs.readFile(`./Files/${data1}.txt`, "utf-8", (error2, data2) => {
    console.log(data2);
    fs.readFile("./Files/append.txt", "utf-8", (error3, data3) => {
      console.log(data3);
      const content = `${data1}\n\n${data2}\n\n${data3}\n\n Created: ${new Date()}`;
      fs.writeFile("./Files/output.txt", content, () => {
        console.log("File written successfully");
      });
    });
  });
});

console.log("Reading file...");
