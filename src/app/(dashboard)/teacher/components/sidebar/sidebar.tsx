"use client";

import React from "react";
import { Sidebar } from "./sidebar.styles";
import { Avatar, Tooltip } from "@nextui-org/react";
import { CompaniesDropdown } from "./companies-dropdown";
import {
	PaymentsIcon,
	AccountsIcon,
	BalanceIcon,
	BottomIcon,
	ChangeLogIcon,
	ChevronUpIcon,
	CustomersIcon,
	DevIcon,
	FilterIcon,
	HomeIcon,
	ProductsIcon,
	ReportsIcon,
	SettingsIcon,
	ViewIcon,
} from "@/components/icons/sidebar/index";
import { CollapseItems } from "./collapse-items";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { useSidebarContext } from "../../layout-context";
import { usePathname } from "next/navigation";

import { DarkModeSwitch } from "../../../components/navbar/darkmodeswitch";

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
					<CompaniesDropdown />
				</div>
				<div className="flex flex-col justify-between h-full bg-default-50 text-default-900">
					<div className={Sidebar.Body()}>
						<SidebarItem
							title="Home"
							icon={<HomeIcon />}
							isActive={pathname === "/"}
							href="/"
						/>
						<SidebarMenu title="Assignment">
							<SidebarItem
								title="Current"
								icon={<HomeIcon />}
								isActive={pathname === "/dashboard/student/assignment"}
								href="/dashboard/student/assignment"
							/>
							<SidebarItem
								title="Submitted"
								icon={<HomeIcon />}
								isActive={
									pathname === "/dashboard/student/submitted-assignment"
								}
								href="/dashboard/student/submitted-assignment"
							/>
						</SidebarMenu>

						<SidebarMenu title="Performance">
							<SidebarItem
								isActive={pathname === "/grades"}
								title="Grades"
								icon={<DevIcon />}
							/>
							<SidebarItem
								isActive={pathname === "/report-cards"}
								title="Report Cards"
								icon={<ViewIcon />}
							/>
							<SidebarItem
								isActive={pathname === "/attendance"}
								title="Attendance"
								icon={<SettingsIcon />}
							/>
						</SidebarMenu>

						<SidebarMenu title="Communication">
							<SidebarItem
								isActive={pathname === "/messages"}
								title="Messages"
								icon={<ChangeLogIcon />}
							/><SidebarItem
								isActive={pathname === "/announcements"}
								title="Announcements"
								icon={<ChangeLogIcon />}
							/><SidebarItem
								isActive={pathname === "/contact-teachers"}
								title="Contact Teachers"
								icon={<ChangeLogIcon />}
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
