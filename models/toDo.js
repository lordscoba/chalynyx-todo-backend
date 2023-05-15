const mongoose = require("mongoose");

const toDoSchema = mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      require: true,
    },
    status: {
      type: Boolean,
      require: true,
    },
  },
  { timestamps: true }
);

const ToDo = mongoose.model("todo", toDoSchema);
module.exports = ToDo;
