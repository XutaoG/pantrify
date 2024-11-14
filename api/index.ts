"use server";

import {
	baseApiPath,
	getUserApiPath,
	loginApiPath,
	logoutApiPath,
	refreshApiPath,
	signUpApiPath,
} from "@/constants";
import {
	LoginResponse,
	RefreshResponse,
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

		await setCookies(response);
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
		const cookieStore = await cookies();

		const response = await axios.get<User>(getUserApiPath, {
			headers: {
				// Attach client cookies
				Cookie: cookieStore.toString(),
			},
		});

		return response.data;
	} catch {
		return null;
	}
};

export const logout = async () => {
	try {
		const cookieStore = await cookies();

		const response = await axios.post(logoutApiPath, null, {
			headers: {
				// Attach client cookies
				cookie: cookieStore.toString(),
			},
		});

		await setCookies(response);
	} catch {}

	revalidatePath("/");
};

export const refresh = async () => {
	const refreshResponse: RefreshResponse = {
		errorMessage: null,
	};

	try {
		const cookieStore = await cookies();

		const response = await axios.post(
			refreshApiPath,
			{},
			{
				headers: {
					// Attach client cookies
					cookie: cookieStore.toString(),
					"Content-Type": "application/json",
				},
			}
		);

		await setCookies(response);
	} catch (e) {
		const error = e as AxiosError;

		console.log(error.message);

		if (error.response) {
			// Response received, but error status code
			if (error.response.status == 400) {
				refreshResponse.errorMessage = "Unauthorized";
			} else if (error.response.status == 401) {
				refreshResponse.errorMessage = "Unauthorized";
			}
		} else {
			// No response received
			refreshResponse.errorMessage = "An unexpected error occurred";
		}
	}

	return refreshResponse;
};

const setCookies = async (response: AxiosResponse) => {
	const cookieStore = await cookies();

	// console.log(response.headers);

	const cookieResponse = response.headers["set-cookie"]
		?.toString()
		.split(",")
		.map((s) => s.trim());

	cookieResponse?.forEach((cookie) => {
		const cookieToSet = setCookieParser.parseString(cookie);

		cookieStore.set(cookieToSet.name, cookieToSet.value, {
			path: cookieToSet.path,
			domain: cookieToSet.domain,
			maxAge: cookieToSet.maxAge,
			sameSite: cookieToSet.sameSite as
				| "lax"
				| "strict"
				| "none"
				| boolean
				| undefined,
			expires: cookieToSet.expires,
			secure: cookieToSet.secure,
			httpOnly: cookieToSet.httpOnly,
		});
	});
};
