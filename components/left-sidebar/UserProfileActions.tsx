"use client";

import { logout } from "@/api";
import { loginRoute } from "@/constants";
import { LogOut, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const UserProfileActions = () => {
	const router = useRouter();

	const onLogoutClick = async () => {
		await logout();
		router.push(loginRoute);
	};

	return (
		<div className="flex flex-col gap-4 2xl:flex-row 2xl:gap-2 items-center text-2xl text-neutral-600">
			<span className="hidden 2xl:block w-[2px] bg-neutral-600 self-stretch" />
			<button type="button" className="hover:bg-neutral-100 p-4 rounded-2xl">
				<Settings />
			</button>
			<button
				type="button"
				className="hover:bg-neutral-100 p-4 rounded-2xl"
				onClick={onLogoutClick}
			>
				<LogOut />
			</button>
		</div>
	);
};

export default UserProfileActions;
