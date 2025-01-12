"use client";

import { logoutApi } from "@/api";
import { loginRoute } from "@/constants";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import ConfirmationModal from "../common/ConfirmationModal";

const UserProfileActions = () => {
	const router = useRouter();

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
		<div className="flex flex-col gap-4 2xl:flex-row 2xl:gap-2 items-center text-2xl text-neutral-600">
			<span className="hidden 2xl:block w-[2px] bg-neutral-600 self-stretch" />
			{/* <button type="button" className="hover:bg-neutral-100 p-4 rounded-2xl">
				<Settings />
			</button> */}

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
		</div>
	);
};

export default UserProfileActions;
