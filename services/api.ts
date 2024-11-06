"use server";

import { baseApiPath, getUserApiPath, loginApiPath } from "@/constants";
import { TLoginSchema, User } from "@/types";
import axios from "axios";
import { cookies } from "next/headers";
import setCookieParser from "set-cookie-parser";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = baseApiPath;

export const login = async (formData: TLoginSchema) => {
	const response = await axios.post(loginApiPath, formData);

	const cookieStore = cookies();

	const setCookies = setCookieParser(response.headers["set-cookie"] ?? []);

	setCookies.forEach((cookie) => {
		cookieStore.set(cookie.name, cookie.value, {
			path: cookie.path,
			domain: cookie.domain,
			maxAge: cookie.maxAge,
			sameSite: cookie.sameSite as
				| "lax"
				| "strict"
				| "none"
				| boolean
				| undefined,
			expires: cookie.expires,
			secure: cookie.secure,
			httpOnly: cookie.httpOnly,
		});
	});
};

export const getUser = async () => {
	const response = await axios.get<User>(getUserApiPath, {
		headers: {
			Cookie: cookies().toString(),
		},
	});

	return response;
};
