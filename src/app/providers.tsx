"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ClerkProvider } from "@clerk/nextjs";

interface ProviderProps {
	children: React.ReactNode;
}

const Providers: React.FC<ProviderProps> = ({ children }) => {
	return (
		<div>
			<NextUIProvider>
				<ClerkProvider>{children}</ClerkProvider>
			</NextUIProvider>
		</div>
	);
};

export default Providers;
