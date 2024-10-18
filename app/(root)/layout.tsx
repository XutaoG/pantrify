import LeftSideBar from "@/components/left-sidebar/LeftSideBar";
import { ReactNode } from "react";

const RootLayout = ({
	children,
}: Readonly<{
	children: ReactNode;
}>) => {
	return (
		<main className="min-h-screen max-h-screen flex">
			<LeftSideBar />
			{children}
		</main>
	);
};

export default RootLayout;
