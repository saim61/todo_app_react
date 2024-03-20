const app = require("./app");
const http = require("http");

const server = http.createServer(app);
const startServer = async () => {
  server.listen(process.env.PORT, () =>
    console.log(`server listening on port: ${process.env.PORT}`)
  );
};

startServer();
