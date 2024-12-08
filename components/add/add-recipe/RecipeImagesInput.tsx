"use client";

import { ChevronLeft, ChevronRight, Images, Plus } from "lucide-react";
import { ChangeEvent, useState } from "react";
import RecipeImageCard from "./RecipeImageCard";

const RecipeImagesInput = () => {
	const isSubmitting = false;

	const [images, setImages] = useState<File[]>([]);

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files.length > 0) {
			setImages([...images, event.target.files[0]]);
		}
	};

	// Render all recent recipe cards
	const recipeCards = images.map((image, id) => {
		return <RecipeImageCard image={image} key={id} />;
	});

	return (
		<div className="h-72 card-container rounded-xl flex flex-col px-4 py-2 justify-end gap-2 relative">
			{/* Title */}
			<div className="flex items-center gap-1.5">
				<Images size={16} />
				<p className="text-sm font-semibold text-neutral-600 select-none">Images</p>
			</div>

			<div className="grow flex flex-col gap-4">
				{/* Images */}
				<div className="grow flex gap-5 overflow-x-hidden relative">
					{recipeCards}

					{/* Previous recipe button */}
					<div className="absolute left-2 inset-y-0 size-8 my-auto flex items-center z-20">
						<button
							type="button"
							className={`size-8 bg-black/60 hover:bg-black/80 rounded-full flex justify-center items-center`}
						>
							<ChevronLeft color="white" />
						</button>
					</div>

					{/* Next recipe button */}
					<div className="absolute right-2 inset-y-0 size-8 my-auto flex items-center z-20">
						<button
							type="button"
							className={`size-8 bg-black/60 hover:bg-black/80 rounded-full flex justify-center items-center`}
						>
							<ChevronRight color="white" />
						</button>
					</div>
				</div>

				{/* Add image button */}
				<label
					htmlFor="file-upload"
					className={`self-center flex items-center bg-neutral-200 p-1 rounded-full cursor-pointer ${
						isSubmitting ? "cursor-not-allowed" : "hover:bg-neutral-300"
					}`}
				>
					<Plus size={28} color="white" strokeWidth={2} />
				</label>
				<input
					className="hidden"
					id="file-upload"
					type="file"
					accept="image/*"
					onChange={handleFileChange}
				/>
			</div>
		</div>
	);
};

export default RecipeImagesInput;
