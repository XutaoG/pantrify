"use client";

import { getUser, refresh } from "@/api";
import { loginRoute, signUpRoute } from "@/constants";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useContext, useEffect } from "react";
import { RefreshContext } from "./FetchContext";

interface SessionManagerWrapperProps {
	children: ReactNode;
}

const SessionManageWrapper = ({ children }: SessionManagerWrapperProps) => {
	const refreshContext = useContext(RefreshContext);
	const pathname = usePathname();
	const router = useRouter();

	useEffect(() => {
		const sessionRedirect = async () => {
			if (pathname.startsWith(loginRoute) || pathname.startsWith(signUpRoute)) {
				if ((await getUser()) == null) {
					// Attempt to refresh token
					if ((await refresh()).errorMessage == null) {
						router.push("/");
						return;
					}
				} else {
					// User is already signed in, redirect to "/"

					router.push("/");
					return;
				}
			} else if (pathname.startsWith("/")) {
				if ((await getUser()) == null) {
					// User is not signed in, redirect to "/login"

					// Attempt to refresh token
					if ((await refresh()).errorMessage != null) {
						router.push(loginRoute);
					}
				}
			}
		};

		sessionRedirect();
	}, [pathname, router, refreshContext?.refreshValue]);

	return children;
};

export default SessionManageWrapper;
