"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { BiMedal } from "react-icons/bi";
import { FaGraduationCap } from "react-icons/fa";
import { FiTarget } from "react-icons/fi";
import { FiPieChart } from "react-icons/fi";

import { Button } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";

import AssignmentCard from "./components/home/AssignmentCard";

import Card from "./components/home/Card";
import PerformanceChart from "./components/home/PerformanceChart";

const Page = () => {
	const {data: session} = useSession()
	const router = useRouter()

	return (
		<div className="bg-default-50 w-full flex space-x-2">
			<div className="lg:w-2/3 w-full space-y-4">
				<div className="flex space-x-4 items-center overflow-x-auto">
					<Card icon={BiMedal} type="Rank" value="1st" />
					<Card icon={FiPieChart} type="Attendance" value="87%" />
					<Card icon={FiTarget} type="Achievements" value="4" />
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
				<Button onClick={()=>router.push('/complete-registration/6652f0b24500f0ca8b3697b3')}>
					Complete Registration
				</Button>
			</div>
		</div>
	);
};

export default Page;
