import React from "react";
import RecipeView from "./RecipeView";

const RightSideBar = () => {
	return (
		<section className="w-[450px] min-w-[450px] border-l border-l-neutral-300 flex flex-col">
			{/* pattern */}
			<div className="h-24 bg-sky-600" />
			<RecipeView />
		</section>
	);
};

export default RightSideBar;
