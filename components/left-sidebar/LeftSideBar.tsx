import Navigations from "./Navigations";
import { Edu_VIC_WA_NT_Beginner } from "next/font/google";
import UserProfileFooter from "./UserProfileFooter";
import Image from "next/image";

const edu_vic = Edu_VIC_WA_NT_Beginner({
	subsets: ["latin"],
});

const LeftSideBar = () => {
	return (
		<section className="flex p-0 md:p-4 md:pr-0">
			<div
				className="2xl:min-w-60 2xl:max-w-60 flex card-container rounded-none md:rounded-xl py-2 pl-2 pr-1
				md:pl-2 md:py-2 md:pr-1 md:border-r-0 2xl:p-4 2xl:pr-0 2xl:pt-8
				border-r border-r-neutral-200"
			>
				<div className="grow flex flex-col justify-between gap-3 md:gap-4 overflow-y-auto pr-1 2xl:pr-4">
					{/* Top */}
					<div className="flex flex-col gap-8 md:gap-12">
						{/* Logo + Text */}
						<div className="flex items-center gap-2 text-sky-600 self-center">
							{/* Logo */}
							<Image
								src="/logo/pantrify_logo.webp"
								alt="logo"
								width={40}
								height={40}
								priority
							/>

							{/* Logo text */}
							<h1
								className={`hidden 2xl:block font-medium select-none ${edu_vic.className}`}
							>
								Pantrify
							</h1>
						</div>

						{/* Navigation links */}
						<Navigations />
					</div>

					{/* Bottom */}
					<div className="2xl:flex flex-col">
						<UserProfileFooter />
					</div>
				</div>
			</div>
		</section>
	);
};

export default LeftSideBar;
