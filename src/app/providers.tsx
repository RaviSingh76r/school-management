"use client";

import { NextUIProvider } from "@nextui-org/react";
import AuthProvider from "@/context/authContext";
import { ThemeProvider as NextThemeProvider } from "next-themes";

import { PrimeReactProvider } from "primereact/api";

interface ProviderProps {
	children: React.ReactNode;
}

const Providers: React.FC<ProviderProps> = ({ children }) => {
	return (
		<div>
			<NextUIProvider>
				<PrimeReactProvider>
					<NextThemeProvider>
						<AuthProvider>{children}</AuthProvider>
					</NextThemeProvider>
				</PrimeReactProvider>
			</NextUIProvider>
		</div>
	);
};

export default Providers;
