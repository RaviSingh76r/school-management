"use client";

import React, { useState } from "react";

// Form Validation
import { z } from "zod";
import { loginValidation } from "@/schema/user.schema";

// Next JS Stuffs
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Input, Button } from "@nextui-org/react";

import toast, { Toaster } from "react-hot-toast";

type FormData = z.infer<typeof loginValidation>;

const Login: React.FC = () => {
	const router = useRouter();
	const [formData, setFormData] = useState<FormData>({
		username: "",
		password: "",
	});
	const [isLoading, setIsLoading] = useState(false);
	const [isReadOnly, setIsReadOnly] = useState(false);

	const { data: session } = useSession();

	const handleLogin: any = async () => {
		try {
			setIsLoading(true);
			setIsReadOnly(true);
			const res = await signIn("credentials", {
				username: formData.username.toString(),
				password: formData.password.toString(),
			});
			if (res?.ok) {
				toast.success("User logged in");
				router.replace(`/${session?.user.role}`);
			}
		} catch (error) {
			console.error("Login failed:", error);
			toast.error("Something went wrong, please try again...");
		} finally {
			setIsLoading(false);
			setIsReadOnly(false);
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
				onChange={(e) =>
					setFormData({ ...formData, username: e.target.value.toString() })
				}
				isReadOnly={isReadOnly}
			/>
			<Input
				size="md"
				variant="flat"
				placeholder="Password"
				label="Password"
				labelPlacement="inside"
				type="password"
				value={formData.password}
				onChange={(e) => setFormData({ ...formData, password: e.target.value })}
				isReadOnly={isReadOnly}
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
			<Toaster />
		</div>
	);
};

export default Login;
