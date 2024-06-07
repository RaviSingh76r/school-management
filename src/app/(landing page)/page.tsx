"use client";

import React from "react";

import { IoInformationCircle } from "react-icons/io5";
import { BiEnvelope, BiQuestionMark, BiBook } from "react-icons/bi";

const Page = () => {
	return (
		<div className="relative flex items-center justify-center h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 overflow-hidden">
			{/* Animated Gradient Background */}
			<div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-70"></div>
			{/* Floating Elements */}
			<div className="absolute w-32 h-32 bg-blue-500 opacity-70 rounded-full animate-float1"></div>
			<div className="absolute w-24 h-24 bg-green-500 opacity-70 rounded-full animate-float2"></div>
			<div className="absolute w-16 h-16 bg-red-500 opacity-70 rounded-full animate-float3"></div>
			{/* Glassmorphism Card */}
			<div className="relative text-center p-8 bg-black bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg border border-gray-200 border-opacity-20 shadow-lg">
				<h1 className="text-6xl font-bold text-default-900 mb-4">
					Welcome to Our School Dashboard
				</h1>
				<p className="text-2xl text-gray-300 mb-8">
					Your gateway to a smarter, connected education experience.
				</p>
				{/* Optional: Add minimalistic icons or images */}
				<div className="flex justify-center gap-4">
					<div className="w-12 h-12 bg-black bg-opacity-30 rounded-full flex items-center justify-center shadow-md">
						<span className="text-2xl text-default-900"><IoInformationCircle/></span>
					</div>
					<div className="w-12 h-12 bg-black bg-opacity-30 rounded-full flex items-center justify-center shadow-md">
						<i className="text-xl text-default-900"><BiEnvelope/></i>
					</div>
					<div className="w-12 h-12 bg-black bg-opacity-30 rounded-full flex items-center justify-center shadow-md">
						<i className="text-xl text-default-900"><BiQuestionMark/></i>
					</div>
					<div className="w-12 h-12 bg-black bg-opacity-30 rounded-full flex items-center justify-center shadow-md">
						<i className="text-xl text-default-900"><BiBook/></i>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Page;
