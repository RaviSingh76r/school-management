import { NextResponse, NextRequest } from "next/server";
import { User } from "@/models/user.model";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import connectDb from "@/config/dbConfig";

interface ILoginRequest {
  username: string;
  password: string;
}

interface ITokenData {
  username: string;
  email: string;
  role: string;
  id: string;
}

async function loginUser(username: string, password: string): Promise<{ success: boolean, token?: string, user?: any, message: string }> {
  try {
    connectDb();

    // Find user by username
    const user = await User.findOne({ email: username });

    if (!user) {
      return {
        success: false,
        message: "User doesn't exist. Please register first.",
      };
    }

    // Validate password
    const validPassword = await bcryptjs.compare(password, user.password as string);
    if (!validPassword) {
      return {
        success: false,
        message: "Invalid credentials.",
      };
    }

    // Generate JWT token
    const tokenData: ITokenData = {
      username: user.username,
      email: user.email,
      role: user.role,
      id: user._id,
    };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET!);

    return {
      success: true,
      token,
      user,
      message: "User logged in successfully.",
    };
  } catch (error) {
    console.error("An error occurred while logging in user:", error);
    return {
      success: false,
      message: "An error occurred while logging in user.",
    };
  }
}

export async function POST(request: NextRequest) {
  try {
    const { username, password }: ILoginRequest = await request.json();

    const { success, token, user, message } = await loginUser(username, password);

    const response = NextResponse.json({ message, success, user }, { status: success ? 200 : 401 });

    if (success && token) {
      response.cookies.set("token", token);
    }

    return response;
  } catch (error) {
    console.error("An error occurred in POST request:", error);
    return NextResponse.json({ message: "An error occurred.", success: false }, { status: 500 });
  }
}
