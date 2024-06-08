import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import dbConnect from "@/config/dbConnect";
import bcrypt from "bcryptjs";
import { User } from "@/models/user.models";

export async function POST(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		// Ensure database connection is established
		await dbConnect();

		const { id } = params;

		// Parse JSON body and handle potential errors
		let requestBody;
		try {
			requestBody = await request.json();
		} catch (jsonError) {
			return NextResponse.json(
				{
					message: "Invalid JSON body",
					success: false,
				},
				{ status: 400 }
			);
		}

		const { password } = requestBody;

		if (!password) {
			return NextResponse.json(
				{
					message: "Password is required",
					success: false,
				},
				{ status: 400 }
			);
		}

		const existingUser = await User.findOne({_id: id}, {password});

		if (!existingUser) {
			return NextResponse.json(
				{
					message: "No user found",
					success: false,
				},
				{ status: 404 }
			);
		}

		// Use asynchronous hashing for better performance
		const hashedPassword = await bcrypt.hash(password, 12);

		existingUser.password = hashedPassword;
		await existingUser.save();

		return NextResponse.json(
			{
				message: "Password changed successfully",
				success: true,
			},
			{ status: 200 }
		);
	} catch (error: any) {
		return NextResponse.json(
			{
				message: "ERROR! Something went wrong",
				success: false,
				error: error.message,
			},
			{ status: 500 }
		);
	}
}
