"use client";

import React, { useState } from "react";
import axios from "axios";

import toast, { Toaster } from "react-hot-toast";

import { Button, Select, SelectItem } from "@nextui-org/react";
import { useRouter } from "next/navigation";

const Page = ({ params }: { params: { id: string } }) => {

	const router = useRouter()

	const [formData, setFormData] = useState({
		className: "",
		section: ""
	})
	const [isLoading, setIsLoading] = useState(false);

	const classList = [
		{ label: "I", value: "I" },
		{ label: "II", value: "II" },
		{ label: "III", value: "III" },
		{ label: "IV", value: "IV" },
		{ label: "V", value: "V" },
		{ label: "VI", value: "VI" },
		{ label: "VII", value: "VII" },
		{ label: "VIII", value: "VIII" },
		{ label: "IX", value: "IX" },
		{ label: "X", value: "X" },
		{ label: "XI", value: "XI" },
		{ label: "XII", value: "XII" },
	];

	const sectionList = [
		{ label: "A", value: "A" },
		{ label: "B", value: "B" },
		{ label: "C", value: "C" },
		{ label: "D", value: "D" },
	];

	const handleCompleteRegistration = async () => {
		try {
			setIsLoading(true);
			const res = await axios.post(
				`/api/complete-register/${params.id}`,
				formData
			);
			if (res.data.success) {
				toast.success("Registration Completed");
				console.log(res.data)
				router.replace("/auth/sign-in")
			}
		} catch (error: any) {
			console.log("Error while completing registration", error);
			toast.error("Something went wrong, please try again...");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div>
			<div className="flex w-full flex-wrap md:flex-nowrap gap-4">
				<Select
					label="Select your class"
					placeholder="Select a class"
					className="min-w-full"
					onChange={(e) => setFormData({...formData, className: e.target.value.charAt(0).toUpperCase()})}
				>
					{classList.map((className) => (
						<SelectItem key={className.value} value={className.value}>
							{className.label}
						</SelectItem>
					))}
				</Select>
			</div>
			<div className="flex w-full flex-wrap md:flex-nowrap gap-4">
				<Select
					label="Select your section"
					placeholder="Select an section"
					className="min-w-full"
					onChange={(e) => setFormData({...formData, section: e.target.value.charAt(0).toUpperCase()})}
				>
					{sectionList.map((section) => (
						<SelectItem key={section.value} value={section.value}>
							{section.label}
						</SelectItem>
					))}
				</Select>
			</div>
			<Button
				color="primary"
				size="md"
				isLoading={isLoading}
				onClick={handleCompleteRegistration}
			>
				Submit
			</Button>
			<Toaster />
		</div>
	);
};

export default Page;
