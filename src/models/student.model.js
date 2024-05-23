import mongoose, { Schema } from "mongoose";

const studentSchema = new Schema(
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
		achievements: [{ type: String }],
		subject: [
			{
				type: mongoose.Types.ObjectId,
				ref: "Subject",
				grade: String,
			},
		],
		classRank: {
			type: String,
		},
		assignments: [{ type: mongoose.Types.ObjectId, ref: "Assignment" }],
		parentId: [
			{
				type: mongoose.Types.ObjectId,
				ref: "Parent",
				relationShip: String,
			},
		],
	},

	{ timestamps: true }
);

export const Student =
	mongoose.models.students || mongoose.model("students", studentSchema);
