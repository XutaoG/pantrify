import { getUser } from "@/api";
import PageTitle from "@/components/common/PageTitle";
import AllRecipes from "@/components/my-recipes/AllRecipes";
import RecentRecipes from "@/components/my-recipes/RecentRecipes";
import { Edu_VIC_WA_NT_Beginner } from "next/font/google";

const edu_vic = Edu_VIC_WA_NT_Beginner({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
});

const Home = async () => {
	const user = await getUser();

	return (
		<div className="grow flex flex-col gap-4 sm:gap-6 p-1 sm:p-4 sm:py-2 overflow-y-auto">
			{/* Welcome Message */}
			<div className="p-1 bg-sky-600 rounded-2xl">
				<div className="flex flex-col gap-2 sm:gap-3 bg-sky-600 p-2 rounded-2xl border-4 border-white">
					<h1 className={`font-normal tracking-wide text-white ${edu_vic.className}`}>
						Welcome, {user?.firstName} {user?.lastName}!
					</h1>
					<p className="font-medium tracking-wide text-white text-sm sm:text-base">
						Your Recipe Memories, Perfectly Kept.
					</p>
				</div>
			</div>

			{/* Overview */}

			{/* Page title */}
			<PageTitle
				title="My Recipes"
				subtitle="Explore and Relive Your Favorite Culinary Moments."
			/>

			{/* Recent Recipes */}
			<RecentRecipes />

			{/* All recipe */}
			<AllRecipes />
		</div>
	);
};

export default Home;
