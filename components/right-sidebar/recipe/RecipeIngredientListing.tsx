"use client";

import ToolTipContainer from "@/components/common/ToolTipContainer";
import { Archive, Check, CircleMinusIcon, ShoppingCart, X } from "lucide-react";
import { useContext, useState } from "react";
import { AddIngredientDto, RecipeIngredientAvailability } from "@/types";
import { getQuantityStr } from "@/utils";
import { addIngredient, deleteIngredient } from "@/api";
import { RefreshContext } from "@/components/common/FetchContext";

interface RecipeIngredientListingProps {
	recipeIngredient: RecipeIngredientAvailability;
}

const RecipeIngredientListing = ({ recipeIngredient }: RecipeIngredientListingProps) => {
	const { refresh } = useContext(RefreshContext)!;

	const [isLoading, setIsLoading] = useState(false);

	const submitAddToInventory = async () => {
		const ingredient: AddIngredientDto = {
			name: recipeIngredient.name,
			ingredientType: recipeIngredient.ingredientType,
			isAvailable: true,
			isInCart: false,
		};

		setIsLoading(true);
		await addIngredient(ingredient);
		setIsLoading(false);
		refresh();
	};

	const submitAddToCart = async () => {
		const ingredient: AddIngredientDto = {
			name: recipeIngredient.name,
			ingredientType: recipeIngredient.ingredientType,
			isAvailable: false,
			isInCart: true,
		};

		setIsLoading(true);
		await addIngredient(ingredient);
		setIsLoading(false);
		refresh();
	};

	const submitRemoveFromInventory = async () => {
		if (recipeIngredient.ingredientId != null) {
			setIsLoading(true);
			await deleteIngredient(recipeIngredient.ingredientId);
			setIsLoading(false);
			refresh();
		}
	};

	const addToInventoryAction = (
		<ToolTipContainer toolTipContent="Have it? Add to inventory" position="left">
			<button
				type="button"
				className={`p-1.5 rounded-full hover:bg-neutral-200 ${
					isLoading ? "cursor-not-allowed" : "cursor-pointer"
				}`}
				disabled={isLoading}
				onClick={submitAddToInventory}
			>
				<Archive size={16} />
			</button>
		</ToolTipContainer>
	);

	const addToCartAction = (
		<ToolTipContainer toolTipContent="Add to shopping list" position="left">
			<button
				type="button"
				className={`p-1.5 rounded-full hover:bg-neutral-200 ${
					isLoading ? "cursor-not-allowed" : "cursor-pointer"
				}`}
				disabled={isLoading}
				onClick={submitAddToCart}
			>
				<ShoppingCart size={16} />
			</button>
		</ToolTipContainer>
	);

	const removeFromInventoryAction = (
		<ToolTipContainer toolTipContent={`Ran out? Remove from inventory`} position="left">
			<button
				type="button"
				className={`p-1.5 rounded-full hover:bg-neutral-200 ${
					isLoading ? "cursor-not-allowed" : "cursor-pointer"
				}`}
				disabled={isLoading}
				onClick={submitRemoveFromInventory}
			>
				<CircleMinusIcon size={16} />
			</button>
		</ToolTipContainer>
	);

	const quantityStr = getQuantityStr(recipeIngredient);

	return (
		<div className="flex justify-between items-center">
			<div className="flex gap-4 items-center">
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
					{": "}
					{quantityStr != null && (
						<span className="text-neutral-600 font-medium">{quantityStr}</span>
					)}
				</p>
			</div>
			<div className="flex gap-1 items-center">
				{recipeIngredient.isInCart === false && addToCartAction}
				{recipeIngredient.isAvailable ? removeFromInventoryAction : addToInventoryAction}
			</div>
		</div>
	);
};

export default RecipeIngredientListing;
