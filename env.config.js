import dotEnv from "dotenv";

dotEnv.config();

export default {
  TOKEN: process.env.TOKEN,
  DB_URL: process.env.DB_URL,
};
