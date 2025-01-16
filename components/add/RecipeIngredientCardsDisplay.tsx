import { TAddRecipeIngredientSchema } from "@/types";
import RecipeIngredientCard from "./RecipeIngredientCard";

interface RecipeIngredientCardsDisplayProps {
	ingredientType: "Primary" | "Secondary" | "Optional";
	ingredients: TAddRecipeIngredientSchema[];
	onEdit: (index: number, ingredient: TAddRecipeIngredientSchema) => void;
	onDelete: (index: number) => void;
	isSubmitting: boolean;
}

const RecipeIngredientCardsDisplay = ({
	ingredientType,
	ingredients,
	onEdit,
	onDelete,
	isSubmitting,
}: RecipeIngredientCardsDisplayProps) => {
	const recipeIngredients = ingredients.filter((ingredient) => {
		return ingredient.ingredientType === ingredientType;
	});

	const renderedRecipeIngredients = recipeIngredients.map((ingredient, index) => {
		return (
			<RecipeIngredientCard
				key={ingredient.name}
				ingredient={ingredient}
				index={index}
				onEdit={onEdit}
				onDelete={onDelete}
				isSubmitting={isSubmitting}
			/>
		);
	});

	const title =
		ingredientType === "Primary"
			? "Primary Ingredients"
			: ingredientType === "Secondary"
			? "Secondary Ingredients"
			: "Optional Ingredients";

	return (
		<section className="flex flex-col gap-2">
			<p className="font-medium text-sm select-none">{title}</p>
			<div
				className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
				gap-3 custom-sm:gap-4 lg:gap-6"
			>
				{renderedRecipeIngredients}
			</div>
		</section>
	);
};

export default RecipeIngredientCardsDisplay;
