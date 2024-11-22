import Image from "next/image";
import RecipeInfo from "./RecipeInfo";
import RecipeInstructions from "./RecipeInstructions";
import RecipePrimaryIngredients from "./RecipePrimaryIngredients";
import RecipeSecondaryIngredients from "./RecipeSecondaryIngredients";
import RecipeOptionalIngredients from "./RecipeOptionalIngredients";

const RecipeView = () => {
	return (
		<section className="flex flex-col gap-6">
			{/* Recipe name */}
			<h3 className="font-bold">Ground Beef Spaghetti</h3>

			{/* Image */}
			<div className="h-60 w-full relative rounded-lg overflow-hidden">
				<Image
					src="/temp-recipe-images/spaghetti.jpg"
					alt="recipe image"
					fill
					className="object-cover"
					sizes="33vw"
					priority
				/>
			</div>

			{/* Basic infos */}
			<RecipeInfo />
			{/* Primary ingredients */}
			<RecipePrimaryIngredients />
			{/* Secondary ingredient */}
			<RecipeSecondaryIngredients />
			{/* Optional ingredients */}
			<RecipeOptionalIngredients />
			{/* Instructions */}
			<RecipeInstructions />
		</section>
	);
};

export default RecipeView;
