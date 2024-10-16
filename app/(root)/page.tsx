import Pagination from "@/components/common/Pagination";
import AllRecipes from "@/components/my-recipes/AllRecipes";
import Overview from "@/components/my-recipes/Overview";
import RecentRecipes from "@/components/my-recipes/RecentRecipes";

const Home = () => {
	return (
		<main className="flex flex-col gap-6 px-7 pt-12 pb-6 min-w-0">
			{/* Welcome Message */}
			<div className="flex flex-col gap-2">
				<h1 className="font-semibold">
					Welcome, <span className="text-sky-600">Xutao Gao</span>
				</h1>
				<p className="font-semibold text-neutral-600">
					Your Recipe Memories, Perfectly Kept.
				</p>
			</div>

			{/* Overview */}
			<Overview />

			{/* Page title */}
			<div className="flex flex-col gap-2">
				<h2 className="font-semibold text-sky-600">My Recipes</h2>
				<p className="text-neutral-600 font-medium">
					Explore and Relive Your Favorite Culinary Moments.
				</p>
			</div>

			{/* Recent Recipes */}
			<RecentRecipes />

			{/* All recipe */}
			<AllRecipes />

			{/* Pagination */}
			<div className="flex justify-center py-8">
				<Pagination />
			</div>
		</main>
	);
};

export default Home;
