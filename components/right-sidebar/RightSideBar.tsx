import { RightSideBarProps } from "@/types";

const RightSideBar = ({ children }: RightSideBarProps) => {
	return (
		<section
			className="pr-2 border-l-neutral-300 flex flex-col 
			overflow-y-scroll w-[450px] min-w-[450px] my-1 mr-1 "
		>
			{/* pattern */}
			<div className="min-h-24 h-24 bg-sky-600" />
			{/* Content */}
			{children}
		</section>
	);
};

export default RightSideBar;
