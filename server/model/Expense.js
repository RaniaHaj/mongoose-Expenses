const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const expenseSchema = new Schema({
  item: String,
  date: Date,
  amount: Number,
  group: String,
});

const Expense = mongoose.model("expense", expenseSchema);
module.exports = Expense;
