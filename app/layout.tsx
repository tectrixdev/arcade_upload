import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type { Viewport } from "next";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Arcade uploader",
	description: "Upload your makecode projects to the physical machine!",
};

export const viewport: Viewport = {
	colorScheme: "dark",
	themeColor: "#00000",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className="w-screen h-screen overflow-hidden antialiased bg-black">
				{children}
			</body>
			<Analytics />
		</html>
	);
}
