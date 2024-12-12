"use server";

import {
	baseApiPath,
	getUserApiPath,
	ingredientsPath,
	loginApiPath,
	logoutApiPath,
	moveIngredientToCartPath,
	moveIngredientToInventoryPath,
	recipesPath,
	refreshApiPath,
	signUpApiPath,
} from "@/constants";
import {
	AddIngredientDto,
	AddIngredientResponse,
	AddRecipeDto,
	ErrorMessageResponse,
	GetAllIngredientsRequestConfig,
	GetAllRecipesRequestConfig,
	Ingredient,
	IngredientList,
	LoginResponse,
	RecipeList,
	RefreshResponse,
	SignUpResponse,
	TLoginSchema,
	TSignUpSchema,
	UpdateIngredientDto,
	UpdateIngredientResponse,
	User,
} from "@/types";
import axios, { AxiosError, AxiosResponse } from "axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import setCookieParser from "set-cookie-parser";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = baseApiPath;

export interface ErrorResponse {
	errorMessage: string | null;
}

//! Authentication

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
				signUpResponse.errorMessage = "An account with this email address already exists";
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
			sameSite: cookieToSet.sameSite as "lax" | "strict" | "none" | boolean | undefined,
			expires: cookieToSet.expires,
			secure: cookieToSet.secure,
			httpOnly: cookieToSet.httpOnly,
		});
	});
};

//! Ingredients
export const getAllIngredients = async (config?: GetAllIngredientsRequestConfig) => {
	try {
		const cookieStore = await cookies();

		const response = await axios.get<IngredientList>(ingredientsPath, {
			headers: {
				// Attach client cookies
				Cookie: cookieStore.toString(),
			},
			params: config && {
				// Attach parameters
				name: config.name,
				ingredientType: config.ingredientType,
				isAvailable: config.isAvailable,
				isInCart: config.isInCart,
				sortBy: config.sortBy,
				isAscending: config.isAscending,
				pageNumber: config.pageNumber,
				pageSize: config.pageSize,
			},
		});

		return response.data;
	} catch {
		return null;
	}
};

export const addIngredient = async (newIngredient: AddIngredientDto) => {
	const response: AddIngredientResponse = {
		errorMessage: null,
	};

	try {
		const cookieStore = await cookies();

		await axios.post(ingredientsPath, newIngredient, {
			headers: {
				Cookie: cookieStore.toString(),
			},
		});
	} catch (e) {
		const error = e as AxiosError;

		if (error.response) {
			// Response received, but error status code

			if (error.response.status == 400) {
				response.errorMessage = "Invalid ingredient";
			} else if (error.response.status == 409) {
				response.errorMessage = "Ingredient already exists";
			}
		} else {
			// No response received

			response.errorMessage = "An unexpected error occurred";
		}
	}

	return response;
};

