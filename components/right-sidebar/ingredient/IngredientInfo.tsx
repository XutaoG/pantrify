"use client";

import CollapsiblePanel from "@/components/common/CollapsiblePanel";
import InfoWidget from "@/components/common/InfoWidget";
import { CalendarPlus, CalendarX2, CookingPot, Pencil, ShoppingCart, Trash2 } from "lucide-react";

const IngredientInfo = () => {
	return (
		<div className="flex flex-col gap-6">
			{/* Row 1 */}
			<div className="flex justify-between items-center">
				{/* Quantity */}
				<InfoWidget
					icon={<CookingPot size={16} />}
					iconColor="text-emerald-500"
					text="N/A"
				/>
				{/* Date added */}
				<InfoWidget
					icon={<CalendarPlus size={16} />}
					iconColor="text-orange-500"
					text="12/4/24"
				/>
				{/* Date expires */}
				<InfoWidget
					icon={<CalendarX2 size={16} />}
					iconColor="text-sky-500"
					text="1/6/25"
				/>
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

			{/* Notes */}
			<CollapsiblePanel title="Notes">
				<p className="font-semibold text-neutral-600 text-sm">Some may be cracked.</p>
			</CollapsiblePanel>
		</div>
	);
};

export default IngredientInfo;
