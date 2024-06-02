"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

import { BiMedal } from "react-icons/bi";
import { FaGraduationCap } from "react-icons/fa";
import { FiTarget } from "react-icons/fi";
import { FiPieChart } from "react-icons/fi";

import { Button, Spinner } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import AssignmentCard from "./components/home/AssignmentCard";
import Card from "./components/home/Card";
import PerformanceChart from "./components/home/PerformanceChart";

interface StudentDataItems {
	attendance: [];
	achievements: [];
	classRank: string;
	subject: [];
}

const Page = () => {
	const router = useRouter();
	const { data: session } = useSession();
	console.log(session?.user?._id);

	const [isLoading, setIsLoading] = useState(false);
	const [studentData, setStudentData] = useState<StudentDataItems>({
		achievements: [],
		attendance: [],
		classRank: "",
		subject: [],
	});

	const fetchStudentData = async () => {
		try {
			setIsLoading(true);
			if (session?.user?._id) {
				const res = await axios.get(
					`/api/student/get-data/${session?.user?._id}`
				);
				if (res.data.success) {
					setStudentData(res.data.student);
					console.log(res.data.student)
				}
			}
		} catch (error: any) {
			console.log("Error while fetching the student data");
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchStudentData();
	}, []);

	return (
		<div className="w-full flex">
			{isLoading ? (
				<div className="min-w-full min-h-screen">
					<Spinner />
				</div>
			) : (
				<div className="bg-default-50  space-x-2">
					<div className="lg:w-2/3 w-full space-y-4">
						<div className="flex space-x-4 items-center overflow-x-auto">
							<Card icon={BiMedal} type="Rank" value="1st" />
							<Card
								icon={FiPieChart}
								type="Attendance"
								value={`${studentData?.attendance?.length} days`}
							/>
							<Card
								icon={FiTarget}
								type="Achievements"
								value={`${studentData.achievements.length}`}
							/>
							<Card icon={FaGraduationCap} type="Performance" value="94%" />
						</div>

						<div className="w-full bg-default-50 rounded-lg">
							<PerformanceChart />
						</div>

						<div className="w-full">
							<AssignmentCard />
						</div>
					</div>
					<div className="lg:flex hidden h-screen w-1/3 bg-secondary-400">
						<Button
							onClick={() =>
								router.push("/complete-registration/6652f0b24500f0ca8b3697b3")
							}
						>
							Complete Registration
						</Button>
					</div>
				</div>
			)}
		</div>
	);
};

export default Page;
