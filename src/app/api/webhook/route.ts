import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { createOrUpdateUser, deleteUser } from "@/libs/actions/user";
import { NextResponse } from "next/server";

interface IValueTypes {
	id: string;
	username: string;
	first_name: string;
	last_name: string;
	email_addresses: any;
	profile_image_url: string;
	phone_numbers: object;
}

export async function POST(req: Request) {
	// You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
	const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

	if (!WEBHOOK_SECRET) {
		throw new Error(
			"Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
		);
	}

	// Get the headers
	const headerPayload = headers();
	const svix_id = headerPayload.get("svix-id");
	const svix_timestamp = headerPayload.get("svix-timestamp");
	const svix_signature = headerPayload.get("svix-signature");

	// If there are no headers, error out
	if (!svix_id || !svix_timestamp || !svix_signature) {
		return new Response("Error occured -- no svix headers", {
			status: 400,
		});
	}

	// Get the body
	const payload = await req.json();
	const body = JSON.stringify(payload);

	// Create a new Svix instance with your secret.
	const wh = new Webhook(WEBHOOK_SECRET);

	let evt: WebhookEvent;

	// Verify the payload with the headers
	try {
		evt = wh.verify(body, {
			"svix-id": svix_id,
			"svix-timestamp": svix_timestamp,
			"svix-signature": svix_signature,
		}) as WebhookEvent;
	} catch (err) {
		console.error("Error verifying webhook:", err);
		return new Response("Error occured", {
			status: 400,
		});
	}

	// Handle the events
	const eventType = evt.type;

	if (eventType === "user.created" || eventType === "user.updated") {
		const {
			id,
			username,
			first_name,
			last_name,
			email_addresses,
			phone_numbers,
			image_url,
		} = evt.data;

		try {
			await createOrUpdateUser({
				id: id || "",
				username: username || "",
				first_name: first_name || "",
				last_name: last_name || "",
				email_addresses,
				phone_numbers,
				image_url: image_url || "",
			});

			return NextResponse.json(
				{
					message: "User is created or updated",
				},
				{ status: 200 }
			);
		} catch (error: any) {
			return NextResponse.json(
				{
					message: "An error occurred",
					error,
				},
				{ status: 500 }
			);
		}
	}

	if (eventType === "user.deleted") {
		try {
			const { id } = evt?.data;
			await deleteUser(id);

			return NextResponse.json(
				{
					message: "User deleted",
					success: true,
				},
				{ status: 200 }
			);
		} catch (error: any) {
			return NextResponse.json(
				{
					message: "An error occurred",
					success: false,
				},
				{ status: 500 }
			);
		}
	}
}
