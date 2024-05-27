"use client";

import { Input, Tooltip, Navbar, NavbarContent } from "@nextui-org/react";
import React from "react";
import { SupportIcon } from "@/components/icons/navbar/index";
import { BurguerButton } from "./burguer-button";
import { NotificationsDropdown } from "./notifications-dropdown";
import { UserDropdown } from "./user-dropdown";
import { SearchIcon } from "@/components/icons/Searchicon";
import { DarkModeSwitch } from "./darkmodeswitch";

interface Props {
	children: React.ReactNode;
}

export const NavbarWrapper = ({ children }: Props) => {
	return (
		<div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-default-50 text-default-900">
			<Navbar
				isBordered
				className="w-full"
				classNames={{
					wrapper: "w-full max-w-full",
				}}
			>
				<NavbarContent className="md:hidden">
					<BurguerButton />
				</NavbarContent>
				
				<NavbarContent className="w-full max-md:hidden">
					<Input
						startContent={<SearchIcon />}
						isClearable
						className="w-full"
						classNames={{
							input: "w-full",
							mainWrapper: "w-full",
						}}
						placeholder="Search..."
					/>

				</NavbarContent>
				<NavbarContent
					justify="end"
					className="w-fit data-[justify=end]:flex-grow-0"
				>
					<Tooltip content="Notifications" color="primary">
						<NotificationsDropdown />
					</Tooltip>

					<Tooltip content={"Support"} color="primary" placement="top">
						<div className="max-md:hidden cursor-pointer">
							<SupportIcon />
						</div>
					</Tooltip>

					<Tooltip content={"Switch Theme"} color="primary" placement="top">
						<DarkModeSwitch />
					</Tooltip>

					<NavbarContent className="bg-default-50">
						<UserDropdown />
					</NavbarContent>

				</NavbarContent>
			</Navbar>
			{children}
		</div>
	);
};
