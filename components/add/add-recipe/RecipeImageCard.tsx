"use client";

import { ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import Image from "next/image";
import { Fragment, useState } from "react";

interface RecipeImageCardProps {
	image: File;
}

const RecipeImageCard = ({ image }: RecipeImageCardProps) => {
	const [isHover, setIsHover] = useState(false);

	return (
		<div
			className="min-w-72 relative overflow-hidden rounded-xl border border-neutral-200
			flex justify-center items-center"
			onMouseEnter={() => setIsHover(true)}
			onMouseLeave={() => setIsHover(false)}
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
						<button type="button">
							<ChevronLeft size={28} color="white" />
						</button>
						{/* Delete */}
						<button type="button">
							<Trash2 size={24} color="white" />
						</button>
						{/* Move right */}
						<button type="button">
							<ChevronRight size={28} color="white" />
						</button>
					</div>

					{/* File name */}
					<p className="absolute bottom-3 text-xs z-10 text-white">{image.name}</p>
				</Fragment>
			)}
		</div>
	);
};

export default RecipeImageCard;
