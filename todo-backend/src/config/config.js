var mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://CRISADMIN:B9BDwNhWH87Pgmxq@meanstudy-p1ioc.mongodb.net/node-mean?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connect Database");
  })
  .catch(() => {
    console.log("Connect Failed!!");
  });
