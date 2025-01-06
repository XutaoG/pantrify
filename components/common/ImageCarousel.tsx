"use client";

import { RecipeImage } from "@/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ImageCarouselProps {
	images: RecipeImage[];
}

const ImageCarousel = ({ images }: ImageCarouselProps) => {
	const [imageIndex, setImageIndex] = useState(0);

	useEffect(() => {
		setImageIndex(0);
	}, [images]);

	const prevImage = () => {
		if (imageIndex === 0) {
			return;
		}

		setImageIndex((val) => val - 1);
	};

	const nextImage = () => {
		if (imageIndex === images.length - 1) {
			return;
		}

		setImageIndex((val) => val + 1);
	};

	const renderedImages = images.map((image, index) => {
		return (
			<Image
				key={image.id}
				src={image.path}
				className={`object-cover ${index === imageIndex || "hidden"}`}
				fill
				sizes="33vw"
				alt="recipe image"
			/>
		);
	});

	const renderedIndicators = images.map((image, index) => {
		return (
			<button
				key={image.id}
				type="button"
				className={`size-3 rounded-full bg-black/60 ${imageIndex === index && "bg-black"}`}
				onClick={() => setImageIndex(index)}
			/>
		);
	});

	return (
		<div className="size-full relative">
			{/* Carousel wrapper */}
			<div className="relative size-full overflow-hidden rounded-lg">
				{/* Images */}
				{renderedImages}
			</div>

			{/* Slider indicators */}
			{images.length > 1 && (
				<div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
					{renderedIndicators}
				</div>
			)}

			{/* Previous image button */}
			{imageIndex !== 0 && (
				<div className="absolute inset-y-0 left-2 z-30 h-full flex items-center justify-center cursor-pointer">
					<button
						type="button"
						className="size-8 bg-black/60 hover:bg-black/80 rounded-full flex justify-center items-center"
						onClick={prevImage}
					>
						<ChevronLeft color="white" />
					</button>
				</div>
			)}

			{/* Next image button */}
			{imageIndex !== images.length - 1 && (
				<div className="absolute inset-y-0 right-2 z-30 h-full flex items-center justify-center cursor-pointer">
					<button
						type="button"
						className="size-8 bg-black/60 hover:bg-black/80 rounded-full flex justify-center items-center"
						onClick={nextImage}
					>
						<ChevronRight color="white" />
					</button>
				</div>
			)}
		</div>
	);
};

export default ImageCarousel;
