"use client";

import React, { memo, useMemo } from "react";
import { Sidebar } from "./sidebar.styles";
import { Avatar, Tooltip } from "@nextui-org/react";
import {
	CustomersIcon,
	FilterIcon,
	HomeIcon,
	ReportsIcon,
	SettingsIcon,
} from "@/components/icons/sidebar/index";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { useSidebarContext } from "../../student/layout-context";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

// React Icons
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdOutlineAssignment } from "react-icons/md";
import { FaCalendarCheck } from "react-icons/fa";
import {
	MdConnectWithoutContact,
	MdMessage,
	MdOutlineGrade,
} from "react-icons/md";

interface SidebarItemConfig {
	title: string;
	icon: React.ReactNode;
	href: string;
	subItems?: SidebarItemConfig[];
}

interface SidebarConfig {
	student: SidebarItemConfig[];
	teacher: SidebarItemConfig[];
	admin: SidebarItemConfig[];
	parent: SidebarItemConfig[];
}

// Sidebar configuration based on roles
const sidebarConfig: any = {
	student: [
		{
			title: "Home",
			icon: <HomeIcon />,
			href: "/student",
		},
		{
			title: "Assignment",
			subItems: [
				{
					title: "Current",
					icon: <MdOutlineAssignment />,
					href: "/student/assignment/current",
				},
				{
					title: "Submitted",
					icon: <IoMdCheckmarkCircleOutline />,
					href: "/student/assignment/submitted",
				},
			],
		},
		{
			title: "Performance",
			subItems: [
				{
					title: "Grades",
					icon: <MdOutlineGrade />,
					href: "/student/performance/grades",
				},
				{
					title: "Report Cards",
					icon: <ReportsIcon />,
					href: "/student/performance/reports",
				},
				{
					title: "Attendance",
					icon: <FaCalendarCheck />,
					href: "/student/performance/attendance",
				},
			],
		},
		{
			title: "Communication",
			subItems: [
				{
					title: "Messages",
					icon: <MdMessage />,
					href: "/student/communication/messages",
				},
				{
					title: "Announcements",
					icon: <MdConnectWithoutContact />,
					href: "/student/communication/announcements",
				},
				{
					title: "Connect Teacher",
					icon: <CustomersIcon />,
					href: "/student/communication/connect-teacher",
				},
			],
		},
	],
	teacher: [
		{
			title: "Dashboard",
			icon: <HomeIcon />,
			href: "/teacher",
		},
		{
			title: "Classes",
			subItems: [
				{
					title: "Create Assignments",
					icon: <MdOutlineAssignment />,
					href: "/teacher/class/create-assignment",
				},
				{
					title: "Attendance",
					icon: <IoMdCheckmarkCircleOutline />,
					href: "/teacher/class/attendance",
				},
				{
					title: "Gradebook",
					icon: <IoMdCheckmarkCircleOutline />,
					href: "/teacher/class/gradebook",
				},
			],
		},
		{
			title: "Students",
			subItems: [
				{
					title: "Student List",
					icon: <MdOutlineAssignment />,
					href: "/teacher/student/student-list",
				},
				{
					title: "Performance",
					icon: <IoMdCheckmarkCircleOutline />,
					href: "/teacher/student/performance",
				},
				{
					title: "Attendance Records",
					icon: <IoMdCheckmarkCircleOutline />,
					href: "/teacher/student/attendance-record",
				},
				{
					title: "Behavior Reports",
					icon: <IoMdCheckmarkCircleOutline />,
					href: "/teacher/student/behavior-report",
				},
			],
		},
		{
			title: "Communication",
			subItems: [
				{
					title: "Messages",
					icon: <MdOutlineAssignment />,
					href: "/teacher/communication/messages",
				},
				{
					title: "Announcements",
					icon: <IoMdCheckmarkCircleOutline />,
					href: "/teacher/communication/announcements",
				},
				{
					title: "Forums",
					icon: <IoMdCheckmarkCircleOutline />,
					href: "/teacher/communication/forums",
				},
				{
					title: "Parent Communication",
					icon: <IoMdCheckmarkCircleOutline />,
					href: "/teacher/communication/parent",
				},
			],
		},
		{
			title: "Reports",
			subItems: [
				{
					title: "Progress Reports",
					icon: <MdOutlineAssignment />,
					href: "/teacher/reports/progress",
				},
				{
					title: "Grade Reports",
					icon: <IoMdCheckmarkCircleOutline />,
					href: "/teacher/reports/grade",
				},
				{
					title: "Attendance Reports",
					icon: <IoMdCheckmarkCircleOutline />,
					href: "/teacher/reports/attendance",
				},
			],
		},
	],
	admin: [
		{
			title: "Dashboard",
			icon: <HomeIcon />,
			href: "/admin",
		},
		// Add admin specific items here
	],
	parent: [
		{
			title: "Dashboard",
			icon: <HomeIcon />,
			href: "/parent",
		},
		// Add parent specific items here
	],
};

const renderMenuItems = (items: SidebarItemConfig[], pathname: string) => {
	return items.map((item, index) => {
		if (item.subItems) {
			return (
				<SidebarMenu key={index} title={item.title}>
					{item.subItems.map((subItem, subIndex) => (
						<SidebarItem
							key={subIndex}
							title={subItem.title}
							icon={subItem.icon}
							isActive={pathname === subItem.href}
							href={subItem.href}
						/>
					))}
				</SidebarMenu>
			);
		} else {
			return (
				<SidebarItem
					key={index}
					title={item.title}
					icon={item.icon}
					isActive={pathname === item.href}
					href={item.href}
				/>
			);
		}
	});
};

const SidebarWrapper: React.FC = memo(() => {
	const pathname = usePathname();
	const { collapsed, setCollapsed } = useSidebarContext();
	const { data: session } = useSession();
	const role = session?.user?.role as keyof SidebarConfig;

	const menuItems = useMemo(() => {
		if (role) {
			return renderMenuItems(sidebarConfig[role], pathname);
		}
		return null;
	}, [role, pathname]);

	return (
		<aside
			className={`h-screen z-[20] sticky top-0 bg-default-50 text-default-900 transition-all ${
				collapsed ? "w-20" : "w-64"
			}`}
		>
			{collapsed ? (
				<div className={Sidebar.Overlay()} onClick={setCollapsed} />
			) : null}
			<div className={Sidebar({ collapsed })}>
				<div className={Sidebar.Header()}>
					<h2 className="text-lg text-default-900 font-semibold">School</h2>
				</div>
				<div className="flex flex-col justify-between h-full bg-default-50 text-default-900">
					<div className={Sidebar.Body()}>{menuItems}</div>
					<div className={Sidebar.Footer()}>
						<Tooltip content={"Settings"} color="primary">
							<div className="max-w-fit">
								<SettingsIcon />
							</div>
						</Tooltip>
						<Tooltip content={"Adjustments"} color="primary">
							<div className="max-w-fit">
								<FilterIcon />
							</div>
						</Tooltip>
						<Tooltip content={"Profile"} color="primary">
							<Avatar
								src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
								size="sm"
							/>
						</Tooltip>
					</div>
				</div>
			</div>
		</aside>
	);
});

export default SidebarWrapper;
