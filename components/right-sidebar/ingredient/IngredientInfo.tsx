"use client";

import InfoWidget from "@/components/common/InfoWidget";
import ToolTipContainer from "@/components/common/ToolTipContainer";
import { Ingredient } from "@/types";
import { getUSDate } from "@/utils";
import { CalendarPlus, CalendarX2, Egg, Milk, Pencil, ShoppingCart, Trash2 } from "lucide-react";

interface IngredientInfoProps {
	ingredient: Ingredient;
}

const IngredientInfo = ({ ingredient }: IngredientInfoProps) => {
	return (
		<div className="flex flex-col gap-6">
			{/* Row 1 */}
			<div className="flex justify-between items-center">
				{/* Ingredient type */}
				<ToolTipContainer toolTipContent="abcd" position="right">
					<InfoWidget
						icon={
							ingredient.ingredientType === "Primary" ? (
								<Egg size={16} />
							) : (
								<Milk size={16} />
							)
						}
						iconColor="text-emerald-500"
						text={ingredient.ingredientType}
					/>
				</ToolTipContainer>

				{/* Date added */}
				<ToolTipContainer
					toolTipContent={`Date added: ${
						getUSDate(ingredient.dateAdded ?? null) ?? "N/A"
					}`}
					position="left"
				>
					<InfoWidget
						icon={<CalendarPlus size={16} />}
						iconColor="text-orange-500"
						text={getUSDate(ingredient.dateAdded ?? null) ?? "N/A"}
					/>
				</ToolTipContainer>

				{/* Date expires */}
				<ToolTipContainer
					toolTipContent={`Expiration Date: ${
						getUSDate(ingredient.dateExpired ?? null) ?? "N/A"
					}`}
					position="left"
				>
					<InfoWidget
						icon={<CalendarX2 size={16} />}
						iconColor="text-sky-500"
						text={getUSDate(ingredient.dateExpired ?? null) ?? "N/A"}
					/>
				</ToolTipContainer>
			</div>

			{/* Row 2 */}
			<div className="flex justify-between items-center">
				{/* Add to cart */}
				<InfoWidget
					icon={<ShoppingCart size={16} />}
					iconColor="text-violet-500"
					text="Add to Cart"
					onClick={() => {}}
				/>
				{/* Edit */}
				<InfoWidget
					icon={<Pencil size={16} />}
					iconColor="text-yellow-500"
					text="Edit"
					onClick={() => {}}
				/>
				{/* Delete */}
				<InfoWidget
					icon={<Trash2 size={16} />}
					iconColor="text-red-500"
					text="Delete"
					onClick={() => {}}
				/>
			</div>
		</div>
	);
};

export default IngredientInfo;
