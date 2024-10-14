import Overview from "@/components/my-recipes/Overview";

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
		</main>
	);
};

export default Home;
