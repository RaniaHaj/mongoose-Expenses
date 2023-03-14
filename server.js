const express = require("express");
const app = express();
const api = require("./server/routes/api");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const mongoose = require("mongoose");
mongoose;
mongoose
  .connect("mongodb://localhost/expensesProject", { useNewUrlParser: true })
  .catch((err) => {
    console.log("error");
  });

app.use("/", api);

const port = 4200;
app.listen(port, function () {
  console.log(`Server running on port:${port}`);
});
