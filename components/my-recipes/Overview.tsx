import Link from "next/link";

const Overview = () => {
	return (
		<section className="flex bg-neutral-100 rounded border border-neutral-200">
			{/* Info */}
			<div className="flex flex-col gap-7 px-6 py-8 grow">
				{/* Recipe + Ingredient count */}
				<div className="flex gap-16">
					{/* Recipe count */}
					<div className="flex gap-2">
						<p className="font-semibold text-neutral-600">Recipes:</p>
						<p className="text-5xl">17</p>
					</div>
					{/* Ingredient count */}
					<div className="flex gap-2">
						<p className="font-semibold text-neutral-600">Ingredients:</p>
						<p className="text-5xl">9</p>
					</div>
				</div>

				{/* Encouragement */}
				<p className="text-neutral-600 font-medium">
					17 recipes, Impressive! Keep adding more to expand your cooking archive!
				</p>
			</div>

			{/* Actions */}
			<div className="flex flex-col gap-4 px-6 py-7">
				<Link
					href="/available-recipes"
					className="p-4 text-nowrap bg-sky-600 rounded text-white font-semibold text-center hover:bg-sky-700"
				>
					See What You Can Make?
				</Link>
				<Link
					href="/my-ingredients"
					className="p-4 text-nowrap rounded font-semibold text-center hover:underline decoration-2 underline-offset-4"
				>
					View All Ingredients
				</Link>
			</div>
		</section>
	);
};

export default Overview;
