import QuickActions from "@/components/common/QuickActions";
import LeftSideBar from "@/components/left-sidebar/LeftSideBar";
import RecipeView from "@/components/right-sidebar/recipe/RecipeView";
import RightSideBar from "@/components/right-sidebar/RightSideBar";
import { getUser } from "@/services/api";
import { User } from "@/types";
import { AxiosError } from "axios";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const RootLayout = async ({
	children,
}: Readonly<{
	children: ReactNode;
}>) => {
	// Redirect user to "/login" if not currently logged in
	if ((await getUser()) == null) {
		redirect("/login");
	}

	return (
		<main className="min-h-screen max-h-screen flex">
			{/* Left sidebar */}
			<LeftSideBar />

			{/* Main content */}
			<div className="grow flex flex-col min-w-0 relative p-2 pr-0">
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
