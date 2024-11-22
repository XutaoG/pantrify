import CollapsiblePanel from "@/components/common/CollapsiblePanel";
import { mockInstructions } from "@/constants";

const RecipeInstructions = () => {
	const instructions = mockInstructions.map((instruction) => {
		return <li key={instruction.step}>{instruction.instruction}</li>;
	});

	return (
		<CollapsiblePanel title="Instructions">
			<ol className="p-2 list-decimal list-inside flex flex-col gap-2">{instructions}</ol>
		</CollapsiblePanel>
	);
};

export default RecipeInstructions;
