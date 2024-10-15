import { mockRecipes2 } from "@/constants";
import SmallRecipeCard from "../common/SmallRecipeCard";

const AllRecipes = () => {
	const recipeCards = mockRecipes2.map((recipe) => {
		return <SmallRecipeCard recipe={recipe} key={recipe.name} />;
	});

	return <section className="grid grid-cols-3 gap-6">{recipeCards}</section>;
};

export default AllRecipes;
