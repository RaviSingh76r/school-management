"use client";

import React from "react";
import { BiMedal } from "react-icons/bi";
import { FaGraduationCap } from "react-icons/fa";
import { FiTarget } from "react-icons/fi";
import { FiPieChart } from "react-icons/fi";

import AssignmentCard from "./components/home/AssignmentCard";

import Card from "./components/home/Card";
import PerformanceChart from "./components/home/PerformanceChart";

const Page = () => {
	return (
		<div className="w-full flex space-x-2">
			<div className="lg:w-2/3 w-full space-y-4">
				<div className="flex space-x-4 items-center overflow-x-auto">
					<Card icon={BiMedal} type="Rank" value="1st" />
					<Card icon={FiPieChart} type="Attendance" value="87%" />
					<Card icon={FiTarget} type="Achievements" value="4" />
					<Card icon={FaGraduationCap} type="Performance" value="94%" />
				</div>

				<div className="w-full bg-default-700 rounded-lg">
					<PerformanceChart />
				</div>

				<div className="w-full">
					<AssignmentCard />
				</div>
			</div>
			<div className="lg:flex hidden h-screen w-1/3 bg-secondary-400"></div>
		</div>
	);
};

export default Page;
