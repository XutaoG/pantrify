import { getUser } from "@/api";
import PageTitle from "@/components/common/PageTitle";
import Pagination from "@/components/common/Pagination";
import AllRecipes from "@/components/my-recipes/AllRecipes";
import Overview from "@/components/my-recipes/Overview";
import RecentRecipes from "@/components/my-recipes/RecentRecipes";

const Home = async () => {
	const user = await getUser();

	return (
		<div className="flex flex-col gap-6 px-4 pt-8 overflow-y-auto">
			{/* Welcome Message */}
			<div className="flex flex-col gap-2">
				<h1 className="font-semibold tracking-wide">
					Welcome,{" "}
					<span className="text-sky-600">
						{user?.firstName} {user?.lastName}
					</span>
				</h1>
				<p className="font-medium text-neutral-600">
					Your Recipe Memories, Perfectly Kept.
				</p>
			</div>

			{/* Overview */}
			<Overview />

			{/* Page title */}
			<PageTitle
				title="My Recipes"
				subtitle="Explore and Relive Your Favorite Culinary Moments."
			/>

			{/* Recent Recipes */}
			<RecentRecipes />

			{/* All recipe */}
			<AllRecipes />

			{/* Pagination */}
			<div className="flex justify-center py-8">
				<Pagination />
			</div>
		</div>
	);
};

export default Home;
