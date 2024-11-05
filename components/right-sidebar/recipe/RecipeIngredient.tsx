import ToolTipContainer from "@/components/common/ToolTipContainer";
import { IngredientProps } from "@/types";
import { Fragment } from "react";
import {
	MdOutlineCheck,
	MdOutlineClose,
	MdAddShoppingCart,
	MdOutlineInventory2,
} from "react-icons/md";

const RecipeIngredient = ({ ingredient }: IngredientProps) => {
	const addToInventoryAction = (
		<ToolTipContainer toolTipContent="Have it? Add to inventory">
			<div className="p-0.5 rounded-md cursor-pointer hover:bg-neutral-200">
				<MdOutlineInventory2 className="text-lg" />
			</div>
		</ToolTipContainer>
	);

	const addToCartAction = (
		<ToolTipContainer toolTipContent="Add to shopping list">
			<div className="p-0.5 rounded-md cursor-pointer hover:bg-neutral-200">
				<MdAddShoppingCart className="text-lg" />
			</div>
		</ToolTipContainer>
	);

	const removeFromInventoryAction = (
		<ToolTipContainer toolTipContent={`Ran out? Remove from inventory`}>
			<div className="p-0.5 rounded-md cursor-pointer hover:bg-neutral-200">
				<MdOutlineClose className="text-lg" />
			</div>
		</ToolTipContainer>
	);

	return (
		<div className="flex justify-between items-center">
			<div className="flex gap-2 items-center">
				{ingredient.isAvailable ? (
					<MdOutlineCheck className="text-lg text-emerald-500" />
				) : (
					<MdOutlineClose className="text-lg text-red-500" />
				)}
				<p className="font-medium">
					{ingredient.name}
					{ingredient.amount && (
						<span>
							{":"} {ingredient.amount}
						</span>
					)}
				</p>
			</div>
			<div className="flex gap-2 items-center">
				{ingredient.isAvailable ? (
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
