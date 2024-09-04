const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://varunbhojane07:Varunbhojane07@varun-cluster.cv4xb.mongodb.net/todolist?retryWrites=true&w=majority&appName=Varun-cluster"
  )
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));
const User = mongoose.model("users", {
  username: String,
  password: String,
  taskid: String,
});
const tasks = mongoose.model("tasks", {
  tasks: [
    {
      description: String,
      completed: Number
    },
  ],
});
module.exports = { User, tasks };
