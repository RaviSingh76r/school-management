import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Importing custom mongodb models
import { Class } from "@/models/class.model";
import { Teacher } from "@/models/teacher.model";

import connectDb from "@/config/dbConfig";

export async function POST(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	await connectDb();

	try {
		const { id } = params;
		const { className, section } = await request.json();

		if (!className || !section) {
			return NextResponse.json(
				{ message: "className and section are required", success: false },
				{ status: 400 }
			);
		}

		const existingTeacher = await Teacher.findOne({ userId: id });

		if (existingTeacher) {
			const updatedClass = await Class.findOneAndUpdate(
				{ className, section },
				{
					$set: { className, section },
					$addToSet: { teacherIds: existingTeacher._id }, // Avoid duplicates
				},
				{ upsert: true, new: true }
			).exec(); // Ensure the promise is resolved

			const updatedTeacher = await Teacher.findByIdAndUpdate(
				existingTeacher._id,
				{ classId: updatedClass._id },
				{ new: true }
			).exec();
			return NextResponse.json(
				{
					message: "Teacher created successfully",
					success: true,
					teacher: updatedTeacher,
					class: updatedClass,
				},
				{ status: 201 } // Conflict status code
			);
		}

		const newTeacher = new Teacher({ userId: id });
		const savedTeacher = await newTeacher.save();

		const updatedClass = await Class.findOneAndUpdate(
			{ className, section },
			{
				$set: { className, section },
				$addToSet: { teacherIds: savedTeacher._id }, // Avoid duplicates
			},
			{ upsert: true, new: true }
		).exec(); // Ensure the promise is resolved

		await Teacher.findByIdAndUpdate(
			savedTeacher._id,
			{ classId: updatedClass._id },
			{ new: true }
		).exec();

		return NextResponse.json(
			{
				message: "Teacher and Class saved successfully",
				success: true,
				class: updatedClass,
				teacher: savedTeacher,
			},
			{ status: 201 }
		);
	} catch (error: any) {
		return NextResponse.json(
			{
				message: "Error while saving the data",
				success: false,
				error: error.message || error,
			},
			{ status: 500 }
		);
	}
}
