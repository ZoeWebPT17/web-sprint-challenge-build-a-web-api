const server = require("./server");

let port = process.env.PORT;
if (port == null || port == "") {
  port = 7000;
}

server.listen(port, () => console.log("API IS WORKING"));
