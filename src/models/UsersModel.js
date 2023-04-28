import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
});

const UsersModel = mongoose.model("users", UsersSchema);

export default UsersModel;
