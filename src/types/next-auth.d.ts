import "next-auth";

declare module "next-auth" {
	interface User {
		_id?: string;
		username?: string;
		email?: string;
		role?: string;
		firstName?: string;
		lastName?: string;
		avatar?: string;
		studentId?: string
	}

	interface Session {
		user: {
			_id?: string;
			username?: string;
			email?: string;
			role?: string;
			firstName?: string;
			lastName?: string;
			avatar?: string;
			studentId?: string; 
		} & DefaultSession["user"]
	}
}

declare module "next-auth/jwt" {
  interface JWT{
    _id?: string;
		username?: string;
		email?: string;
		role?: string;
		firstName?: string;
		lastName?: string;
		avatar?: string;
		studentId?: string;
  }
}