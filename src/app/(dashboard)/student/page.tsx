"use client";

import React, { useState } from "react";
import axios from "axios";

import { BiMedal } from "react-icons/bi";
import { FaGraduationCap } from "react-icons/fa";
import { FiTarget } from "react-icons/fi";
import { FiPieChart } from "react-icons/fi";

import { Button } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

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
	const pathname = usePathname();
	const { data: session } = useSession();
	const [isLoaded, setIsLoaded] = useState(false);

	const [studentData, setStudentData] = useState<StudentDataItems>({
		achievements: [],
		attendance: [],
		classRank: "",
		subject: [],
	});

	return (
		<div className="bg-default-50 flex w-full space-x-2">
			<div className="lg:w-2/3 w-full space-y-4">
				<div className="flex space-x-4 items-center overflow-x-auto">
					<Card icon={BiMedal} type="Rank" value="1st" isLoaded={isLoaded} />
					<Card
						icon={FiPieChart}
						type="Attendance"
						value={`${studentData?.attendance?.length} days`}
						isLoaded={isLoaded}
					/>
					<Card
						icon={FiTarget}
						type="Achievements"
						value={`${studentData.achievements.length}`}
						isLoaded={isLoaded}
					/>
					<Card
						icon={FaGraduationCap}
						type="Performance"
						value="94%"
						isLoaded={isLoaded}
					/>
				</div>

				<div className="w-full bg-default-50 rounded-lg">
					<PerformanceChart isLoaded={isLoaded} />
				</div>

				<div className="w-full">
					<AssignmentCard isLoaded={isLoaded} />
				</div>
			</div>
			<div className="lg:flex hidden h-screen w-1/3 bg-secondary-400">
				<Button
					onClick={() => {
						setIsLoaded(!isLoaded);
						console.log(pathname.split("/"));
					}}
				>
					Change Loaded
				</Button>
			</div>
		</div>
	);
};

export default Page;
