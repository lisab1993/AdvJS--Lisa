const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

//import routes
const authRoutes = require('./routes/auth.routes')
const squawkRoutes = require('./routes/squawk.routes')

//initialize dotenv
const envPath = path.resolve(__dirname, "../../.env");
dotenv.config({
  path: envPath,
});

console.log(process.env.ENV);

//initialize express app
const app = express();

//middleware
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

//routes
app.use('/auth', authRoutes)
app.use('/squawk', squawkRoutes)

//connect to db
const connectDatabase = async (dbName = process.env.DB_NAME) => {
  const connection = await mongoose.connect(`mongodb://localhost/${dbName}`);
  if (process.env.ENV !== "test") {
    console.log(`Connected to mongodb://localhost/${dbName}`);
  }
  return connection;
};


//start the server
const startServer = async() => {
    app.listen(process.env.API_PORT, async() => {
        await connectDatabase()
        if (process.env.ENV !== 'test') {
            console.log(`Server listening on port ${process.env.API_PORT} 🚀`)
        }
    })   
}

module.exports = {
    app,
    connectDatabase,
    startServer
}