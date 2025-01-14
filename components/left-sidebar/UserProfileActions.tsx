"use client";

import { logoutApi } from "@/api";
import { loginRoute } from "@/constants";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import ConfirmationModal from "../common/ConfirmationModal";
import { addRecipeRoute } from "@/constants/routes";
import RecipeFormModal from "../add/RecipeFormModal";

const UserProfileActions = () => {
	const router = useRouter();

	const [isAddRecipeModalOpen, setIsAddRecipeModalOpen] = useState(false);

	const openModal = () => {
		setIsAddRecipeModalOpen(true);
	};

	const closeModal = () => {
		setIsAddRecipeModalOpen(false);
	};

	const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

	const showLogoutModal = () => {
		setIsLogoutModalOpen(true);
	};

	const closeLogoutModal = () => {
		setIsLogoutModalOpen(false);
	};

	const logout = async () => {
		await logoutApi();
		router.push(loginRoute);
	};

	return (
		<div className="flex flex-col gap-3 md:gap-4 2xl:flex-row 2xl:gap-2 items-center text-2xl text-neutral-600">
			<span className="hidden 2xl:block w-[2px] bg-neutral-600 self-stretch" />
			{/* <button type="button" className="hover:bg-neutral-100 p-4 rounded-2xl">
				<Settings />
			</button> */}

			{/* Add recipe route */}
			<button
				type="button"
				onClick={openModal}
				className="flex justify-left gap-4 p-2 sm:p-4 rounded-xl md:rounded-2xl font-semibold 
					bg-emerald-300 hover:bg-emerald-400 cursor-pointer "
			>
				{addRecipeRoute.icon}
				<p className="hidden 2xl:block">Add New Recipe</p>
			</button>

			{/* Logout button */}
			<button
				type="button"
				className="hover:bg-neutral-100 p-2 sm:p-4 rounded-2xl"
				onClick={showLogoutModal}
			>
				<LogOut />
			</button>

			{isLogoutModalOpen && (
				<ConfirmationModal
					message="Are you sure you want to log out?"
					confirmText="Log Out"
					cancelText="Cancel"
					onConfirm={logout}
					onModalClose={closeLogoutModal}
				/>
			)}

			{/* Add recipe modal */}
			{isAddRecipeModalOpen && <RecipeFormModal onModalClose={closeModal} />}
		</div>
	);
};

export default UserProfileActions;
