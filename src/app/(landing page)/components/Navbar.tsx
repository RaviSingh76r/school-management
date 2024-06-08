"use client";

import React from "react";

// Next JS stuffs
import { usePathname, useRouter } from "next/navigation";
import {
	Navbar as NextUINavbar,
	NavbarBrand,
	NavbarItem,
	NavbarContent,
	Button,
	useDisclosure,
} from "@nextui-org/react";
import Link from "next/link";

import { useModal } from "@/context/modalContext";

const Navbar = () => {
	const pathname = usePathname();
	const router = useRouter();

	const {setIsOpen, isOpen} = useModal()

	const sidebarLinks = [
		{ title: "Home", url: "/", isActive: pathname === "/" },
		{ title: "Results", url: "/results", isActive: pathname === "/results" },
		{ title: "Need Help", url: "/help", isActive: pathname === "/help" },
		{ title: "Contact Us", url: "/contact", isActive: pathname === "/contact" },
		{ title: "About Us", url: "/about", isActive: pathname === "/about" },
	];

	return (
		<NextUINavbar
			height={3}
			isBordered
			className="p-2"
			classNames={{
				item: [
					"flex",
					"relative",
					"h-full",
					"items-center",
					"data-[active=true]:after:content-['']",
					"data-[active=true]:after:absolute",
					"data-[active=true]:after:bottom-0",
					"data-[active=true]:after:left-0",
					"data-[active=true]:after:right-0",
					"data-[active=true]:after:h-[2px]",
					"data-[active=true]:after:rounded-[2px]",
					"data-[active=true]:after:bg-foreground",
				],
			}}
		>
			<NavbarContent justify="start">
				<NavbarBrand>
					<NavbarItem>
						<Link href={"/"} color="foreground" >
							School
						</Link>
					</NavbarItem>
				</NavbarBrand>
			</NavbarContent>
			<NavbarContent className="md:flex hidden">
				{sidebarLinks.map((link, index) => (
					<NavbarItem key={index} isActive={link.isActive}>
						<Link href={link.url} color="foreground" >
							{link.title}
						</Link>
					</NavbarItem>
				))}
			</NavbarContent>
			<NavbarContent justify="end">
				<Button
					size="sm"
					color="primary"
					variant="flat"
					onClick={()=>{
						setIsOpen(true)
						router.push("/login")
						}}
				>
					Login
				</Button>
			</NavbarContent>
		</NextUINavbar>
	);
};

export default Navbar;
