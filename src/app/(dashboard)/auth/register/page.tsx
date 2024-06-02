"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

// Next JS Stuffs
import { Input, Button, Select, SelectItem } from "@nextui-org/react";
import { useRouter,usePathname } from "next/navigation";

// React Hot Toast
import toast, { Toaster } from "react-hot-toast";

const Register = () => {
	const router = useRouter();
	const pathname = usePathname()
	console.log(pathname)

	const [formData, setFormData] = useState({
		email: "",
		password: "",
		firstName: "",
		lastName: "",
		role: "",
		username: "",
	});
	const [isLoading, setIsLoading] = useState(false);

	const userRole = [
		{ label: "Student", value: "student" },
		{ label: "Teacher", value: "teacher" },
		{ label: "Parent", value: "parent" },
	];

	const registerUser = async () => {
		try {
			setIsLoading(true);
			const response = await axios.post("/api/auth/register", formData);

			try {
				if (response.data.success) {
					toast.success("User registered successfully");
					router.replace(
						`/auth/complete-registration/${response.data.user.role}/${response.data.user._id}`
					);
				}
			} catch (error: any) {
				console.log("Something went wrong: ", error);
				toast.success("Error while redirecting");
			}
		} catch (error) {
			console.error("Registration failed:", error);
			toast.error("Something went wrong, please try again...");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen min-w-full flex items-center justify-center bg-default-50">
			<div className="max-[760px]:w-full w-1/3 space-y-6">
				<div className="w-full text-center">
					<span className="text-2xl font-semibold text-default-900">
						Welcome to your School! 🏫
					</span>
					<p className="mt-2 text-lg text-default-300">
						Create your account to join us
					</p>
				</div>

				<div className="min-w-full flex space-x-4">
					<Input
						size="md"
						variant="flat"
						placeholder="First Name"
						label="First Name"
						labelPlacement="inside"
						type="text"
						value={formData.firstName}
						onChange={(e) =>
							setFormData({ ...formData, firstName: e.target.value })
						}
					/>
					<Input
						size="md"
						variant="flat"
						placeholder="Last name"
						label="Last name"
						labelPlacement="inside"
						type="text"
						value={formData.lastName}
						onChange={(e) =>
							setFormData({ ...formData, lastName: e.target.value })
						}
					/>
				</div>
				<Input
					size="md"
					variant="flat"
					placeholder="Username"
					label="Username"
					labelPlacement="inside"
					type="text"
					value={formData.username}
					onChange={(e) =>
						setFormData({ ...formData, username: e.target.value })
					}
				/>
				<Input
					size="md"
					variant="flat"
					placeholder="Email"
					label="Email"
					labelPlacement="inside"
					type="email"
					value={formData.email}
					onChange={(e) => setFormData({ ...formData, email: e.target.value })}
				/>
				<Input
					size="md"
					variant="flat"
					placeholder="Password"
					label="Password"
					labelPlacement="inside"
					type="password"
					value={formData.password}
					onChange={(e) =>
						setFormData({ ...formData, password: e.target.value })
					}
				/>
				<div className="flex w-full flex-wrap md:flex-nowrap gap-4">
					<Select
						label="Select your role"
						placeholder="Select a role"
						className="min-w-full"
						onChange={(e) => setFormData({ ...formData, role: e.target.value })}
					>
						{userRole.map((role) => (
							<SelectItem key={role.value} value={role.value}>
								{role.label}
							</SelectItem>
						))}
					</Select>
				</div>
				<Button
					size="md"
					isLoading={isLoading}
					onClick={registerUser}
					variant="flat"
					className="w-full"
				>
					Register
				</Button>
				<Toaster />
			</div>
		</div>
	);
};

export default Register;
