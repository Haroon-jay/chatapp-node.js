import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const userSchema = new mongoose.Schema(
    {
      _id: {
        type: String,
        default: () => uuidv4().replace(/\-/g, ""),
      },
      firstName: String,
      lastName: String,
      email:String,
      phone:{
        type:String,
        required:true
      },
      password:String
    },
    {
      timestamps: true,
      collection: "users",
    }
  );

  
  export default mongoose.model("User", userSchema);