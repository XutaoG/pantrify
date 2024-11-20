import ToolTipContainer from "@/components/common/ToolTipContainer";
import { RecipeIngredientProps } from "@/types";
import { Archive, Check, CircleMinusIcon, ShoppingCart, X } from "lucide-react";
import { Fragment } from "react";

const RecipeIngredient = ({ recipeIngredient }: RecipeIngredientProps) => {
	const addToInventoryAction = (
		<ToolTipContainer toolTipContent="Have it? Add to inventory">
			<button type="button" className="p-0.5 rounded-md cursor-pointer hover:bg-neutral-200">
				<Archive size={16} />
			</button>
		</ToolTipContainer>
	);

	const addToCartAction = (
		<ToolTipContainer toolTipContent="Add to shopping list">
			<button type="button" className="p-0.5 rounded-md cursor-pointer hover:bg-neutral-200">
				<ShoppingCart size={16} />
			</button>
		</ToolTipContainer>
	);

	const removeFromInventoryAction = (
		<ToolTipContainer toolTipContent={`Ran out? Remove from inventory`}>
			<button type="button" className="p-0.5 rounded-md cursor-pointer hover:bg-neutral-200">
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
				<p className="font-medium">
					{recipeIngredient.name}
					{recipeIngredient.quantity && (
						<span>
							{":"} {recipeIngredient.quantityUnit}
						</span>
					)}
				</p>
			</div>
			<div className="flex gap-2 items-center">
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

export default RecipeIngredient;
