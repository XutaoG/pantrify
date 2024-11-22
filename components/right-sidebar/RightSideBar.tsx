import { RightSideBarProps } from "@/types";

const RightSideBar = ({ children }: RightSideBarProps) => {
	return (
		<section
			className="flex flex-col w-[450px] min-w-[450px] p-4 card-container 
			shadow-sm rounded-xl min-h-0"
		>
			<div className="flex flex-col pr-4 overflow-y-auto">{children}</div>
		</section>
	);
};

export default RightSideBar;
