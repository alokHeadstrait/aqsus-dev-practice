import mongoose from "mongoose";
import config from "config";
import logger from "../utils/logger";
const mongoUrl: string = config.get("AQSUS_MONGO_URL");

export let database: mongoose.Connection;

export const createConnection = async () => {
  const uri = "mongodb://localhost:27017/aqsus";

  if (database) {
    return;
  }

  await mongoose.connect(uri);
  database = mongoose.connection;
  database.once("open", async () => {
    logger.info("Connected to database");
  });
  database.on("error", (error) => {
    logger.error(
      `ALERT => Error while connecting to database \n ${JSON.stringify(error)}`
    );
  });
};

export const disconnect = async () => {
  if (!database) {
    return;
  }

  await mongoose.disconnect();
};
