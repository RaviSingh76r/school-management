"use client";

import React, { Suspense, useState } from "react";

import { useLockedBody } from "@/components/hooks/useBodyLock";
import { NavbarWrapper } from "../components/navbar/navbar";
import SidebarWrapper from "../components/sidebar/sidebar";
import { SidebarContext } from "./layout-context";
import { usePathname } from "next/navigation";

import Loading from "./loading";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";

interface Props {
	children: React.ReactNode;
}

const StudentLayout = ({ children }: Props) => {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [_, setLocked] = useLockedBody(false);
	const handleToggleSidebar = () => {
		setSidebarOpen(!sidebarOpen);
		setLocked(!sidebarOpen);
	};
	const pathname = usePathname()
	const pathnameValue = pathname.split("/")

	return (
		<SidebarContext.Provider
			value={{
				collapsed: sidebarOpen,
				setCollapsed: handleToggleSidebar,
			}}
		>
			<section className="flex">
				<SidebarWrapper />
				<Suspense fallback={<Loading />}>
					<NavbarWrapper>
						<div>
							<Breadcrumbs className="p-2">
								{pathnameValue.map((link, index)=>(
									<BreadcrumbItem key={index}>
										{link.charAt(0).toUpperCase() + link.slice(1)}
									</BreadcrumbItem>
								))}
							</Breadcrumbs>
							{children}
						</div>
					</NavbarWrapper>
				</Suspense>
			</section>
		</SidebarContext.Provider>
	);
};

export default StudentLayout;
