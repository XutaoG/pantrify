import { z } from "zod";

// ! RESPONSES

export interface Recipe {
	id: number;
	name: string;
	duration: number;
	difficulty: number;
	numServings: number;
	dateAdded: Date;
	dateModified: Date;

	ingredients: RecipeIngredient[];
	instructions: RecipeInstruction[];
	images: RecipeImage[];
}

export interface RecipeList {
	recipes: Recipe[];
	totalCount: number;
	pageNumber: number;
	pageSize: number;
}

interface IngredientBase {
	id: number;
	name: string;
	ingredientType: "Primary" | "Secondary" | "Optional";
}

export interface RecipeIngredient extends IngredientBase {
	quantity?: number;
	quantityUnit?: string;
	isAvailable: boolean; // To be removed
}

export interface RecipeInstruction {
	id: number;
	step: number;
	instruction: string;
}

export interface RecipeImage {
	id: number;
	path: string;
	order: number;
}

export interface Ingredient extends IngredientBase {
	isAvailable: boolean;
	isInCart: boolean;
	dateAdded?: Date;
	dateExpired?: Date;
}

export interface User {
	email: string;
	firstName: string;
	lastName: string;
}

export interface JwtInfo {
	tokenType: string;
	tokenExpiryTime: Date;
	refreshTokenExpiryTime: Date;
}

export interface IngredientList {
	ingredients: Ingredient[];
	totalCount: number;
	pageNumber: number;
	pageSize: number;
}

export interface LoginResponse {
	errorMessage: string | null;
}

export interface SignUpResponse {
	errorMessage: string | null;
}

export interface RefreshResponse {
	errorMessage: string | null;
}

export interface AddRecipeDto {
	name: string;
	description?: string;
	duration: number;
	difficulty: number;
	numServings: number;
	ingredients: AddRecipeIngredientDto[];
	instructions: string[];
	images: File[];
}

export interface AddRecipeIngredientDto {
	name: string;
	ingredientType: string;
	quantityWhole?: number;
	quantityFraction?: string;
	quantityUnit?: string;
}

export interface AddIngredientDto {
	name: string;
	ingredientType: string;
	isAvailable: boolean;
	isInCart: boolean;
	dateExpired?: Date;
}

export interface UpdateIngredientDto {
	name: string;
	ingredientType: string;
	isAvailable: boolean;
	isInCart: boolean;
	dateExpired?: Date;
}

export interface AddIngredientResponse {
	errorMessage: string | null;
}

export interface UpdateIngredientResponse {
	errorMessage: string | null;
}

export interface ErrorMessageResponse {
	errorMessage: string | null;
}

export interface ActiveView {
	activeView: Ingredient | Recipe | null;
	setActiveView: (activeView: Ingredient | Recipe) => void;
}

// ! Request config
export interface GetAllIngredientsRequestConfig {
	name?: string;
	ingredientType?: string;
	isAvailable?: boolean;
	isInCart?: boolean;
	sortBy?: string;
	isAscending?: boolean;
	pageNumber?: number;
	pageSize?: number;
}

// ! Form schemas

// Sign up
export const signUpSchema = z
	.object({
		email: z
			.string()
			.min(1, "Email cannot be empty")
			.email({ message: "Invalid email address" }),
		firstName: z.string().min(1, "First name cannot be empty"),
		lastName: z.string().min(1, "Last name cannot be empty"),
		password: z.string().min(8, "Password must be at least 8 characters"),
		confirmPassword: z.string({
			message: "Password confirmation cannot be empty",
		}),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords must match",
		path: ["confirmPassword"],
	});

export type TSignUpSchema = z.infer<typeof signUpSchema>;

// Login
export const loginSchema = z.object({
	email: z.string().min(1, "Email cannot be empty").email(),
	password: z.string().min(1, "Password cannot be empty"),
	rememberMe: z.boolean(),
});

export type TLoginSchema = z.infer<typeof loginSchema>;

// Add recipe
export const addRecipeSchema = z.object({
	name: z.string().min(1, "Recipe name cannot be empty"),
	description: z.string().max(1000, "Description cannot be longer than 500 characters"),
	difficulty: z.string().min(1, "Difficulty cannot be empty"),
	durationHour: z.string(),
	durationMinute: z.string(),
	numServings: z.string(),
});

export type TAddRecipeSchema = z.infer<typeof addRecipeSchema>;

// Add recipe ingredient
export const addRecipeIngredientSchema = z.object({
	name: z.string().min(1, "Name cannot be empty"),
	ingredientType: z.string(),
	quantityWhole: z.string(),
	quantityFraction: z.string(),
	quantityUnit: z.string(),
});

export type TAddRecipeIngredientSchema = z.infer<typeof addRecipeIngredientSchema>;

// Add recipe instruction
export const addRecipeInstructionSchema = z.object({
	instruction: z.string().min(1, "Instruction cannot be empty"),
});

export type TAddRecipeInstructionSchema = z.infer<typeof addRecipeInstructionSchema>;

// Add ingredient
export const addIngredientSchema = z.object({
	name: z.string().min(1, "Name cannot be empty"),
	ingredientType: z.string(),
	dateExpired: z.string().optional(),
});

export type TAddIngredientSchema = z.infer<typeof addIngredientSchema>;
