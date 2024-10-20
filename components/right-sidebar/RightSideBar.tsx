import { RightSideBarProps } from "@/types";

const RightSideBar = ({ children }: RightSideBarProps) => {
	return (
		<section className="flex w-[450px] min-w-[450px] p-2">
			<div
				className="flex flex-col border border-neutral-200 shadow-md 
				rounded-lg overflow-hidden"
			>
				{/* pattern */}
				<div className="min-h-24 h-24 bg-sky-600" />

				{/* Content */}
				<div className="flex flex-col overflow-y-scroll">
					{children}
				</div>
			</div>
		</section>
	);
};

export default RightSideBar;
