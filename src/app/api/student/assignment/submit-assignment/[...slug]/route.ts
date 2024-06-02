import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Assignment } from "@/models/assignment.model";
import { Student } from "@/models/student.model";
import connectDb from "@/config/dbConfig";
import mongoose from "mongoose";
import { Types } from "mongoose";

interface RequestProps {
  attachmentIds: string[];
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string[] } }
) {
  await connectDb();

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const [userId, assignmentId] = params.slug;

    // Check if assignmentId is a valid ObjectId
    if (!Types.ObjectId.isValid(assignmentId)) {
      throw new Error("Invalid assignmentId format");
    }

    // Parse JSON request body with error handling
    let requestBody: RequestProps;
    try {
      requestBody = await request.json();
    } catch (error) {
      throw new Error("Invalid JSON payload");
    }

    const { attachmentIds } = requestBody;

    // Update the specific assignment in the student's assignments array
    const student = await Student.findOneAndUpdate(
      { userId},
      {
        $set: {
          "assignments.$.isCompleted": true,
          "assignments.$.attachmentIds": attachmentIds,
        },
      },
      { new: true, session }
    );

    // const student = await Student.findOne({userId})

    if (!student) {
      await session.abortTransaction();
      return NextResponse.json({
        message: "Student or assignment not found",
        success: false,
      }, { status: 404 });
    }



    // Update the submittedBy field in the Assignment collection
    const assignment = await Assignment.findByIdAndUpdate(
      assignmentId,
      {
        $push: { submittedBy: student._id },
      },
      { new: true, session }
    );

    if (!assignment) {
      await session.abortTransaction();
      return NextResponse.json({
        message: "Assignment not found",
        success: false,
      }, { status: 404 });
    }

    await session.commitTransaction();
    session.endSession();

    return NextResponse.json({
      message: "Assignment submitted successfully",
      success: true,
      assignment: student.assignments.find((a:any) => a.assignmentId.equals(assignmentId)),
    });
  } catch (error: any) {
    await session.abortTransaction();
    session.endSession();
    console.error(error);
    return NextResponse.json({
      message: error.message || "Error while submitting the assignment",
      success: false,
      error: error.message || "Unknown error",
    }, { status: 500 });
  }
}
