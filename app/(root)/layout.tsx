import QuickActions from "@/components/common/QuickActions";
import LeftSideBar from "@/components/left-sidebar/LeftSideBar";
import RecipeView from "@/components/right-sidebar/recipe/RecipeView";
import RightSideBar from "@/components/right-sidebar/RightSideBar";
import { ReactNode } from "react";

const RootLayout = ({
	children,
}: Readonly<{
	children: ReactNode;
}>) => {
	return (
		<main className="min-h-screen max-h-screen flex">
			{/* Left sidebar */}
			<LeftSideBar />

			{/* Main content */}
			<div className="grow flex min-w-0 relative p-2 pr-0">
				{children}

				{/* Quick actions */}
				<QuickActions />
			</div>

			{/* Right sidebar */}
			<RightSideBar>
				<RecipeView />
			</RightSideBar>
		</main>
	);
};

export default RootLayout;
