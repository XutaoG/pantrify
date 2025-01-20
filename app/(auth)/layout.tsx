import { ReactNode } from "react";
import Image from "next/image";
import { Edu_VIC_WA_NT_Beginner } from "next/font/google";
import SessionManageWrapper from "@/components/common/SessionManageWrapper";

const edu_vic = Edu_VIC_WA_NT_Beginner({
	subsets: ["latin"],
});

const AuthLayout = async ({
	children,
}: Readonly<{
	children: ReactNode;
}>) => {
	return (
		<main className="min-h-screen max-h-screen flex">
			{/* Form */}
			<div className="w-[600px] min-w-[600px] bg-gray-100 flex flex-col gap-20 justify-center px-16">
				{/* Logo + Text */}
				<div className="flex items-center gap-2 text-sky-600 self-center">
					<Image
						src="/logo/pantrify_logo.webp"
						alt="logo"
						width={48}
						height={48}
						priority
					/>
					<h1 className={`font-medium select-none ${edu_vic.className}`}>Pantrify</h1>
				</div>

				<SessionManageWrapper>{children}</SessionManageWrapper>
			</div>

			{/* Images */}
			<div className="grow bg-white flex items-center justify-end relative  overflow-hidden">
				<div className="absolute h-4/5 aspect-[16/9] left-48 ">
					<div className="relative w-full h-full">
						{/* Image 1 */}
						<Image
							src="/images/fried_rice.jpg"
							alt="chicken"
							fill
							className="absolute inset-0 object-cover rounded-3xl border-neutral-400 object-left"
						/>

						{/* Image 2 */}
						<div className="relative size-full">
							<div className="absolute left-32 right-0 top-16 bottom-0">
								<Image
									src="/images/pecan_pie.jpg"
									alt="pecan"
									fill
									className="object-cover rounded-3xl border border-neutral-400 shadow-md object-left"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
};

export default AuthLayout;
