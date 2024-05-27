"use client";

import React from "react";

const Page = () => {
	return (
		<div>
			{/* Hero Section */}
			<section className="bg-blue-600 text-white">
				<div className="container mx-auto px-4 py-24 text-center">
					<h2 className="text-4xl font-bold mb-4">
						Empowering Students, Teachers, and Parents
					</h2>
					<p className="text-lg mb-6">
						A comprehensive solution for managing academic and administrative
						activities.
					</p>
					<a
						href="#features"
						className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-200"
					>
						Learn More
					</a>
				</div>
			</section>
		</div>
	);
};

export default Page;
