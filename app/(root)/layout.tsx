import LeftSideBar from "@/components/left-sidebar/LeftSideBar";
import RightSideBar from "@/components/right-sidebar/RightSideBar";
import { ReactNode } from "react";

const RootLayout = ({
	children,
}: Readonly<{
	children: ReactNode;
}>) => {
	return (
		<main className="min-h-screen flex">
			<LeftSideBar />
			<div className="px-7 pt-12 grow min-w-0">{children}</div>
			<RightSideBar />
		</main>
	);
};

export default RootLayout;
