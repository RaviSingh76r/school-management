"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Input, Button, Spacer } from "@nextui-org/react";
import toast, { Toaster } from "react-hot-toast";

const Page = ({ params }: { params: { id: string } }) => {
	const { id } = params;
	const router = useRouter();

	const [formData, setFormData] = useState({
		password: "",
		confirmPassword: "",
	});
	const [isLoading, setIsLoading] = useState(false);
	const [formError, setFormError] = useState("");

	useEffect(() => {
		if (formData.password !== formData.confirmPassword) {
			setFormError("Passwords do not match");
		} else {
			setFormError("");
		}
	}, [formData.password, formData.confirmPassword]);

	const submitForm = async () => {
		if (formData.password !== formData.confirmPassword) {
			toast.error("Passwords do not match");
			return;
		}

		try {
			setIsLoading(true);
			const res = await axios.post(`/api/auth/forgot-password/${id}`, formData);

			if (res.data.success) {
				toast.success("Password changed successfully");
				console.log("Your password has been changed");
				router.push("/login");
			} else {
				toast.error(res.data.message || "Error while resetting your password");
			}

			router.push("/login")
		} catch (error: any) {
			console.log("Error while resetting your password: ", error);
			toast.error("Error while resetting your password");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen min-w-full flex items-center justify-center flex-col space-y-4">
			<div>
				<h1 className="text-center font-semibold text-2xl text-default-900">
					Recover Your Password! 🔑🔑
				</h1>
			</div>
			<div className="md:w-1/2 w-full">
				<Input
					type="password"
					isRequired
					placeholder="Enter your Password..."
					labelPlacement="inside"
					size="md"
					label="Password..."
					variant="flat"
					onChange={(e) =>
						setFormData({ ...formData, password: e.target.value })
					}
				/>
				<Spacer y={6} />
				<Input
					type="password"
					isRequired
					placeholder="Confirm Password..."
					labelPlacement="inside"
					size="md"
					label="Confirm Password..."
					variant="flat"
					onChange={(e) =>
						setFormData({ ...formData, confirmPassword: e.target.value })
					}
          errorMessage={formError}
				/>
				<Spacer y={6} />
				<Button
					color="primary"
					isLoading={isLoading}
					variant="flat"
					size="md"
					onClick={submitForm}
					disabled={isLoading || formError !== ""}
				>
					Change Password
				</Button>
				<Toaster />
			</div>
		</div>
	);
};

export default Page;
