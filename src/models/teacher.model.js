import mongoose, { Schema } from "mongoose";

const teacherSchema = new Schema(
	{
		userId: {
			type: mongoose.Types.ObjectId,
			ref: "User",
			required: true,
		},
		classId: {
			type: mongoose.Types.ObjectId,
			ref: "Class",
		},
		attendance: [
			{
				isHoliday: Boolean,
				isPresent: Boolean,
				Date: Date,
			},
		],
		createdAssignment: [{ type: mongoose.Types.ObjectId, ref: "Assignment" }],
		subjectTaught: [{ type: mongoose.Types.ObjectId, ref: "Subject" }],
		achievements: [{ type: String }],
	},
	{ timestamps: true }
);

export const Teacher =
	mongoose.models.teachers || mongoose.model("teachers", teacherSchema);
