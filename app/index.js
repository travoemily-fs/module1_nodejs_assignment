const express = require("express");
const app = express();
const router = require("./routes/index");

app.use(express.json());

// basic GET method
app.get("/", (req, res) => {
  console.log("GET");
  res.json({ message: "hello world" });
});

app.use("/api", router);
// error handling
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  // console.log("ERROR >>>", err);
  res
    .status(err.status || 500)
    .json({ message: err.message, status: err.status });
});

// end error handing

module.exports = app;
