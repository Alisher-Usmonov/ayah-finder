import mongoose from "mongoose";
import ENV from "../../env.config.js";

export default async function () {
  try {
    await mongoose.connect(ENV.DB_URL);
    console.log("%cDATABASE CONNECTED", "color: green;");
  } catch (err) {
    console.log("%cDATABASE CONNECTION FAILED", "color: red;");
    console.log(err);
  }
}
