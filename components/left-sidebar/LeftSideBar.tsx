import Navigations from "./Navigations";
import { Edu_VIC_WA_NT_Beginner } from "next/font/google";
import UserProfileFooter from "./UserProfileFooter";
import Image from "next/image";

const edu_vic = Edu_VIC_WA_NT_Beginner({
	subsets: ["latin"],
});

const LeftSideBar = () => {
	return (
		<section className="flex p-0 sm:p-4 pr-0">
			<div
				className="2xl:w-80 flex flex-col justify-between card-container 
				rounded-none sm:rounded-xl p-2 sm:p-4 border-r border-r-neutral-200 sm:border-r-0"
			>
				{/* Top */}
				<div className="flex flex-col gap-8 sm:gap-12 py-2 sm:py-10">
					{/* Logo + Text */}
					<div className="flex items-center gap-2 text-sky-600 self-center">
						{/* Logo */}
						<Image
							src="/logo/pantrify_logo.webp"
							alt="logo"
							width={48}
							height={48}
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
				<div className="2xl:flex flex-col gap-6">
					<UserProfileFooter />
				</div>
			</div>
		</section>
	);
};

export default LeftSideBar;
