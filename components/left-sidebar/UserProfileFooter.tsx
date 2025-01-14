import { getUser } from "@/api";
import UserProfileActions from "./UserProfileActions";
import AddRecipeController from "./AddRecipeController";

const UserProfileFooter = async () => {
	const user = await getUser();

	return (
		<section className="flex flex-col gap-3 md:gap-4">
			<AddRecipeController />

			<div
				className="flex justify-between gap-2 
				2xl:p-4 2xl:py-2 2xl:bg-gray-100 2xl:rounded-lg"
			>
				{/* Name + email */}
				<div className="hidden 2xl:flex flex-col gap-1 grow min-w-0">
					<p className="font-semibold truncate">
						{user?.firstName} {user?.lastName}
					</p>
					<p className="truncate">{user?.email}</p>
				</div>

				{/* Actions */}
				<UserProfileActions />
			</div>
		</section>
	);
};

export default UserProfileFooter;
