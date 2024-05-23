import mongoose, {Schema} from "mongoose";

const userSchema = new Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    index: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  role: {
    type: String,
    required: true,
    enum: ["student", "teacher", "parent"]
  }, 
  dateOfBirth: {
    type: Date,
  },
  phoneNumber: {
    type: String,
  },
  avatar: {
    type: String
  },
}, {timestamps: true})

export const User = mongoose.models.users || mongoose.model("users", userSchema)