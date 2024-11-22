import LeftSideBar from "@/components/left-sidebar/LeftSideBar";
import IngredientView from "@/components/right-sidebar/ingredient/IngredientView";
import RecipeView from "@/components/right-sidebar/recipe/RecipeView";
import RightSideBar from "@/components/right-sidebar/RightSideBar";
import { ReactNode } from "react";

const RootLayout = async ({
	children,
}: Readonly<{
	children: ReactNode;
}>) => {
	return (
		<main className="min-h-screen max-h-screen flex bg-gray-100">
			{/* Left sidebar */}
			<section className="flex p-4 pr-0">
				<LeftSideBar />
			</section>

			{/* Main content */}
			<section className="grow min-w-0 flex p-4 my-4">{children}</section>

			{/* Right sidebar */}
			<section className="flex p-4 pl-0">
				<RightSideBar>
					<RecipeView />
					{/* <IngredientView /> */}
				</RightSideBar>
			</section>
		</main>
	);
};

export default RootLayout;
