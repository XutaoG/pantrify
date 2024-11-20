"use client";

import { logout } from "@/api";
import { LogOut, Settings } from "lucide-react";
import React from "react";

const UserProfileActions = () => {
	const onLogoutClick = async () => {
		await logout();
	};

	return (
		<div className="flex flex-col gap-4 2xl:flex-row 2xl:gap-2 items-center text-2xl text-neutral-600">
			<span className="hidden 2xl:block w-[2px] bg-neutral-600 self-stretch" />
			<div className="hover:bg-neutral-200 p-2 rounded cursor-pointer">
				<Settings />
			</div>
			<button className="hover:bg-neutral-200 p-2 rounded" onClick={onLogoutClick}>
				<LogOut />
			</button>
		</div>
	);
};

export default UserProfileActions;
