"use client";

import { logout } from "@/api";
import React from "react";
import { MdLogout, MdOutlineSettings } from "react-icons/md";

const UserProfileActions = () => {
	const onLogoutClick = async () => {
		await logout();
	};

	return (
		<div className="flex flex-col gap-4 2xl:flex-row 2xl:gap-2 items-center text-2xl text-neutral-600">
			<span className="hidden 2xl:block w-[2px] bg-neutral-600 self-stretch" />
			<div className="hover:bg-neutral-200 p-2 rounded cursor-pointer">
				<MdOutlineSettings />
			</div>
			<button
				className="hover:bg-neutral-200 p-2 rounded"
				onClick={onLogoutClick}
			>
				<MdLogout />
			</button>
		</div>
	);
};

export default UserProfileActions;