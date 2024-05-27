import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Custom mongodb models
import { Student } from "@/models/student.model";
import { Class } from "@/models/class.model";

import connectDb from "@/config/dbConfig";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDb();
  
  try {
    const reqBody = await request.json();
    const { className, section } = reqBody;
    const { id } = params;

    // Validate request body
    if (!className || !section) {
      return NextResponse.json(
        { message: "className and section are required", success: false },
        { status: 400 }
      );
    }

    // Find or create class
    let foundClass = await Class.findOne({ className, section });
    if (!foundClass) {
      const newClass = new Class({
        className,
        section,
      });
      foundClass = await newClass.save();

      return NextResponse.json(
        {
          message: "Class created",
          success: true,
          foundClass,
        },
        { status: 201 }
      );
    }

    // Check if student already exists
    let foundStudent = await Student.findOne({ userId: id });
    if (foundStudent) {
      return NextResponse.json(
        {
          message: "Student already registered",
          success: false,
          foundStudent,
        },
        { status: 409 } // Conflict status code for existing resource
      );
    }

    // Create new student
    const newStudent = new Student({
      userId: id,
      classId: foundClass._id,
    });
    foundStudent = await newStudent.save();

    // Add student to class
    if (!foundClass.studentIds.includes(foundStudent._id)) {
      foundClass.studentIds.push(foundStudent._id);
    }
    await foundClass.save();

    return NextResponse.json(
      {
        message: "Student and Class saved successfully",
        success: true,
        foundClass,
        foundStudent,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Error while assigning student to class",
        success: false,
        error: error.message || error,
      },
      { status: 500 }
    );
  }
}
