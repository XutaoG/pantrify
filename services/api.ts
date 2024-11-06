"use server";

import { baseApiPath, getUserApiPath, loginApiPath } from "@/constants";
import { LoginResponse, TLoginSchema, User } from "@/types";
import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import setCookieParser from "set-cookie-parser";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = baseApiPath;

export const login = async (formData: TLoginSchema) => {
	const loginResponse: LoginResponse = {
		errorMessage: null,
	};

	try {
		const response = await axios.post(loginApiPath, formData);

		const cookieStore = cookies();

		const setCookies = setCookieParser(
			response.headers["set-cookie"] ?? []
		);

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
	} catch (e) {
		const error = e as AxiosError;

		if (error.response) {
			if (error.response.status == 401) {
				loginResponse.errorMessage = "Incorrect email or password";
			} else if (error.response.status == 400) {
				loginResponse.errorMessage = "An unexpected error occurred";
			}
		} else {
			loginResponse.errorMessage = "An unexpected error occurred";
		}
	}

	return loginResponse;
};

export const getUser = async () => {
	try {
		const response = await axios.get<User>(getUserApiPath, {
			headers: {
				Cookie: cookies().toString(),
			},
		});

		return response.data;
	} catch {
		return null;
	}
};
