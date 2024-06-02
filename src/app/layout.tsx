import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "School Landing Page || School Dashboard",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`dark ${inter.className}`}>
				<div className="min-h-screen min-w-full ">
					<Providers>{children}</Providers>
				</div>
			</body>
		</html>
	);
}
