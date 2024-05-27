import mongoose, {Schema} from "mongoose";

const userSchema = new Schema({
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
  password: {
    type: String,
    required: true
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
  studentId: {
    type: mongoose.Types.ObjectId,
    ref: "Student"
  }
}, {timestamps: true})

export const User = mongoose.models.users || mongoose.model("users", userSchema)