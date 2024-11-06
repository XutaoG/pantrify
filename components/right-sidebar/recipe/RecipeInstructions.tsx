import CollapsiblePanel from "@/components/common/CollapsiblePanel";
import { mockInstructions } from "@/constants";

const RecipeInstructions = () => {
	const instructions = mockInstructions.map((instruction) => {
		return (
			<li key={instruction.step} className="font-medium">
				{instruction.instruction}
			</li>
		);
	});

	return (
		<CollapsiblePanel title="Instructions">
			<ol className="list-decimal list-inside flex flex-col gap-1">
				{instructions}
			</ol>
		</CollapsiblePanel>
	);
};

export default RecipeInstructions;
