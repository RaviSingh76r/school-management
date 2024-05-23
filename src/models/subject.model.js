import mongoose, { Schema } from "mongoose";

const subjectSchema = new Schema(
	{
		subjectName: {
			type: String,
			required: true,
		},
		code: {
			type: String,
		},
		classId: {
			type: mongoose.Types.ObjectId,
			ref: "Class",
		},
		studentIds: [{
			type: mongoose.Types.ObjectId,
			ref: "Student",
		}],
		taughtBy: {
			type: mongoose.Types.ObjectId,
			ref: "Teacher",
		},
	},
	{ timestamps: true }
);

export const Subject =
	mongoose.models.subjects || mongoose.model("subjects", subjectSchema);
