"use client";

import LoginForm from "@/ui/auth/LoginForm";

import { Toaster } from "react-hot-toast";

const Page = () => {
	return (
		<div className="w-full flex items-center justify-center h-screen bg-black px-4">
			<div className="sm:w-1/2 w-full p-8 rounded-lg shadow-lg">
				<h1 className="text-3xl font-bold text-center text-default-900 mb-4">
					Welcome Back!
				</h1>
				<p className="text-center text-default-700 mb-8">
					Please log in to your account
				</p>
				<LoginForm />
			</div>
			<Toaster/>
		</div>
	);
};

export default Page;
