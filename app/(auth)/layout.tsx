import { ReactNode } from "react";
import Image from "next/image";
import { Edu_VIC_WA_NT_Beginner } from "next/font/google";
import { getUser } from "@/api";
import { redirect } from "next/navigation";

const edu_vic = Edu_VIC_WA_NT_Beginner({
	subsets: ["latin"],
});

const AuthLayout = async ({
	children,
}: Readonly<{
	children: ReactNode;
}>) => {
	// Redirect to "/" if user is already logged in
	if ((await getUser()) != null) {
		redirect("/");
	}

	return (
		<main className="min-h-screen max-h-screen flex">
			{/* Form */}
			<div className="w-[600px] min-w-[600px] flex flex-col gap-20 justify-center px-16">
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
						className={`font-medium select-none ${edu_vic.className}`}
					>
						Pantrify
					</h1>
				</div>

				{children}
			</div>

			{/* Images */}
			<div className="grow bg-neutral-100"></div>
		</main>
	);
};

export default AuthLayout;
