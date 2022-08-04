import { json, urlencoded } from "body-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { createConnection } from "./db-init/dbConn";
import logger, { httpLogger } from "./utils/logger";

const app = express();

app.set("trust-proxy", 1);

// Block all unwanted headers using helmet
app.use(helmet());

// Disable x-powered-by header separately
app.disable("x-powered-by");

//setup server
app.use(cors());
app.use(json());
app.use(
  urlencoded({
    extended: false,
  })
);

//Disables caching
app.disable("etag");

app.use(
  morgan("common", {
    stream: {
      write: (message) => httpLogger.http(message),
    },
    skip: (req, _res) => req.baseUrl?.includes("health-check"),
  })
);

// check if port exists in the environment
const port = process.env.PORT || 5000;

// if the environment is test, do not start the server
if (process.env.NODE_ENV !== "test") {
  createConnection();
  app
    .listen(parseInt(port.toString()), "0.0.0.0", () => {
      //Listen the express server on the given port and log a message to the logs
      logger.info(`Server is listening on port ${port}`);
    })
    .on("error", (err: any) => {
      // in case of any error, log the error to the logs
      logger.error(JSON.stringify(err));
    });
}
