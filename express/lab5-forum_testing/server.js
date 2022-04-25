const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

const AuthRoutes = require("./routes/authRoutes");
const BoardRoutes = require("./routes/boardRoutes");
const PostRoutes = require("./routes/postRoutes");

const app = express();


//middleware
//don't log everything on tests; keeps everything clean
//another way to write if statement
if (process.env.ENV !== "test") app.use(morgan("tiny"));

app.use(cors());
app.use(express.json());

//routes
app.use("/auth", AuthRoutes);
app.use("/board", BoardRoutes);
app.use("/post", PostRoutes);

const connectDB = async (dbName) => {
  try {
    const connection = await mongoose.connect(
      `mongodb://localhost/${dbName}`
    );
    if (process.env.ENV !== "test") {
      console.log(`connected to ${dbName}`);
    return connection
    }
  } catch (err) {
    console.log(err);
  }
};

const startServer = async(port = 5050, hostname = 'localhost') => {
  await connectDB('lisaForumTest5')
  app.listen(port, hostname, () => {
    console.log(`Listening at ${hostname}:${port}!!!`);
  });
}

//comment this out during testing, otherwise it goes to the wrong db
// startServer()


//for tests
module.exports = {
  app,
  connectDB,
  startServer
};
