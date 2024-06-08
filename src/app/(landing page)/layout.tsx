"use client";

import React, { ReactNode, Suspense } from "react";

// Custom Components
import Navbar from "./components/Navbar";


import { ModalContextProvider, useModal } from "@/context/modalContext";
import Loading from "./loading";

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
				<Suspense fallback={<Loading/>}>
					{children}
				</Suspense>
			</div>
		</ModalContextProvider>
	);
};

export default LandingPageLayout;
