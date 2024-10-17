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
			<div className="grow my-1 mr-1 overflow-y-scroll">{children}</div>
			<div className="min-h-full my-1 mr-1 overflow-y-scroll w-[450px] min-w-[450px]">
				<RightSideBar />
			</div>
		</main>
	);
};

export default RootLayout;
