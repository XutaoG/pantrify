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
			<div
				className="sm:w-[600px] sm:min-w-[600px] px-6 pr-3 custom-sm:px-8 custom-sm:pr-4 sm:px-16 sm:pr-8
				bg-gray-100 flex flex-col justify-center grow md:grow-0"
			>
				<div className="overflow-y-auto flex flex-col gap-10 sm:gap-20 py-4 pr-3 custom-sm:pr-4 sm:pr-8">
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
			</div>

			{/* Images */}
			<div className="grow hidden md:flex bg-white items-center justify-end relative overflow-hidden ">
				<div className="absolute h-4/5 aspect-[16/9] left-16 lg:left-24 xl:left-48">
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
