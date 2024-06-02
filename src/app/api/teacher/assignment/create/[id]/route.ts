import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectDb from "@/config/dbConfig";
import { Assignment } from "@/models/assignment.model";
import { Student } from "@/models/student.model";
import { Class } from "@/models/class.model";

// Define the expected request body types
interface RequestBodyTypes {
  title: string;
  description: string;
  className: string;
  section: string
  dueDate?: string;
  attachmentId?: string;
}

export async function POST(request: NextRequest, {params}: {params: {id: string}}) {
  // Connect to the database
  connectDb();

  try {
    // Parse the request body
    const reqBody: RequestBodyTypes = await request.json();
    const { title, description, className, dueDate, attachmentId, section } = reqBody;
    const {id} = params

    // Find the class by className
    const foundClass = await Class.findOne({ className, section });

    // If class not found, return a 404 response
    if (!foundClass) {
      return NextResponse.json(
        {
          message: "No class found",
          success: false,
        },
        { status: 404 }
      );
    }

    // Create a new assignment
    const newAssignment = new Assignment({
      title,
      description,
      classId: foundClass._id,
      dueDate,
      attachmentId: [attachmentId],
      createdBy: id
    });

    // Save the new assignment
    const savedAssignment = await newAssignment.save();

    // Get IDs of all students in the class
    const studentIds = foundClass.studentIds;

    // Update all students in the class with the assignment ID
    const updatedStudent = await Student.updateMany(
      { _id: { $in: studentIds } },
      { $push: { assignments: newAssignment._id } }
    );

    // Return success response
    return NextResponse.json(
      {
        message: "Assignment created and associated with students",
        success: true,
        assignment: savedAssignment,
      },
      { status: 201 }
    );
  } catch (error: any) {
    // Return error response if any error occurs
    return NextResponse.json(
      {
        message: "Error while saving the Assignment",
        success: false,
        error,
      },
      { status: 500 }
    );
  }
}
