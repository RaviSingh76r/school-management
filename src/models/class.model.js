import mongoose, { Schema } from "mongoose";

const classSchema = new Schema(
	{
		className: {
			type: String,
			required: true,
		},
		section: {
			type: String,
			required: true,
		},
		studentIds: [{ type: mongoose.Types.ObjectId, ref: "Student" }],
		teacherIds: [
			{
				type: mongoose.Types.ObjectId,
				ref: "Teacher",
				isClassTeacher: Boolean,
			},
		],
		subjectIds: [{ type: mongoose.Types.ObjectId, ref: "Subject" }],
	},
	{ timestamps: true }
);

export const Class =
	mongoose.models.classes || mongoose.model("classes", classSchema);
