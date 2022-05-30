var express = require("express");
var app = express();
var bodyParser = require("body-parser");
const db = require("./Database");
var flash = require("express-flash");
var cors = require("cors");

app.use(cors());

app.use(express.json());
// parse application/json
app.use(bodyParser.json());

// app.get("/", function (req, res) {
//   db.query("select * from users", function (err, result) {
//     if (err) {
//       res.send({
//         message: "failed",
//       });
//     }
//     res.send({
//       data: result,
//       message: "success",
//     });
//   });
// });
app.get("/addadmin", function (req, res) {
  db.query(
    `insert into users(name,password,userType) values('','','admin')`,
    function (err, result) {
      if (err) {
        res.send({
          message: "failed",
        });
      }
      res.send({
        data: result,
        message: "success",
      });
    }
  );
});
app.post("/adduser", function (req, res) {
  console.log(req.body);
  db.query(
    `insert into users(name,password,userType) values("${req.body.user}", "${req.body.password}", "${req.body.userType}")`,
    function (err, result) {
      if (err) {
        res.send({
          message: "failed",
        });
      }
      res.send({
        data: result,
        message: "success",
      });
    }
  );
});
app.get("/showAllUser", function (req, res) {
  db.query(`select * from users`, function (err, result) {
    if (err) {
      res.send({
        message: "failed",
      });
    }
    res.send({
      data: result,
      message: "success",
    });
  });
});

app.get("/", function (req, res, next) {
  res.render("contact-us", { title: "Contact-Us" });
});

app.post("/addstu", function (req, res, next) {
  //var id = req.body.id;
  console.log(req.body);
  var username = req.body.name;
  var password = req.body.password;
  var userType = req.body.userType;

  var sql = `INSERT INTO users (name, password, userType) VALUES ("${username}", "${password}", "${userType}")`;
  db.query(sql, function (err, result) {
    if (err) {
      console.log(err.message);
      throw err;
    }
    console.log("record inserted");
    // req.flash("success", "Data added successfully!");
    // res.redirect("/");
  });

  res.send({ message: "ok" });
});

app.get("/getAllBuses", function (req, res) {
  var sql = `select * from buses `;

  db.query(sql, function (err, result) {
    if (err) {
      console.log(err.message);
      throw err;
    }
    console.log("tables shown");
    res.send({ message: "ok", result });
  });
});

app.post("/addbuses", function (req, res, next) {
  console.log(req.body);
  // var id = req.body.id;
  var routeNo = req.body.Route;
  var starting_point = req.body.startingDes;
  var destination_point = req.body.endindDes;

  var sql = `INSERT INTO buses (routeNo, starting_point, destination_point) VALUES ("${routeNo}", "${starting_point}", "${destination_point}")`;
  db.query(sql, function (err, result) {
    if (err) {
      console.log(err.message);
      throw err;
    }
    console.log("record inserted");
    // req.flash("success", "Data added successfully!");
    // res.redirect("/");
  });

  res.send({ message: "ok" });
});

app.get("/alterbus", function (req, res, next) {
  var sql = `ALTER TABLE buses MODIFY id int AUTO_INCREMENT`;

  db.query(sql, function (err, result) {
    if (err) {
      console.log(err.message);
      throw err;
    }
    console.log(" altered table ");
  });
  res.send({ message: "ok" });
});

app.post("/login", function (req, res, next) {
  console.log(req.body);
  var username = req.body.name;
  var password = req.body.password;

  var sql = `select * from users where name = "${username}" and password = "${password}"`;

  db.query(sql, function (err, result) {
    if (err) {
      console.log(err.message);
      throw err;
    } else {
      console.log(result);
      if (result.length < 1) {
        res.status(200).send({ message: "user not found" });
      } else {
        res.status(200).send({
          message: "user logged in",
          data: { userType: result[0]?.userType, name: result[0]?.name },
        });
      }
    }
    console.log("registered user");
  });
});

var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port);
});

function createTable() {
  var sql = `create table driver (name varchar(255), routeNo int);`;

  db.query(sql, function (err, result) {
    if (err) {
      console.log(err.message);
      throw err;
    }
    console.log(" table created ");
  });
}

app.post("/addDriver", function (req, res, next) {
  console.log(req.body);
  var name = req.body.name;
  var routeNo = req.body.routeNo;

  var sql = `insert into driver(name, routeNo) values("${name}","${routeNo}")`;

  db.query(sql, function (err, result) {
    if (err) {
      console.log(err.message);
      res.send({ message: "failed to send" });
      throw err;
    } else {
      res.send({ message: "data inserted" });
    }
    console.log(" table created ");
  });
});

app.get("/getAllDriver", function (req, res, next) {
  var sql = `select *from driver`;

  db.query(sql, function (err, result) {
    if (err) {
      console.log(err.message);
      throw err;
    }
    console.log("tables shown");
    res.send({ message: "ok", result });
  });
});

app.get("/getDesBus", function (req, res, next) {
  console.log(req.query);
  var destination_point = req.query.destination;

  var sql = `select routeNo, starting_point, destination_point from buses where destination_point = "${destination_point}"`;

  db.query(sql, function (err, result) {
    if (err) {
      console.log(err.message);
      throw err;
    }
    console.log("tables shown");
    res.send({ message: "ok", result });
  });
});

//createTable()
