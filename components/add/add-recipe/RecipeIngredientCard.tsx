import { RecipeIngredientCardProps } from "@/types";

const RecipeIngredientCard = ({ ingredient }: RecipeIngredientCardProps) => {
	return (
		<div className="bg-neutral-100 border border-neutral-200 rounded p-2 flex flex-col gap-2">
			<p className="font-semibold">{ingredient.name}</p>
			{ingredient.quantityWhole == "" &&
			ingredient.quantityFraction == "" ? (
				<p className="text-sm text-neutral-600 font-medium">
					Quantity unspecified
				</p>
			) : (
				<p className="text-sm font-medium">{`${ingredient.quantityWhole} ${ingredient.quantityFraction} ${ingredient.quantityUnit}`}</p>
			)}
		</div>
	);
};

export default RecipeIngredientCard;
