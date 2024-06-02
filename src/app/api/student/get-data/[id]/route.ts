import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectDb from "@/config/dbConfig";
import {Student} from "@/models/student.model"

export async function GET(request: NextRequest, {params}: {params: {id: string}}){
  connectDb()

  try {
    const id = params.id

    const student = await Student.findOne({userId: id}).select("-userId -classId -parentId -assignment")

    if(!student){
      return NextResponse.json({
        message: "Student doesn't exist please complete registration first",
        success: false
      }, {status: 404})
    }

    return NextResponse.json({
      message: "Student found",
      student,
      success: true
    }, {status: 201})
  } catch (error:any) {
    return NextResponse.json({
      message: "Error while acquiring student data",
      status: false,
      error
    }, {status: 500})
  }
}