import dotEnv from "dotenv";

dotEnv.config();

export default {
  TOKEN: process.env.TOKEN,
};
