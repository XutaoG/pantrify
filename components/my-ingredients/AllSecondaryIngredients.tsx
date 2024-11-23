import CollapsiblePanel from "../common/CollapsiblePanel";
import IngredientCard from "../common/IngredientCard";
import { Milk } from "lucide-react";
import { AllSecondaryIngredientsProps } from "@/types";
import Pagination from "../common/Pagination";

const AllSecondaryIngredients = ({
	ingredients,
	pageSize,
	currentPageNumber,
	setCurrentPageNumber,
}: AllSecondaryIngredientsProps) => {
	const secondaryIngredientCards = ingredients?.ingredients.map((ingredient) => {
		return (
			<IngredientCard
				key={ingredient.name}
				ingredient={ingredient}
				icon={<Milk size={20} />}
				mode="ingredient"
			/>
		);
	});

	return (
		secondaryIngredientCards?.length != 0 && (
			<CollapsiblePanel title="Secondary Ingredients">
				<div className="flex flex-col gap-6">
					<div className="grid grid-cols-3 2xl:grid-cols-4 gap-6">
						{secondaryIngredientCards}
					</div>
					<Pagination
						pageSize={pageSize}
						totalCount={ingredients.totalCount}
						currentPageNumber={currentPageNumber}
						setCurrentPageNumber={setCurrentPageNumber}
					/>
				</div>
			</CollapsiblePanel>
		)
	);
};

export default AllSecondaryIngredients;
