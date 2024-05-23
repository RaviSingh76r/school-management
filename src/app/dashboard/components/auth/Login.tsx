"use client";

import React, { useState } from "react";
import { z } from "zod";
import { Input, Button } from "@nextui-org/react";
import axios from "axios";
import { loginValidation } from "@/schema/user.schema";

// Define Zod schema for form data
const formDataSchema = z.object({
	email: z.string().email({ message: "Please enter a valid email address." }),
	password: z
		.string()
		.min(8, { message: "Password must be at least 8 characters long." }),
});

type FormData = z.infer<typeof loginValidation>;

const Login: React.FC = () => {
	const [formData, setFormData] = useState<FormData>({
		username: "",
		password: "",
	});
	const [isLoading, setIsLoading] = useState(false);
	const [formErrors, setFormErrors] = useState<
		Partial<Record<keyof FormData, string>>
	>({});

	const handleChange = (field: keyof FormData, value: string) => {
		setFormData((prevFormData) => ({
			...prevFormData,
			[field]: value,
		}));
	};

	const validateForm = () => {
		try {
			// Validate form data against Zod schema
			formDataSchema.parse(formData);
			setFormErrors({});
			return true;
		} catch (error: any) {
			// If validation fails, set form errors
			setFormErrors(error.formErrors.fieldErrors);
			return false;
		}
	};

	const handleLogin = async () => {
		try {
				setIsLoading(true);
				// Simulating login request
				const response = await axios.post("/api/auth/login", formData)
				// For demonstration purposes, just log the form data
				console.log("Login successful!", response.data.user);
			} catch (error) {
				console.error("Login failed:", error);
			} finally {
				setIsLoading(false);
			}
	};

	return (
		<div className="w-full min-h-screen max-w-md mx-auto p-4 space-y-4  rounded-lg shadow-lg">
			<div className="w-full text-center">
				<span className="text-2xl font-semibold text-default-900">
					Welcome back! 🔐
				</span>
				<p className="mt-2 text-lg text-default-900">Sign in to your account</p>
			</div>
			<Input
				size="md"
				variant="flat"
				placeholder="Username"
				label="Username"
				labelPlacement="inside"
				type="text"
				value={formData.username}
				onChange={(e) => handleChange("username", e.target.value)}
				errorMessage={formErrors.username}
			/>
			<Input
				size="md"
				variant="flat"
				placeholder="Password"
				label="Password"
				labelPlacement="inside"
				type="password"
				value={formData.password}
				onChange={(e) => handleChange("password", e.target.value)}
				errorMessage={formErrors.password}
			/>
			<Button
				size="md"
				isLoading={isLoading}
				onClick={handleLogin}
				variant="flat"
				className="w-full"
			>
				Login
			</Button>
		</div>
	);
};

export default Login;
