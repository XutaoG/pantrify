import { MdOutlineRefresh } from "react-icons/md";

const MainContentLoading = () => {
	return (
		<div className="grow flex flex-col justify-center items-center">
			<div className="flex items-center gap-2 animate-bounce">
				<MdOutlineRefresh className="text-2xl animate-spin" />
				<p className="text-xl">Loading...</p>
			</div>
		</div>
	);
};

export default MainContentLoading;
