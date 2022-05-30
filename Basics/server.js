var express = require("express");
const res = require("express/lib/response");
var app = express();

// app.set("view engine", "ejs");
// app.get("/", (req, res) => {
//   console.log("akhil");
//   res.render("index", { text: "world" });
// });

// const userRouter = require("./routes/users");

// app.use("/users", userRouter);

const requestTime = function (req, res, next) {
  req.requestTime = Date.now();
  next();
};

app.use(requestTime);

app.get("/Time", (req, res) => {
  let responseText = "Hello World!<br>";
  responseText += `<small>Requested at: ${req.requestTime}</small>`;
  res.send(responseText);
});

app.listen(3000);
