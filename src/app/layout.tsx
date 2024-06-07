import type { Metadata } from "next";
import "./globals.css";

import Providers from "./providers";


export const metadata: Metadata = {
	title: "School Management System",
	description:
		"This is a fully fledged school dashboard for student, teacher, principal, and parent. This helps them to monitor every important aspects...",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<div className="min-h-screen min-w-full">
					<Providers>{children}</Providers>
				</div>
			</body>
		</html>
	);
}
