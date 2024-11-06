import { getUser } from "@/api";
import UserProfileActions from "./UserProfileActions";

const UserProfileFooter = async () => {
	const user = await getUser();

	return (
		<section className="flex px-6 2xl:px-8 py-2 justify-between gap-2">
			{/* Name + email */}
			<div className="hidden 2xl:flex flex-col gap-1 grow min-w-0">
				<p className="font-semibold truncate">
					{user!.firstName} {user!.lastName}
				</p>
				<p className="truncate">{user!.email}</p>
			</div>

			{/* Actions */}
			<UserProfileActions />
		</section>
	);
};

export default UserProfileFooter;
