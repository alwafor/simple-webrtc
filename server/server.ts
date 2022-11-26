import express from "express";
const server = express();
const PORT = 5000;

server.listen(PORT, () => {
  console.log("Server listens on port ", PORT);
});
