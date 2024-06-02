import mongoose, {Schema} from "mongoose"

const assignmentSchema = new Schema({
  title: {
    type: String,
    required: true,
    default: ""
  },
  description: {
    type: String,
    default: ""
  },
  classId: {
    type: mongoose.Types.ObjectId,
    ref: "Class",
    default: ""
  },
  submittedBy: [{
    type: mongoose.Types.ObjectId,
    ref: "Student",
    default: []
  }],
  dueDate: {
    type: String,
  },
  attachmentId: [
    {type: String, default: ""}
  ], 
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "Teacher",
    default: ""
  }
}, {timestamps: true})

export const Assignment = mongoose.models.assignments || mongoose.model("assignments", assignmentSchema)