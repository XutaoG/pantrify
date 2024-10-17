import React from "react";
import RecipeView from "./RecipeView";

const RightSideBar = () => {
	return (
		<section className="min-h-full pr-2 border-l-neutral-300 flex flex-col">
			{/* pattern */}
			<div className="min-h-24 h-24 bg-sky-600" />
			<RecipeView />
		</section>
	);
};

export default RightSideBar;
