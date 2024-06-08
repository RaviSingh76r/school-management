"use client";

import React, { useState } from "react";

import { Input, Button, Checkbox, Link, Spacer } from "@nextui-org/react";

import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

interface IRegisterFormData {
	username: string;
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber?: string;
	password: string;
	role: string;
	avatarUri?: string;
}

const RegisterForm = () => {
	const [formData, setFormData] = useState<IRegisterFormData>({
		username: "",
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		role: "student",
	});
	const [isLoading, setIsLoading] = useState(false);

	const registerUser = async () => {
		try {
			setIsLoading(true);
			const response = await axios.post("/api/auth/register", formData);

			if (response.data.success) {
				toast.success("User registered successfully");
				console.log(response.data.user);
			}
		} catch (error: any) {
			toast.error(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="w-full space-y-4">
			<Input
				type="text"
				isRequired
				placeholder="Enter your username..."
				labelPlacement="inside"
				size="md"
				label="Username..."
				variant="flat"
				onChange={(e) => setFormData({ ...formData, username: e.target.value })}
			/>
			<Spacer y={6} />
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
			<Spacer y={6} />
			<Input
				type="text"
				isRequired
				placeholder="Enter your Last name..."
				labelPlacement="inside"
				size="md"
				label="Last Name..."
				variant="flat"
				onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
			/>

			<Spacer y={6} />
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
			<Spacer y={6} />
			<Input
				type="password"
				isRequired
				placeholder="Enter your password..."
				labelPlacement="inside"
				size="md"
				label="Password..."
				variant="flat"
				onChange={(e) => setFormData({ ...formData, password: e.target.value })}
			/>
			<Spacer y={2} />

			<Spacer y={6} />
			<Button
				color="primary"
				isLoading={isLoading}
				variant="flat"
				size="md"
				onClick={registerUser}
			>
				Register
			</Button>
			<Toaster />
		</div>
	);
};

export default RegisterForm;
