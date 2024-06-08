import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import dbConnect from "@/config/dbConnect";
import { User } from "@/models/user.models";
import bcryptjs from "bcryptjs";

interface IRequestJsonItem {
	username: string;
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber?: string;
	password: string;
	role: string;
	avatarUri?: string;
}

export async function POST(request: NextRequest) {
	try {
		await dbConnect(); // Ensure database connection is established

		const requestBody = await request.json();
    console.log("Request Body: ", requestBody)
		const {
			username,
			email,
			firstName,
			lastName,
			password,
			role,
			avatarUri,
			phoneNumber,
		}: IRequestJsonItem = requestBody;

		// Validate request body
		if (!username || !email || !firstName || !lastName || !password || !role) {
			return NextResponse.json(
				{ message: "Incomplete user data", success: false },
				{ status: 400 }
			);
		}

		// Check if user already exists
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return NextResponse.json(
				{
					message: "User already exists. Please login.",
					success: false,
					user: existingUser,
				},
				{ status: 409 }
			);
		}

		// Hash password
		const hashedPassword = await bcryptjs.hash(password, 12);

		// Create new user
		const newUser = new User({
			username,
			email,
			firstName,
			lastName,
			password: hashedPassword,
			role,
			avatarUri,
			phoneNumber,
		});

		const savedUser = await newUser.save();

		return NextResponse.json({
			message: "User registered successfully",
			success: true,
			user: savedUser,
		});
	} catch (error: any) {
		console.error("Error while registering the user", error);
		return NextResponse.json(
			{ message: "Error while registering the user", success: false },
			{ status: 500 }
		);
	}
}
