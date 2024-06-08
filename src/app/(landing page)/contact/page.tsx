"use client";

import { useState } from "react";

import { Input, Button, Spacer, Textarea } from "@nextui-org/react";

interface IContactFormType {
	firstName: string;
	lastName: string;
	email?: string;
	phoneNumber?: string;
	query: string;
}

const Page = () => {
	const [formData, setFormData] = useState<IContactFormType>({
		firstName: "",
		lastName: "",
		email: "",
		phoneNumber: "",
		query: "",
	});

	const submitQuery = async () => {};

	return (
		<div className="w-full min-h-screen flex items-center justify-center">
			<div className="md:w-1/2 w-full">
        <div className="p-4">
          <h2 className="text-2xl font-semibold text-default-900 text-center">Contact Us! 🤙🤙</h2>
        </div>
				<div className="flex items-center justify-between">
					<Input
						type="text"
						isRequired
						placeholder="Enter your First Name..."
						labelPlacement="inside"
						size="md"
						label="First Name..."
						variant="flat"
						onChange={(e) =>
							setFormData({ ...formData, firstName: e.target.value })
						}
					/>
					<Spacer x={4} />
					<Input
						type="text"
						isRequired
						placeholder="Enter your Last Name..."
						labelPlacement="inside"
						size="md"
						label="Last Name..."
						variant="flat"
						onChange={(e) =>
							setFormData({ ...formData, lastName: e.target.value })
						}
					/>
				</div>
				<Spacer y={4} />
				<Input
					type="email"
					isRequired
					placeholder="Enter your email..."
					labelPlacement="inside"
					size="md"
					label="Email..."
					variant="flat"
					onChange={(e) => setFormData({ ...formData, email: e.target.value })}
				/>
				<Spacer y={4} />
				<Input
					type="email"
					isRequired
					placeholder="Enter your phone number..."
					labelPlacement="inside"
					size="md"
					label="Phone Number..."
					variant="flat"
					onChange={(e) =>
						setFormData({ ...formData, phoneNumber: e.target.value })
					}
				/>
				<Spacer y={4} />
				<Textarea
					type="text"
					isRequired
					placeholder="Type your query briefly..."
					labelPlacement="inside"
					size="md"
					label="Your Query..."
					variant="flat"
					onChange={(e) => setFormData({ ...formData, query: e.target.value })}
				/>
        <Spacer y={4} />
				<Button color="primary" variant="flat" size="md">
					Submit
				</Button>
			</div>
		</div>
	);
};

export default Page;
