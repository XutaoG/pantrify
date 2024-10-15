import { Recipe } from "@/types";
import SmallRecipeCard from "../common/SmallRecipeCard";

const mockRecipes: Recipe[] = [
	{
		imageUrl: "/temp-recipe-images/fried-rice.webp",
		name: "Fried Rice",
		time: "30m",
		difficulty: "Medium",
		numIngredients: 7,
	},
	{
		imageUrl: "/temp-recipe-images/egg-drop-soup.jpg",
		name: "Egg Drop Soup",
		time: "15m",
		difficulty: "Easy",
		numIngredients: 4,
	},
	{
		imageUrl: "/temp-recipe-images/spaghetti.jpg",
		name: "Ground Beef Spaghetti",
		time: "30m",
		difficulty: "Medium",
		numIngredients: 5,
	},
	{
		imageUrl: "/temp-recipe-images/grilled-cheese-sandwich.webp",
		name: "Grilled cheese Sandwich",
		time: "10m",
		difficulty: "Easy",
		numIngredients: 7,
	},
	{
		imageUrl: "/temp-recipe-images/chow-mein.jpeg",
		name: "Chow Mein",
		time: "15m",
		difficulty: "Easy",
		numIngredients: 4,
	},
	{
		imageUrl: "/temp-recipe-images/shrimp-dumpling.webp",
		name: "Shrimp Dumplings",
		time: "15m",
		difficulty: "Easy",
		numIngredients: 5,
	},
];

const AllRecipes = () => {
	const recipeCards = mockRecipes.map((recipe) => {
		return <SmallRecipeCard recipe={recipe} key={recipe.name} />;
	});

	return <section className="grid grid-cols-3 gap-6">{recipeCards}</section>;
};

export default AllRecipes;
