"use client";

import React from "react";
import {
	MdAccessTime,
	MdOutlineKitchen,
	MdOutlineSpeed,
	MdRestaurant,
	MdCreate,
	MdOutlineDeleteForever,
} from "react-icons/md";
import InfoWidget from "../common/InfoWidget";

const RecipeInfo = () => {
	return (
		<div className="flex flex-col gap-6">
			{/* Row 1 */}
			<div className="flex justify-between items-center">
				{/* Time */}
				<InfoWidget
					icon={<MdAccessTime />}
					iconColor="text-emerald-500"
					text="30m"
				/>
				{/* Difficulty */}
				<InfoWidget
					icon={<MdOutlineSpeed />}
					iconColor="text-orange-500"
					text="Med"
				/>
				{/* Ingredients */}
				<InfoWidget
					icon={<MdOutlineKitchen />}
					iconColor="text-sky-500"
					text="4 Ing."
				/>
			</div>

			{/* Row 2 */}
			<div className="flex justify-between items-center">
				{/* Portion */}
				<InfoWidget
					icon={<MdRestaurant />}
					iconColor="text-violet-500"
					text="2 P."
				/>
				{/* Edit */}
				<InfoWidget
					icon={<MdCreate />}
					iconColor="text-yellow-500"
					text="Edit"
					onClick={() => {}}
				/>
				{/* Delete */}
				<InfoWidget
					icon={<MdOutlineDeleteForever />}
					iconColor="text-red-500"
					text="Delete"
					onClick={() => {}}
				/>
			</div>
		</div>
	);
};

export default RecipeInfo;
