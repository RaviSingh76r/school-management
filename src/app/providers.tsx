"use client";

import { NextUIProvider } from "@nextui-org/react";
import AuthProvider from "@/context/authContext";
import { ThemeProvider as NextThemeProvider } from "next-themes";

interface ProviderProps {
	children: React.ReactNode;
}

const Providers: React.FC<ProviderProps> = ({ children }) => {
	return (
		<div>
			<NextUIProvider>
				<NextThemeProvider>
					<AuthProvider>{children}</AuthProvider>
				</NextThemeProvider>
			</NextUIProvider>
		</div>
	);
};

export default Providers;
