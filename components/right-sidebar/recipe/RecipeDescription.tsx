import CollapsiblePanel from "@/components/common/CollapsiblePanel";
import { Recipe } from "@/types";

interface RecipeDescriptionProps {
	recipe: Recipe;
}

const RecipeDescription = ({ recipe }: RecipeDescriptionProps) => {
	if (recipe.description == null || recipe.description.trim().length === 0) {
		return null;
	}

	return (
		<CollapsiblePanel title="Description">
			<p className="">{recipe.description}</p>
		</CollapsiblePanel>
	);
};

export default RecipeDescription;
