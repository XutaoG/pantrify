import LeftSideBar from "@/components/left-sidebar/LeftSideBar";
import RightSideBar from "@/components/right-sidebar/RightSideBar";
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
			<RightSideBar />
		</main>
	);
};

export default RootLayout;
