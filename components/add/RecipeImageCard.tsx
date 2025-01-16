"use client";

import { ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import Image from "next/image";
import { Fragment, useState } from "react";

interface RecipeImageCardProps {
	index: number;
	image: File;
	onImageRemove: (index: number) => void;
	onImageMove: (index: number, direction: number) => void;
	isSubmitting: boolean;
}

const RecipeImageCard = ({
	index,
	image,
	onImageRemove,
	onImageMove,
	isSubmitting,
}: RecipeImageCardProps) => {
	const [isHover, setIsHover] = useState(false);

	const onHover = () => {
		if (isSubmitting) {
			return;
		}

		setIsHover(true);
	};

	const onHoverLeave = () => {
		setIsHover(false);
	};

	return (
		<div
			className="h-36 sm:h-44 lg:h-48 relative overflow-hidden rounded-xl border border-neutral-200
			flex justify-center items-center"
			onMouseEnter={onHover}
			onMouseLeave={onHoverLeave}
		>
			{/* Image */}
			<Image
				src={URL.createObjectURL(image)}
				alt="Image"
				fill
				className="absolute inset-0 object-cover"
				sizes="33vw"
				priority
			/>

			{isHover && (
				<Fragment>
					{/* Foreground */}
					<div className="absolute inset-0 bg-black/50" />

					{/* Actions */}
					<div className="flex items-center gap-4 z-10">
						{/* Move left */}
						<button
							type="button"
							onClick={() => onImageMove(index, -1)}
							disabled={isSubmitting}
						>
							<ChevronLeft size={28} color="white" />
						</button>

						{/* Delete */}
						<button
							type="button"
							onClick={() => onImageRemove(index)}
							disabled={isSubmitting}
						>
							<Trash2 size={24} color="white" />
						</button>

						{/* Move right */}
						<button
							type="button"
							onClick={() => onImageMove(index, 1)}
							disabled={isSubmitting}
						>
							<ChevronRight size={28} color="white" />
						</button>
					</div>

					{/* Order */}
					<p className="absolute top-3 left-3 text-sm z-10 text-white">{index + 1}</p>

					{/* File name */}
					<p className="w-48 absolute bottom-3 text-xs z-10 text-white truncate text-ellipsis">
						{image.name}
					</p>
				</Fragment>
			)}
		</div>
	);
};

export default RecipeImageCard;
