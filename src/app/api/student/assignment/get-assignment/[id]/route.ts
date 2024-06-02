import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Custom MongoDB models
import { Student } from "@/models/student.model";
import { Assignment } from "@/models/assignment.model";

import connectDb from "@/config/dbConfig";

type Params = {
  params: {
    id: string;
  };
};

type StudentType = {
  userId: string;
  assignments: string[];
};

export async function GET(request: NextRequest, { params }: Params) {
  await connectDb();

  try {
    const { id } = params;

    const student: StudentType | null = await Student.findOne({ userId: id }).lean();

    if (!student) {
      return NextResponse.json({
        message: "Student doesn't exist",
        success: false,
      }, { status: 404 });
    }

    const assignmentIds = student.assignments;

    if (!assignmentIds || assignmentIds.length === 0) {
      return NextResponse.json({
        message: "No assignments are there",
        success: false,
      }, { status: 404 });
    }

    const assignments = await Assignment.find({ _id: { $in: assignmentIds } }).lean();

    return NextResponse.json({
      message: "Assignments successfully fetched",
      success: true,
      assignments,
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({
      message: "Error while fetching the assignments",
      success: false,
      error: error.message || "Unknown error",
    }, { status: 500 });
  }
}
