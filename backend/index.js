const express = require("express");
const app = express();
const { User, tasks } = require("./db");
const jwt = require("jsonwebtoken");
const port = 3001;
const jwtpassword = "varunserver";
const cors = require("cors");
const {
  userexists,
  douserexists,
  jwtverification,
} = require("./middleware.js");
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000', // Allow only this origin
  methods: ['GET', 'POST'], // Allow these methods
  credentials: true // Enable cookies or other credentials
}));
app.post("/signup", userexists, async (req, res) => {
  const taskobj = await tasks.create({
    tasks: [],
  });
  await User.create({
    username: req.headers.username,
    password: req.headers.password,
    taskid: taskobj._id,
  });
  res.status(200).send("User created successfully");
});
app.post("/signin", douserexists, async (req, res) => {
  const token = jwt.sign(
    { username: req.headers.username, password: req.headers.password },
    jwtpassword
  );
  res.json({
    token: token,
  });
});
app.post("/puttasks", jwtverification, async (req, res) => {
  const username = req.username;
  const user = await User.findOne({ username: username });
 // console.log(req.body.description);
  await tasks.updateOne(
    { _id: user.taskid },
    {
      "$push": {
        tasks: {
          description: req.body.description,
          completed: 0,
        },
      },
    }
  );
  res.send("task added succssfully");
});
app.get("/mytasks", jwtverification, async (req, res) => {
    const username = req.username;
    const user = await User.findOne({ username: username });
    const data = await tasks.findById(user.taskid);
    res.json(data.tasks);
});
app.post("/mytasks/:id",jwtverification,async (req,res)=>{
  const username = req.username;
  const id = req.params.id;
  const user = await User.findOne({ username: username});
   await tasks.updateOne(
    { "_id": user.taskid, "tasks._id": id }, // Find the document and the specific task by description
    {
      $bit: { "tasks.$.completed": { xor: 1 } }, // Toggle the `completed` boolean field of the specific task
    }
  );
  res.status(200).send("done");
})
app.listen(port, () => {
  console.log(`app listing to ${port} port number`);
});
