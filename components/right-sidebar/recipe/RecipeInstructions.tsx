import CollapsiblePanel from "@/components/common/CollapsiblePanel";
import { Recipe } from "@/types";

interface RecipeInstructionsProps {
	recipe: Recipe;
}

const RecipeInstructions = ({ recipe }: RecipeInstructionsProps) => {
	const instructions = recipe.instructions.map((instruction) => {
		return <li key={instruction.step}>{instruction.instruction}</li>;
	});

	return (
		<CollapsiblePanel title="Instructions">
			<ol className="px-2 list-decimal list-inside flex flex-col gap-2">{instructions}</ol>
		</CollapsiblePanel>
	);
};

export default RecipeInstructions;
