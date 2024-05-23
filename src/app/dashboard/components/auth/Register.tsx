"use client";

import React, { useState } from "react";
import { z } from "zod";

import { Input, Button } from "@nextui-org/react";
import axios from "axios";

import { registrationValidation } from "@/schema/user.schema";

type FormData = z.infer<typeof registrationValidation>;

const Register = () => {
	const [formData, setFormData] = useState<FormData>({
		email: "",
		password: "",
		firstName: "",
		lastName: "",
		role: "",
		username: "",
	});
	const [isLoading, setIsLoading] = useState(false);
	const [formErrors, setFormErrors] = useState<
		Partial<Record<keyof FormData, string>>
	>({});
	const handleChange = (field: any, value: any) => {
		setFormData((prevFormData) => ({
			...prevFormData,
			[field]: value,
		}));
	};

	const validateForm = () => {
		try {
			// Validate form data against Zod schema
			registrationValidation.parse(formData);
			setFormErrors({});
			return true;
		} catch (error: any) {
			// If validation fails, set form errors
			setFormErrors(error.formErrors.fieldErrors);
			return false;
		}
	};

	const registerUser = async () => {
		try {
				setIsLoading(true);
				const response = await axios.post("/api/auth/register", formData);
				console.log(response.data);
			} catch (error) {
				console.error("Registration failed:", error);
			} finally {
				setIsLoading(false);
			}
	};

	return (
		<div className="max-[760px]:w-full w-1/2 space-y-6">
			<div className="w-full text-center">
				<span className="text-2xl font-semibold text-default-900">
					Welcome to your School! 🏫
				</span>
				<p className="mt-2 text-lg text-gray-600">
					Create your account to join us
				</p>
			</div>

			<Input
				size="md"
				variant="flat"
				placeholder="First Name"
				label="First Name"
				labelPlacement="inside"
				type="text"
				value={formData.firstName}
				onChange={(e) => handleChange("firstName", e.target.value)}
				errorMessage={formErrors.firstName}
			/>
			<Input
				size="md"
				variant="flat"
				placeholder="Last name"
				label="Last name"
				labelPlacement="inside"
				type="text"
				value={formData.lastName}
				onChange={(e) => handleChange("lastName", e.target.value)}
				errorMessage={formErrors.lastName}
			/>
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
				placeholder="Email"
				label="Email"
				labelPlacement="inside"
				type="email"
				value={formData.email}
				onChange={(e) => handleChange("email", e.target.value)}
				errorMessage={formErrors.email}
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
			<Input
				size="md"
				variant="flat"
				label="Role"
				placeholder="Role"
				type="text"
				value={formData.role}
				onChange={(e) => handleChange("role", e.target.value)}
				errorMessage={formErrors.role}
				labelPlacement="inside"
			/>
			<Button
				size="lg"
				isLoading={isLoading}
				onClick={registerUser}
				variant="flat"
			>
				Register
			</Button>
		</div>
	);
};

export default Register;
