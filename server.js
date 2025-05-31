const dotenv = require('dotenv');
const express = require('express');
const cors = require("cors");
const connectDB = require('./config/db');
const RequestAndResponseLogger = require("./common/RequestAndResponseLogger")
const Logger = require("./common/Logger")
dotenv.config();
const app = express();

//API Routes
const jobsRoutes = require("./routes/JobRoutes")

const PORT = process.env.PORT || 5000;
app.use(RequestAndResponseLogger)

if(!global.logger){
    global.logger = Logger
}

process.on("unhandledRejection", (error, promise) => {
  console.log(error);
  logger.error("Unhandled Rejection at: Promise", promise, "reason", error);
});

process.on("uncaughtException", (error) => {
  logger.error("Uncaught Exception", error);
});

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/jobs', jobsRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

