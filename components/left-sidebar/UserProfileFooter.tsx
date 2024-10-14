import { MdOutlineSettings, MdLogout } from "react-icons/md";

const UserProfileFooter = () => {
	return (
		<section className="flex px-8 py-2 justify-between">
			{/* Name + email */}
			<div className="hidden 2xl:flex flex-col gap-1">
				<p className="font-semibold">Xutao Gao</p>
				<p className="text-xs">taogeeee@gmail.com</p>
			</div>

			{/* Actions */}
			<div className="flex flex-col gap-4 2xl:flex-row 2xl:gap-2 items-center text-2xl text-neutral-600">
				<span className="hidden 2xl:block w-[2px] bg-neutral-600 self-stretch" />
				<div className="hover:bg-neutral-200 p-2 rounded cursor-pointer">
					<MdOutlineSettings />
				</div>
				<div className="hover:bg-neutral-200 p-2 rounded cursor-pointer">
					<MdLogout />
				</div>
			</div>
		</section>
	);
};

export default UserProfileFooter;
