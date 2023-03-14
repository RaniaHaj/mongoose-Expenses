const express = require("express");
const moment = require("moment");
const router = express.Router();
const app = express();
const Expense = require("../model/Expense");

router.get("/expenses", function (req, res) {
  Expense.find({})
    .sort({ date: "asc" })
    .then(function (expenses) {
      res.send(expenses);
    });
});

router.post("/expense", function (req, res) {
  let e = new Expense(req.body);
  let date = req.body.date
    ? moment(req.body.date).format("LLLL")
    : moment().format("LLLL");
  e.date = date;
  e.save().then(function () {
    console.log(`amount of Expense: ${e.amount} we spent money on ${e.item}`);
  });
  res.status(201).send(e);
});

router.put("/update/:group1/:group2", function (req, res) {
  Expense.findOneAndUpdate(
    { group: req.params.group1 },
    { group: req.params.group2 }
  )
    .then(function (expense) {
      res.send(`Expense ${expense.item} updated to group ${req.params.group2}`);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
module.exports = router;
