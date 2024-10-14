const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const userrouter = require("./router/user");
const taskrouter = require("./router/task");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyparser.json());
app.get('/', (req, res) => {
  res.send({ status: "Welcome" });
});
app.use("/api/user", userrouter);
app.use("/api/tasks", taskrouter);

app.listen(3010, () => {
  console.log("Server is running on port no 3010");
});

const dburl = "mongodb+srv://aniketkarangale75:J747vYAqf8EU0p4M@cluster0.4japkbu.mongodb.net/TaskDB?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(dburl).then(() => {
  console.log("DB connected")
})
