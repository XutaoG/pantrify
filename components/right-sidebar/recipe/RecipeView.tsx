import Image from "next/image";
import RecipeInfo from "./RecipeInfo";
import RecipeInstructions from "./RecipeInstructions";
import RecipePrimaryIngredients from "./RecipePrimaryIngredients";
import RecipeSecondaryIngredients from "./RecipeSecondaryIngredients";
import RecipeOptionalIngredients from "./RecipeOptionalIngredients";
import { Recipe } from "@/types";

interface RecipeviewProps {
	recipe: Recipe;
}

const RecipeView = ({ recipe }: RecipeviewProps) => {
	return (
		<section className="flex flex-col gap-6">
			{/* Recipe name */}
			<div className="flex flex-col">
				<p className="text-sm font-semibold text-neutral-600">Recipe name</p>
				<h3 className="font-medium tracking-wide">Ground Beef Spaghetti</h3>
			</div>

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
