const http = require("http");
require("dotenv").config();
const app = require("./app/index")
const server = http.createServer(app);

server.listen(process.env.PORT, () => {
  console.log(`Service is up! Listening on ${process.env.PORT}`);
});
