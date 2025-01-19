import { Edu_VIC_WA_NT_Beginner } from "next/font/google";
import Image from "next/image";

const edu_vic = Edu_VIC_WA_NT_Beginner({
	subsets: ["latin"],
});

const NotFound = () => {
	return (
		<div className="min-h-dvh size-full flex flex-col gap-4 justify-center items-center">
			{/* 404 */}
			<p className="text-5xl font-semibold text-sky-600">404</p>

			{/* Text */}
			<p className="font-medium">This page could not be found.</p>

			{/* Logo */}
			<div className="flex gap-3 items-center mt-16">
				<Image src="/logo/pantrify_logo.webp" alt="logo" width={50} height={50} priority />
				{/* Logo text */}
				<h1 className={`font-medium select-none ${edu_vic.className}`}>Pantrify</h1>
			</div>
		</div>
	);
};

export default NotFound;
