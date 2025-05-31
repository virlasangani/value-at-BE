const { format, createLogger, transports } = require("winston");
require("winston-daily-rotate-file");
const { combine, timestamp, label, prettyPrint } = format;
const CATEGORY = "API Logs";

const CustomLogger = createLogger({
  level: "debug",
  format: combine(
    label({ label: CATEGORY }),
    timestamp({
      format: "MMM-DD-YYYY HH:mm:ss",
    }),
    prettyPrint()
  ),
  transports: [
    new transports.DailyRotateFile({
      filename: "./logs/%DATE%-combined.log",
      datePattern: "DD-MM-YYYY",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
      json: true,
    }),
    new transports.DailyRotateFile({
      filename: "./logs/%DATE%-error.log",
      datePattern: "DD-MM-YYYY",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
      json: true,
      level: "error",
    }),
    new transports.Console(),
  ],
  exceptionHandlers: [
    new transports.File({
      filename: "./logs/exceptions.log",
    }),
    new transports.DailyRotateFile({
      filename: "./logs/%DATE%-exceptions.log",
      datePattern: "DD-MM-YYYY",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
      json: true,
    }),
  ],
  exitOnError: false,
});

module.exports = CustomLogger;
