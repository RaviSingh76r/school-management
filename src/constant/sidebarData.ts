// React Icons
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdOutlineAssignment } from "react-icons/md";
import { FaCalendarCheck } from "react-icons/fa";
import {
	MdConnectWithoutContact,
	MdMessage,
	MdOutlineGrade,
} from "react-icons/md";

import {
	CustomersIcon,
	HomeIcon,
	ReportsIcon,
} from "@/components/icons/sidebar/index";

export const sidebarData: any = {
	student: [
		{
			title: "Home",
			icon: HomeIcon,
			href: "/student",
		},
		{
			title: "Assignment",
			subItems: [
				{
					title: "Current",
					icon: MdOutlineAssignment,
					href: "/student/assignment/current",
				},
				{
					title: "Submitted",
					icon: IoMdCheckmarkCircleOutline,
					href: "/student/assignment/submitted",
				},
			],
		},
		{
			title: "Performance",
			subItems: [
				{
					title: "Grades",
					icon: MdOutlineGrade,
					href: "/student/performance/grades",
				},
				{
					title: "Report Cards",
					icon: ReportsIcon,
					href: "/student/performance/reports",
				},
				{
					title: "Attendance",
					icon: FaCalendarCheck,
					href: "/student/performance/attendance",
				},
			],
		},
		{
			title: "Communication",
			subItems: [
				{
					title: "Messages",
					icon: MdMessage,
					href: "/student/communication/messages",
				},
				{
					title: "Announcements",
					icon: MdConnectWithoutContact,
					href: "/student/communication/announcements",
				},
				{
					title: "Connect Teacher",
					icon: CustomersIcon,
					href: "/student/communication/connect-teacher",
				},
			],
		},
	],
	teacher: [
		{
			title: "Dashboard",
			icon: HomeIcon,
			href: "/teacher",
		},
		{
			title: "Classes",
			subItems: [
				{
					title: "Create Assignments",
					icon: MdOutlineAssignment,
					href: "/teacher/class/create-assignment",
				},
				{
					title: "Attendance",
					icon: IoMdCheckmarkCircleOutline,
					href: "/teacher/class/attendance",
				},
				{
					title: "Gradebook",
					icon: IoMdCheckmarkCircleOutline,
					href: "/teacher/class/gradebook",
				},
			],
		},
		{
			title: "Students",
			subItems: [
				{
					title: "Student List",
					icon: MdOutlineAssignment,
					href: "/teacher/student/student-list",
				},
				{
					title: "Performance",
					icon: IoMdCheckmarkCircleOutline,
					href: "/teacher/student/performance",
				},
				{
					title: "Attendance Records",
					icon: IoMdCheckmarkCircleOutline,
					href: "/teacher/student/attendance-record",
				},
				{
					title: "Behavior Reports",
					icon: IoMdCheckmarkCircleOutline,
					href: "/teacher/student/behavior-report",
				},
			],
		},
		{
			title: "Communication",
			subItems: [
				{
					title: "Messages",
					icon: MdOutlineAssignment,
					href: "/teacher/communication/messages",
				},
				{
					title: "Announcements",
					icon: IoMdCheckmarkCircleOutline,
					href: "/teacher/communication/announcements",
				},
				{
					title: "Forums",
					icon: IoMdCheckmarkCircleOutline,
					href: "/teacher/communication/forums",
				},
				{
					title: "Parent Communication",
					icon: IoMdCheckmarkCircleOutline,
					href: "/teacher/communication/parent",
				},
			],
		},
		{
			title: "Reports",
			subItems: [
				{
					title: "Progress Reports",
					icon: MdOutlineAssignment,
					href: "/teacher/reports/progress",
				},
				{
					title: "Grade Reports",
					icon: IoMdCheckmarkCircleOutline,
					href: "/teacher/reports/grade",
				},
				{
					title: "Attendance Reports",
					icon: IoMdCheckmarkCircleOutline,
					href: "/teacher/reports/attendance",
				},
			],
		},
	],
	admin: [
		{
			title: "Dashboard",
			icon: HomeIcon,
			href: "/admin",
		},
		// Add admin specific items here
	],
	parent: [
		{
			title: "Dashboard",
			icon: HomeIcon,
			href: "/parent",
		},
		// Add parent specific items here
	],
};
