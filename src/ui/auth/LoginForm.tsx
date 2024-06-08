"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/authContext";

import { Input, Button, Checkbox, Link, Spacer } from "@nextui-org/react";

import toast, { Toaster } from "react-hot-toast";

interface ILoginFormData {
	email: string;
	password: string;
}

const LoginForm = () => {
	const [formData, setFormData] = useState<ILoginFormData>({
		email: "",
		password: "",
	});

	const { login, isLoading, error } = useAuth();

	return (
		<div className="w-full space-y-4">
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
			<div className="flex items-center justify-between">
				<div className="flex">
					<Checkbox />
					<span>Remember me!</span>
				</div>
				<div>
					<Link href="/password/recover-password" color="primary" anchorIcon>
						Forgot Password?
					</Link>
				</div>
			</div>
			<Spacer y={6} />
			<Button
				color="primary"
				isLoading={isLoading}
				variant="flat"
				size="md"
				onClick={() => login(formData)}
			>
				Login
			</Button>
			<Toaster />
		</div>
	);
};

export default LoginForm;
