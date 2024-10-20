import {
	MdOutlineRestaurantMenu,
	MdOutlineEgg,
	MdAddShoppingCart,
	MdLightbulbOutline,
} from "react-icons/md";
import Divider from "./Divider";

const QuickActions = () => {
	return (
		<section
			className="absolute bg-neutral-100 border border-neutral-200 rounded
			p-3 right-8 bottom-6 shadow-md flex flex-col gap-1"
		>
			{/* Add recipe */}
			<button className="flex items-center gap-3 px-3 py-2 hover:bg-neutral-200 rounded">
				<MdOutlineRestaurantMenu className="text-2xl text-emerald-500" />
				<p className="font-semibold">Add Recipe</p>
			</button>
			<Divider />

			{/* Add ingredient */}
			<button className="flex items-center gap-3 px-3 py-2 hover:bg-neutral-200 rounded">
				<MdOutlineEgg className="text-2xl text-sky-500" />
				<p className="font-semibold">Add Ingredient</p>
			</button>
			<Divider />

			{/* Add shopping list */}
			<button className="flex items-center gap-3 px-3 py-2 hover:bg-neutral-200 rounded">
				<MdAddShoppingCart className="text-2xl text-violet-500" />
				<p className="font-semibold">Add Shopping Item</p>
			</button>
			<Divider />

			{/* Surprise me */}
			<button className="flex items-center gap-3 px-3 py-2 hover:bg-neutral-200 rounded">
				<MdLightbulbOutline className="text-2xl text-yellow-500" />
				<p className="font-semibold">Surprise Me</p>
			</button>
		</section>
	);
};

export default QuickActions;
