import Navigations from "./Navigations";
import { Edu_VIC_WA_NT_Beginner } from "next/font/google";
import UserProfileFooter from "./UserProfileFooter";
import Image from "next/image";
// import { getUser } from "@/services/api";
// import { redirect } from "next/navigation";

const edu_vic = Edu_VIC_WA_NT_Beginner({
	subsets: ["latin"],
});

const LeftSideBar = () => {
	return (
		<section className="2xl:w-80 flex flex-col justify-between border-r border-r-neutral-300">
			{/* Top */}
			<div className="flex flex-col gap-12 2xl:px-8 py-10">
				{/* Logo + Text */}
				<div className="flex items-center gap-2 text-sky-600 self-center">
					<Image
						src="/logo/pantrify_logo.webp"
						alt="logo"
						width={48}
						height={48}
						priority
					/>
					<h1
						className={`hidden 2xl:block font-medium select-none ${edu_vic.className}`}
					>
						Pantrify
					</h1>
				</div>

				<Navigations />
			</div>

			{/* Bottom */}
			<div className="2xl:flex flex-col gap-6">
				<UserProfileFooter />
			</div>
		</section>
	);
};

export default LeftSideBar;
