"use client";

import React, { ReactNode } from "react";

// Custom Components
import Navbar from "./components/Navbar";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

import { ModalContextProvider, useModal } from "@/context/modalContext";

const LandingPageLayout = ({
	auth,
	children,
}: {
	auth: ReactNode;
	children: ReactNode;
}) => {
	return (
		<ModalContextProvider>
			<div>{auth}</div>
			<div>
				<Navbar />
				{children}
			</div>
		</ModalContextProvider>
	);
};

export default LandingPageLayout;
