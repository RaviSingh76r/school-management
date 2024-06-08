"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import { Input, Button, Spacer } from "@nextui-org/react";
import toast, { Toaster } from "react-hot-toast";

const Page = () => {
	const router = useRouter()

	const [formData, setFormData] = useState({
		email: "",
	});
	const [isLoading, setIsLoading] = useState(false);

	const submitForm = async () => {
		try {
			setIsLoading(true);
			const res = await axios.post("/api/auth/recover-password", formData);

			if (res.data.success) {
				toast.success("Email sent successfully");
				console.log(res.data);
			}
			router.push(res.data.link)
		} catch (error: any) {
			console.log("Error! something went wrong: ", error);
			toast.error("Something went wrong");
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
			<div className="md:w-1/2  w-full">
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
				<Button
					color="primary"
					isLoading={isLoading}
					variant="flat"
					size="md"
					onClick={submitForm}
				>
					Get Link
				</Button>
				<Toaster />
			</div>
		</div>
	);
};

export default Page;
