"use client";

import React, { memo, useMemo } from "react";
import { Sidebar } from "./sidebar.styles";
import { Avatar, Tooltip, Spinner } from "@nextui-org/react";
import {
	FilterIcon,
	SettingsIcon,
} from "@/components/icons/sidebar/index";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { useSidebarContext } from "../../student/layout-context";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

import { sidebarData } from "@/constant/sidebarData";

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
			return renderMenuItems(sidebarData[role], pathname);
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
					<div className={Sidebar.Body()}>
						{menuItems}
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
});

export default SidebarWrapper;
