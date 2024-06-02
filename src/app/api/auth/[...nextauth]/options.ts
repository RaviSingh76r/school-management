import Credentials from "next-auth/providers/credentials";
import connectDb from "@/config/dbConfig";
import { User } from "@/models/user.model";
import bcryptjs from "bcryptjs";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials: any): Promise<any> {
        await connectDb();

        // Check if credentials are defined
        if (!credentials?.username || !credentials?.password) {
          console.error("Credentials are missing:", credentials);
          throw new Error("Credentials are missing");
        }

        try {
          const user = await User.findOne({ username: credentials.username });

          if (!user) {
            console.error("User not found:", credentials.username);
            throw new Error("User not found, Please register first");
          }

          // Ensure the user password is defined before comparing
          if (!user.password) {
            console.error("User password is missing:", user);
            throw new Error("User password is missing");
          }

          const isValidPassword = await bcryptjs.compare(credentials.password, user.password);

          if (isValidPassword) {
            console.log("Password is valid for user:", user.username);
            return user;
          } else {
            console.error("Invalid password for user:", user.username);
            throw new Error("Invalid credentials");
          }
        } catch (error: any) {
          console.error("Error while logging in user:", error.message);
          throw new Error(`Something went wrong while logging in user: ${error.message}`);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString();
        token.username = user.username?.toString();
        token.firstName = user.firstName?.toString();
        token.lastName = user.lastName?.toString();
        token.email = user.email?.toString();
        token.role = user.role?.toString();
        token.avatar = user.avatar?.toString();
        token.studentId = user.studentId?.toString()
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.username = token.username;
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
        session.user.email = token.email;
        session.user.role = token.role;
        session.user.avatar = token.avatar;
        session.user.studentId = token.studentId
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET!,
};

export default authOptions;
