"use client";

import React from "react";
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
import { useSidebarContext } from "../../layout-context";
import { usePathname } from "next/navigation";

// React Icons
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdOutlineAssignment } from "react-icons/md";
import { FaCalendarCheck } from "react-icons/fa";
import { MdConnectWithoutContact } from "react-icons/md";
import { MdMessage } from "react-icons/md";
import { MdOutlineGrade } from "react-icons/md";

export const SidebarWrapper = () => {
	const pathname = usePathname();
	const { collapsed, setCollapsed } = useSidebarContext();

	return (
		<aside className="h-screen z-[20] sticky top-0 bg-default-50 text-default-900">
			{collapsed ? (
				<div className={Sidebar.Overlay()} onClick={setCollapsed} />
			) : null}
			<div
				className={Sidebar({
					collapsed: collapsed,
				})}
			>
				<div className={Sidebar.Header()}>
					<h2 className="text-lg text-default-900 font-semibold">School</h2>
				</div>
				<div className="flex flex-col justify-between h-full bg-default-50 text-default-900">
					<div className={Sidebar.Body()}>
						<SidebarItem
							title="Home"
							icon={<HomeIcon />}
							isActive={pathname === "/student"}
							href="/student"
						/>
						<SidebarMenu title="Assignment">
							<SidebarItem
								title="Current"
								icon={<MdOutlineAssignment />}
								isActive={pathname === "/student/assignment/current"}
								href="/student/assignment/current"
							/>
							<SidebarItem
								title="Submitted"
								icon={<IoMdCheckmarkCircleOutline />}
								isActive={pathname === "/student/assignment/submitted"}
								href="/student/assignment/submitted"
							/>
						</SidebarMenu>

						<SidebarMenu title="Performance">
							<SidebarItem
								isActive={pathname === "/student/performance/grades"}
								href="/student/performance/grades"
								title="Grades"
								icon={<MdOutlineGrade />}
							/>
							<SidebarItem
								isActive={pathname === "/student/performance/reports"}
								title="Report Cards"
								href="/student/performance/reports"
								icon={<ReportsIcon />}
							/>
							<SidebarItem
								isActive={pathname === "/student/performance/attendance"}
								title="Attendance"
								href="/student/performance/attendance"
								icon={<FaCalendarCheck />}
							/>
						</SidebarMenu>

						<SidebarMenu title="Communication">
							<SidebarItem
								isActive={pathname === "/student/communication/messages"}
								title="Messages"
								href="/student/communication/messages"
								icon={<MdMessage />}
							/>

							<SidebarItem
								isActive={pathname === "/student/communication/announcements"}
								href="/student/communication/announcements"
								title="Announcements"
								icon={<MdConnectWithoutContact />}
							/>

							<SidebarItem
								isActive={pathname === "/student/communication/connect-teacher"}
								title="Connect Teacher"
								href="/student/communication/connect-teache"
								icon={<CustomersIcon />}
							/>
						</SidebarMenu>
					</div>
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
};
