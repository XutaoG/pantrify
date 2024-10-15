import SearchBar from "@/components/common/SearchBar";
import AllRecipes from "@/components/my-recipes/AllRecipes";
import Overview from "@/components/my-recipes/Overview";
import RecentRecipes from "@/components/my-recipes/RecentRecipes";

const Home = () => {
	return (
		<main className="flex flex-col gap-6">
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

			{/* Search bar + filter + sort */}
			<div className="flex gap-3">
				<SearchBar />
			</div>

			{/* All recipe */}
			<div className="">
				<AllRecipes />
			</div>
		</main>
	);
};

export default Home;
