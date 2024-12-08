import ToolTipContainer from "@/components/common/ToolTipContainer";
import { Archive, Check, CircleMinusIcon, ShoppingCart, X } from "lucide-react";
import { Fragment } from "react";
import { RecipeIngredient } from "@/types";

interface RecipeIngredientListingProps {
	recipeIngredient: RecipeIngredient;
}

const RecipeIngredientListing = ({ recipeIngredient }: RecipeIngredientListingProps) => {
	const addToInventoryAction = (
		<ToolTipContainer toolTipContent="Have it? Add to inventory" position="left">
			<button
				type="button"
				className="p-1.5 rounded-full cursor-pointer hover:bg-neutral-200"
			>
				<Archive size={16} />
			</button>
		</ToolTipContainer>
	);

	const addToCartAction = (
		<ToolTipContainer toolTipContent="Add to shopping list" position="left">
			<button
				type="button"
				className="p-1.5 rounded-full cursor-pointer hover:bg-neutral-200"
			>
				<ShoppingCart size={16} />
			</button>
		</ToolTipContainer>
	);

	const removeFromInventoryAction = (
		<ToolTipContainer toolTipContent={`Ran out? Remove from inventory`} position="left">
			<button
				type="button"
				className="p-1.5 rounded-full cursor-pointer hover:bg-neutral-200"
			>
				<CircleMinusIcon size={16} />
			</button>
		</ToolTipContainer>
	);

	return (
		<div className="flex justify-between items-center">
			<div className="flex gap-2 items-center">
				{recipeIngredient.isAvailable ? (
					<div className="text-emerald-500">
						<Check size={18} />
					</div>
				) : (
					<div className="text-red-400">
						<X size={18} />
					</div>
				)}
				<p>
					{recipeIngredient.name}
					{recipeIngredient.quantity && (
						<span>
							{":"} {recipeIngredient.quantityUnit}
						</span>
					)}
				</p>
			</div>
			<div className="flex gap-1 items-center">
				{recipeIngredient.isAvailable ? (
					<Fragment>
						{removeFromInventoryAction}
						{addToCartAction}
					</Fragment>
				) : (
					<Fragment>
						{addToInventoryAction}
						{addToCartAction}
					</Fragment>
				)}
			</div>
		</div>
	);
};

export default RecipeIngredientListing;
