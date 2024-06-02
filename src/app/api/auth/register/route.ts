import { NextResponse, NextRequest } from "next/server";
import connectDb from "@/config/dbConfig";
import { User } from "@/models/user.model";
import { Student } from "@/models/student.model";
import { Teacher } from "@/models/teacher.model";
// import { Parent } from "@/models/parent.model";
import bcryptjs from "bcryptjs";

interface IRegistrationValue {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "student" | "teacher" | "parent";
}

async function registerUser(userDetails: IRegistrationValue): Promise<{ success: boolean, message: string, user?: any }> {
  try {
    connectDb();

    const { email, username, role } = userDetails;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return { success: false, message: "User already exists. Please login." };
    }

    // Hash password
    const hashedPassword = await bcryptjs.hash(userDetails.password, 12);

    // Create new user
    const newUser = new User({
      ...userDetails,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();

    // Create additional records based on role
    switch (role) {
      case "student":
        const existingStudent = await Student.findOne({ userId: savedUser._id });
        if (!existingStudent) {
          const newStudent = new Student({ userId: savedUser._id });
          await newStudent.save();
        }
        break;
      case "teacher":
        const existingTeacher = await Teacher.findOne({ userId: savedUser._id });
        if (!existingTeacher) {
          const newTeacher = new Teacher({ userId: savedUser._id });
          await newTeacher.save();
        }
        break;
      // case "parent":
      //   const existingParent = await Parent.findOne({ userId: savedUser._id });
      //   if (!existingParent) {
      //     const newParent = new Parent({ userId: savedUser._id });
      //     await newParent.save();
      //   }
      //   break;
    }

    return { success: true, message: "User registered successfully.", user: savedUser };
  } catch (error) {
    console.error("Error occurred while registering user:", error);
    return { success: false, message: "Something went wrong while registering user." };
  }
}

export async function POST(request: NextRequest) {
  try {
    const userDetails: IRegistrationValue = await request.json();

    const { success, message, user } = await registerUser(userDetails);

    return NextResponse.json({ message, success, user }, { status: success ? 200 : 400 });
  } catch (error) {
    console.error("An error occurred in POST request:", error);
    return NextResponse.json({ message: "An error occurred.", success: false }, { status: 500 });
  }
}
