"use server";

import {
	baseApiPath,
	getUserApiPath,
	loginApiPath,
	logoutPath,
	signUpApiPath,
} from "@/constants";
import {
	LoginResponse,
	SignUpResponse,
	TLoginSchema,
	TSignUpSchema,
	User,
} from "@/types";
import axios, { AxiosError, AxiosResponse } from "axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import setCookieParser from "set-cookie-parser";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = baseApiPath;

export const login = async (formData: TLoginSchema) => {
	const loginResponse: LoginResponse = {
		errorMessage: null,
	};

	try {
		const response = await axios.post(loginApiPath, formData);

		setCookies(response);
	} catch (e) {
		const error = e as AxiosError;

		if (error.response) {
			// Response received, but error status code

			if (error.response.status == 401) {
				loginResponse.errorMessage = "Incorrect email or password";
			} else if (error.response.status == 400) {
				loginResponse.errorMessage = "An unexpected error occurred";
			}
		} else {
			// No response received

			loginResponse.errorMessage = "An unexpected error occurred";
		}
	}

	return loginResponse;
};

export const signUp = async (formData: TSignUpSchema) => {
	const signUpResponse: SignUpResponse = {
		errorMessage: null,
	};

	try {
		await axios.post(signUpApiPath, formData);
	} catch (e) {
		const error = e as AxiosError;

		if (error.response) {
			// Response received, but error status code

			if (error.response.status == 400) {
				signUpResponse.errorMessage = "An unexpected error occurred";
			} else if (error.response.status == 409) {
				signUpResponse.errorMessage =
					"An account with this email address already exists";
			}
		} else {
			// No response received

			signUpResponse.errorMessage = "An unexpected error occurred";
		}
	}

	return signUpResponse;
};

export const getUser = async () => {
	try {
		const response = await axios.get<User>(getUserApiPath, {
			headers: {
				// Attach client cookies
				Cookie: cookies().toString(),
			},
		});

		return response.data;
	} catch {
		return null;
	}
};

export const logout = async () => {
	try {
		const response = await axios.post(logoutPath, {
			headers: {
				// Attach client cookies
				cookie: cookies().toString(),
			},
		});

		setCookies(response);
	} catch {}

	revalidatePath("/");
};

const setCookies = (response: AxiosResponse) => {
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
