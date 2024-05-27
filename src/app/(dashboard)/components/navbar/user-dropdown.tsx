"use client";

import {
	Avatar,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	NavbarItem,
	Link,
} from "@nextui-org/react";
import React from "react";
import { DarkModeSwitch } from "./darkmodeswitch";

import { signOut, useSession } from "next-auth/react";

export const UserDropdown = () => {
	const { data: session } = useSession();

	return (
		<Dropdown className="bg-default-50">
			<NavbarItem>
				<DropdownTrigger>
					<Avatar
						as="button"
						color="secondary"
						size="md"
						src={
							session?.user.avatar ||
							"https://i.pravatar.cc/150?u=a042581f4e29026704d"
						}
					/>
				</DropdownTrigger>
			</NavbarItem>
			<DropdownMenu
				aria-label="User menu actions"
				onAction={(actionKey) => console.log({ actionKey })}
				className="bg-default-50 text-default-900"
			>
				<DropdownItem
					key="profile"
					className="flex flex-col justify-start w-full items-start"
				>
					<p>Signed in as</p>
					<p>{session?.user.email}</p>
				</DropdownItem>
				<DropdownItem key="settings">
					<Link href="/settings" color="foreground">Settings</Link>
				</DropdownItem>
				<DropdownItem
					key="logout"
					color="danger"
					className="text-danger "
					onClick={() => signOut({ redirect: true })}
				>
					Log Out
				</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	);
};
