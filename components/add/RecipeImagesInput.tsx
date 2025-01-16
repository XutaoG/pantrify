import { Images, LoaderCircle, Plus } from "lucide-react";
import { ChangeEvent } from "react";
import RecipeImageCard from "./RecipeImageCard";

interface RecipeImagesInputProps {
	images: File[];
	onImageAdd: (image: File) => void;
	onImageRemove: (index: number) => void;
	onImageMove: (index: number, direction: number) => void;
	isSubmitting: boolean;
	isFetchingImages: boolean;
}

const RecipeImagesInput = ({
	images,
	onImageAdd,
	onImageRemove,
	onImageMove,
	isSubmitting,
	isFetchingImages,
}: RecipeImagesInputProps) => {
	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files.length > 0) {
			onImageAdd(event.target.files[0]);
		}
	};

	// Render all recent recipe cards
	const recipeCards = images.map((image, id) => {
		return (
			<RecipeImageCard
				key={id}
				index={id}
				image={image}
				onImageRemove={onImageRemove}
				onImageMove={onImageMove}
				isSubmitting={isSubmitting}
			/>
		);
	});

	return (
		<div className="card-container rounded-xl flex flex-col px-4 py-2 justify-end gap-2 relative">
			{/* Title */}
			<div className="flex items-center gap-1.5">
				<Images size={16} />
				<p className="text-sm font-semibold text-neutral-600 select-none">
					Recipe Pictures (optional)
				</p>
			</div>

			<div className="grow flex flex-col gap-4">
				{/* Images */}
				<div className="grow grid grid-cols-1 sm:grid-cols-2 gap-4">{recipeCards}</div>

				{/* Add image button */}
				<label
					htmlFor="file-upload"
					className={`self-center flex items-center bg-neutral-200 p-1 rounded-full ${
						isSubmitting || images.length === 4 || isFetchingImages
							? "cursor-not-allowed"
							: "hover:bg-neutral-300 cursor-pointer"
					}`}
				>
					{isFetchingImages ? (
						<LoaderCircle size={28} color="white" className="animate-spin" />
					) : (
						<Plus size={28} color="white" />
					)}
				</label>
				<input
					className={`hidden cursor-not-allowed`}
					id="file-upload"
					type="file"
					accept="image/*"
					onChange={handleFileChange}
					disabled={isSubmitting || images.length === 4 || isFetchingImages}
				/>
			</div>
		</div>
	);
};

export default RecipeImagesInput;
