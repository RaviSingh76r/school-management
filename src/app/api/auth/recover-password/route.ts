import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import dbConnect from "@/config/dbConnect";
import {User} from "@/models/user.models"

// Import the email sending function

export async function POST(request: NextRequest){
  try {
    dbConnect()

    const {email} = await request.json()

    if(!email){
      return NextResponse.json({
        message: "ERROR! please provided neccesary information",
        success: false
      }, {status: 500})
    }

    const existingUser = await User.findOne({email}, {firstName: 1})

    if(!existingUser){
      return NextResponse.json({
        message: "User doesn't exist please register first",
        success: false
      }, {status: 404})
    }

    // Send the email to the email id

    // After check the response

    return NextResponse.json({
      message: "Email send, Go and reset your password",
      link: `/password/forgot-password/${existingUser._id}`,
      success: true,
      firstName: existingUser.firstName
    }, {status: 201})
  } catch (error:any) {
    return NextResponse.json({
      message: "Error while sending forgot password email",
      success: false,
      error
    }, {status: 500})
  }
}