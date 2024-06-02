"use client";

import React, { useState } from "react";
import axios from "axios"

import toast, { Toaster } from "react-hot-toast";

import {
	Input,
	Textarea,
	Button,
	DatePicker,
	Select,
	SelectItem,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";

const Page = () => {
  const {data: session} = useSession()
  
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		className: "",
		section: "",
		dueDate: "",
		attachmentId: "",
	});

  const [isLoading, setIsLoading] = useState(false)

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

  const handleAssignment = async () => {
    try {
      setIsLoading(true)
      const res = await axios.post(`/api/teacher/assignment/create/${session?.user?._id}`, formData)
      if(res.data.success){
        toast.success("Assignment created successfully")
      }
    } catch (error:any) {
      console.log("Error while uploading Assignment: ", error)
      toast.error(error.message)
    }finally{
      setIsLoading(false)
    }
  }

	return (
		<div>
			<Input
				size="md"
				variant="flat"
				placeholder="Home Work Title"
				label="Title"
				labelPlacement="inside"
				type="text"
				value={formData.title}
				onChange={(e) => setFormData({ ...formData, title: e.target.value })}
			/>
			<Textarea
				size="md"
				variant="flat"
				placeholder="Home Work Description"
				label="Description"
				labelPlacement="inside"
				type="text"
				value={formData.description}
				onChange={(e) =>
					setFormData({ ...formData, description: e.target.value })
				}
			/>
			<DatePicker
				className="max-w-[284px]"
				label="Date (controlled)"
				onChange={(e)=>setFormData({...formData, dueDate: `${e.day.toString()}/${e.month.toString()}/${e.year.toString()}`})}
			/>
			<div>
				<div className="flex w-full flex-wrap md:flex-nowrap gap-4 bg-default-50">
					<Select
						label="Select your class"
						placeholder="Select a class"
						className="min-w-full bg-default-50"
						onChange={(e) =>
							setFormData({
								...formData,
								className: e.target.value.charAt(0).toUpperCase(),
							})
						}
					>
						{classList.map((className) => (
							<SelectItem className="bg-default-50" key={className.value} value={className.value}>
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
						onChange={(e) =>
							setFormData({
								...formData,
								section: e.target.value.charAt(0).toUpperCase(),
							})
						}
					>
						{sectionList.map((section) => (
							<SelectItem key={section.value} value={section.value}>
								{section.label}
							</SelectItem>
						))}
					</Select>
				</div>
			</div>
			<Button size="md" onClick={handleAssignment} isLoading={isLoading} variant="flat">
				Submit
			</Button>
      <Toaster/>
		</div>
	);
};

export default Page;
