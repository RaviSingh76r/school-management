import { User } from "@/models/user.model";
import connectDb from "@/config/dbConfig";

interface CreateUserProps {
	id: string;
	username: string;
	first_name: string;
	last_name: string;
	email_addresses: any;
	image_url: string;
	phone_numbers?: object;
}

export const createOrUpdateUser = async ({
	id,
	username,
	first_name,
	last_name,
	email_addresses,
	phone_numbers,
	image_url,
}: CreateUserProps) => {
	try {
		await connectDb();

		const user = await User.findOneAndUpdate(
			{ clerkId: id },
			{
				$set: {
					username,
					firstName: first_name,
					lastName: last_name,
					avatar: image_url,
					email: email_addresses[0].email_address,
				},
			},
			{ upsert: true, new: true }
		);

		await user.save();

		return user;
	} catch (error: any) {
		console.log("Error while creating or updating the user: ", error);
	}
};

export const deleteUser = async (id: any) => {
	try {
		await connectDb();
		await User.findByIdAndDelete({ clerkId: id });
	} catch (error: any) {
		console.log("An error occurred: ", error);
	}
};
