"use client";

import NextLink from "next/link";
import React from "react";
import { useSidebarContext } from "../../student/layout-context";
import clsx from "clsx";

interface Props {
	title: string;
	icon: any;
	isActive?: boolean;
	href?: string;
}

export const SidebarItem = ({ icon: Icon, title, isActive, href = "" }: Props) => {
	const { collapsed, setCollapsed } = useSidebarContext();

	const handleClick = () => {
		if (window.innerWidth < 768) {
			setCollapsed();
		}
	};
	return (
		<NextLink href={href} className="active:bg-none max-w-full">
			<div
				className={clsx(
					isActive ? "bg-primary-100" : "hover:bg-default-50",
					"flex gap-2 w-full min-h-[44px] h-full items-center px-3.5 rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.98]"
				)}
				onClick={handleClick}
			>
				<span
					className={clsx(
						"text-2xl",
						isActive ? "text-primary-500" : "text-default-400"
					)}
				>
					{<Icon />}
				</span>
				<span className="text-default-900">{title}</span>
			</div>
		</NextLink>
	);
};
