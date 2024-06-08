import "next-auth";

declare module "next-auth" {
	interface Session {
		user: {
      _id?: string;
			username?: string;
			firstName?: string;
			email?: string;
			role?: string;
			avatarUri?: string;
		} & DefaultSession["user"];
	}

	interface User {
    _id?: string;
		username?: string;
		firstName?: string;
		email?: string;
		role?: string;
		avatarUri?: string;
	}

	interface JWT {
    _id?: string;
		username?: string;
		firstName?: string;
		email?: string;
		role?: string;
		avatarUri?: string;
	}
}
