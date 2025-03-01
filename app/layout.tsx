import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";

export const metadata: Metadata = {
	title: "Pantrify",
	description: "Your recipe memories, perfectly kept.",
};

// Get font Inter
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${inter.className} overflow-hidden`}>
				{children}
			</body>
		</html>
	);
}
