import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			index: true,
			lowercase: true,
			unique: true,
			default: "",
		},
		firstName: {
			type: String,
			required: true,
			default: "",
		},
		lastName: {
			type: String,
			required: true,
			default: "",
		},
		email: {
			type: String,
			required: true,
			index: true,
			lowercase: true,
			unique: true,
			default: "",
		},
    phoneNumber: {
      type: String,
      default: ""
    },
    gender: {
      type: String,
      enum: ["male", "female", "none"],
      default: "none"
    },
		password: {
			type: String,
			required: true,
			default: "",
		},
		role: {
			type: String,
			required: true,
			enum: ["student", "teacher", "principal", "parent", "none"],
			default: "none",
		},
		avatarUri: {
			type: String,
			default: "",
		},
		loggedInDevices: [
			{
				type: String,
				default: "",
			},
		],
    forgotPasswordToken: {
      type: String,
      default: ""
    },
    forgotPasswordTokenExpiry: {
      type: String,
      default: ""
    }
	},
	{ timestamps: true }
);

export const User =
	mongoose.models.users || mongoose.model("users", userSchema);
