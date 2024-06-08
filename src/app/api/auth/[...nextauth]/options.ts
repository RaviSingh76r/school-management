import dbConnect from "@/config/dbConnect";
import { User } from "@/models/user.models";
import { NextAuthOptions } from "next-auth";
import bcryptjs from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			id: "credentials",
			name: "credentials",
			credentials: {
				username: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials: any): Promise<any> {
				await dbConnect();

				try {
					const user = await User.findOne({ email: credentials.email });

					if (!user) {
						throw new Error("No user find with this credentials");
					}

					const isPasswordCorrect = await bcryptjs.compare(
						credentials.password,
						user.password
					);

					if (!isPasswordCorrect) {
						throw new Error("Wrong password please try again...");
					}

					return user;
				} catch (error: any) {
					throw new Error("An error occurred: ", error);
				}
			},
		}),
	],
	callbacks: {
		async session({ session, token }) {
			if (token) {
				session.user._id = token._id?.toString();
				session.user.username = token.username?.toString();
				session.user.firstName = token.firstName?.toString();
				session.user.email = token.email?.toString();
				session.user.role = token.role?.toString();
				session.user.avatarUri = token.avatarUri?.toString();
			}

			return session;
		},
		async jwt({ token, user }) {
			if (user) {
				token._id = user._id?.toString();
				token.username = user.username?.toString();
				token.firstName = user.firstName?.toString();
				token.email = user.email?.toString();
				token.role = user.role?.toString();
				token.avatarUri = user.avatarUri?.toString();
			}
			return token;
		},
	},
	session: {
		strategy: "jwt",
	},
	secret: process.env.NEXTAUTH_SECRET,
	pages: {
		signIn: "/login",
	},
};

export default authOptions;
