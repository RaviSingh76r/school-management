import mongoose, {Schema} from "mongoose"

const assignmentSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  classId: {
    type: mongoose.Types.ObjectId,
    ref: "Class"
  },
  submittedBy: [{
    type: mongoose.Types.ObjectId,
    ref: "Student"
  }],
  dueDate: {
    type: string,
  },
  attachmentId: [
    {type: String}
  ]
}, {timestamps: true})

export const Assignment = mongoose.models.assignments || mongoose.model("assignments", assignmentSchema)