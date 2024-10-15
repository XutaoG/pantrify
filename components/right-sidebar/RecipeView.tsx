import Image from "next/image";
import RecipeInfo from "./RecipeInfo";
import PrimaryIngredients from "./PrimaryIngredients";
import SecondaryIngredients from "./SecondaryIngredients";
import OptionalIngredients from "./OptionalIngredients";
import RecipeInstructions from "./RecipeInstructions";

const RecipeView = () => {
	return (
		<section>
			{/* Image */}
			<div className="h-60 w-full relative">
				<Image
					src="/temp-recipe-images/spaghetti.jpg"
					alt="recipe image"
					fill
					className="object-cover"
					sizes="33vw"
					priority
				/>
			</div>

			{/* Info */}
			<div className="p-5 flex flex-col gap-6">
				{/* Recipe name */}
				<h3 className="font-bold ">Ground Beef Spaghetti</h3>
				{/* Basic infos */}
				<RecipeInfo />
				{/* Primary ingredients */}
				<PrimaryIngredients />
				{/* Secondary ingredient */}
				<SecondaryIngredients />
				{/* Optional ingredients */}
				<OptionalIngredients />
				{/* Instructions */}
				<RecipeInstructions />
			</div>
		</section>
	);
};

export default RecipeView;
