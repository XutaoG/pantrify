import ActiveViewContextWrapper from "@/components/common/ActiveViewContextWrapper";
import SessionManageWrapper from "@/components/common/SessionManageWrapper";
import LeftSideBar from "@/components/left-sidebar/LeftSideBar";
import RightSideBar from "@/components/right-sidebar/RightSideBar";
import { ReactNode } from "react";

const RootLayout = async ({
	children,
}: Readonly<{
	children: ReactNode;
}>) => {
	return (
		<main className="min-h-screen max-h-screen flex bg-gray-100">
			<ActiveViewContextWrapper>
				{/* Left sidebar */}
				<section className="flex p-4 pr-0">
					<LeftSideBar />
				</section>

				{/* Main content */}
				<SessionManageWrapper>
					<section className="grow min-w-0 flex p-4 pr-0 my-4">{children}</section>
				</SessionManageWrapper>

				{/* Right sidebar */}
				<RightSideBar />
			</ActiveViewContextWrapper>
		</main>
	);
};

export default RootLayout;