export const getIngredient = async (id: number) => {
	try {
		const cookieStore = await cookies();

		const response = await axios.get<Ingredient>(`${ingredientsPath}/${id}`, {
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

export const deleteIngredient = async (id: number) => {
	try {
		const cookieStore = await cookies();

		await axios.delete(`${ingredientsPath}/${id}`, {
			headers: {
				// Attach client cookies
				Cookie: cookieStore.toString(),
			},
		});
	} catch {
		return;
	}
};

export const updateIngredient = async (id: number, updatedIngredient: UpdateIngredientDto) => {
	const response: UpdateIngredientResponse = {
		errorMessage: null,
	};

	try {
		const cookieStore = await cookies();

		await axios.put(`${ingredientsPath}/${id}`, updatedIngredient, {
			headers: {
				Cookie: cookieStore.toString(),
			},
		});
	} catch (e) {
		const error = e as AxiosError;

		if (error.response) {
			// Response received, but error status code

			if (error.response.status == 400) {
				response.errorMessage = "Invalid ingredient";
			} else if (error.response.status == 409) {
				response.errorMessage = "Ingredient already exists";
			}
		} else {
			// No response received

			response.errorMessage = "An unexpected error occurred";
		}
	}

	return response;
};

export const moveToCart = async (id: number) => {
	const response: ErrorResponse = {
		errorMessage: null,
	};

	try {
		const cookieStore = await cookies();

		await axios.post(`${moveIngredientToCartPath}/${id}`, undefined, {
			headers: {
				Cookie: cookieStore.toString(),
			},
		});
	} catch (e) {
		const error = e as AxiosError;

		if (error.response) {
			// Response received, but error status code

			if (error.response.status == 404) {
				response.errorMessage = "Ingredient not found";
			} else if (error.response.status == 409) {
				response.errorMessage = "Ingredient already exists";
			}
		} else {
			// No response received

			response.errorMessage = "An unexpected error occurred";
		}
	}

	return response;
};

export const moveToInventory = async (id: number) => {
	const response: ErrorResponse = {
		errorMessage: null,
	};

	try {
		const cookieStore = await cookies();

		await axios.post(`${moveIngredientToInventoryPath}/${id}`, undefined, {
			headers: {
				Cookie: cookieStore.toString(),
			},
		});
	} catch (e) {
		const error = e as AxiosError;

		if (error.response) {
			// Response received, but error status code

			if (error.response.status == 404) {
				response.errorMessage = "Ingredient not found";
			} else if (error.response.status == 409) {
				response.errorMessage = "Ingredient already exists";
			}
		} else {
			// No response received

			response.errorMessage = "An unexpected error occurred";
		}
	}

	return response;
};

export const addRecipeApi = async (recipe: AddRecipeDto) => {
	const formData = new FormData();

	//* Name
	formData.append("name", recipe.name);

	//* Description
	if (recipe.description) {
		formData.append("description", recipe.description);
	}

	//* Duration
	formData.append("duration", recipe.duration.toString());

	//* Difficulty
	formData.append("difficulty", recipe.difficulty.toString());

	//* NumServings
	formData.append("numServings", recipe.numServings.toString());

	//* Ingredients
	recipe.ingredients.forEach((ingredient, index) => {
		formData.append(`ingredients[${index}].name`, ingredient.name);
		formData.append(`ingredients[${index}].ingredientType`, ingredient.ingredientType);

		if (ingredient.quantityWhole) {
			formData.append(
				`ingredients[${index}].quantityWhole`,
				ingredient.quantityWhole.toString()
			);
		}

		if (ingredient.quantityFraction) {
			formData.append(`ingredients[${index}].quantityFraction`, ingredient.quantityFraction);
		}

		if (ingredient.quantityUnit) {
			formData.append(`ingredients[${index}].quantityUnit`, ingredient.quantityUnit);
		}
	});

	//* Instructions
	recipe.instructions.forEach((instruction) => {
		formData.append("instructions", instruction);
	});

	//* Images
	recipe.images.forEach((image) => {
		formData.append("images", image);
	});

	// console.log(formData);

	const errorMessageResponse: ErrorMessageResponse = {
		errorMessage: null,
	};

	try {
		const cookieStore = await cookies();

		await axios.post(recipesPath, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
				Cookie: cookieStore.toString(),
			},
		});
	} catch (e) {
		const error = e as AxiosError;

		console.log(error.response?.data);

		if (error.response) {
			// Response received, but error status code

			if (error.response.status == 400) {
				errorMessageResponse.errorMessage = "An unexpected error occurred";
			}
		} else {
			// No response received

			errorMessageResponse.errorMessage = "An unexpected error occurred";
		}
	}

	return errorMessageResponse;
};

export const getAllRecipes = async (config?: GetAllRecipesRequestConfig) => {
	try {
		const cookieStore = await cookies();

		const response = await axios.get<RecipeList>(recipesPath, {
			headers: {
				// Attach client cookies
				Cookie: cookieStore.toString(),
			},
			params: config && {
				// Attach parameters
				name: config.name,
				difficulty: config.difficulty,
				minDuration: config.minDuration,
				maxDuration: config.maxDuration,
				sortBy: config.sortBy,
				isAscending: config.isAscending,
				pageNumber: config.pageNumber,
				pageSize: config.pageSize,
			},
		});

		return response.data;
	} catch {
		return null;
	}
};
