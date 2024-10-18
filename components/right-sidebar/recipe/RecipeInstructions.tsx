import CollapsiblePanel from "@/components/common/CollapsiblePanel";
import { mockInstructions } from "@/constants";

const RecipeInstructions = () => {
	const instructions = mockInstructions.map((step, index) => {
		return (
			<li key={index} className="font-medium">
				{step}
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
