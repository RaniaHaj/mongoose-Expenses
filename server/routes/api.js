const express = require("express");
const moment = require("moment");
const router = express.Router();
const app = express();
const Expense = require("../model/Expense");

router.get("/expenses", function (req, res) {
  const d1 = moment(req.query.d1).format("YYYY-MM-DD");
  const d2 = req.query.d2
    ? moment(req.query.d2, "YYYY-MM-DD")
    : moment().format("YYYY-MM-DD");
  if (d1) {
    Expense.find({
      $and: [{ date: { $gte: d1 } }, { date: { $lt: d2 } }],
    })
      .sort({ date: "asc" })
      .then((expenses) => {
        res.send(expenses);
      });
  } else {
    Expense.find({}).then((expenses) => {
      res.send(expenses);
    });
  }
});

router.post("/expense", function (req, res) {
  let e = new Expense(req.body);
  let date = req.body.date
    ? moment(req.body.date, "YYYY-MM-DD")
    : moment().format("YYYY-MM-DD");
  e.date = date;
  e.save().then(function () {
    console.log(`amount of Expense: ${e.amount} we spent money on ${e.item}`);
  });
  res.status(201).send(e);
});

router.put("/update", function (req, res) {
  Expense.findOneAndUpdate(
    { group: req.body.group1 },
    { $set: { group: req.body.group2 } }
  )
    .then(function (expense) {
      res.send(`Expense ${expense.item} updated to group ${req.body.group2}`);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.get("/expenses/:group", function (req, res) {
  const total = req.query.total;
  const group = req.params.group;
  if (total === "true") {
    Expense.aggregate([
      {
        $match: { group: group },
      },
      {
        $group: {
          _id: "$group",
          total: { $sum: "$amount" },
        },
      },
    ]).then(function (total) {
      res.send(total);
    });
  } else {
    Expense.find({
      group: group,
    }).then(function (expenses) {
      res.send(expenses);
    });
  }
});
module.exports = router;
