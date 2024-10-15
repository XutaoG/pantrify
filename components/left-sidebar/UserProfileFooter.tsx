import { MdOutlineSettings, MdLogout } from "react-icons/md";

const UserProfileFooter = () => {
	return (
		<section className="flex px-6 2xl:px-8 py-2 justify-between gap-2">
			{/* Name + email */}
			<div className="hidden 2xl:flex flex-col gap-1 grow min-w-0">
				<p className="font-semibold truncate">Xutao Gao</p>
				<p className="truncate">taogeeee@gmail.com</p>
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
