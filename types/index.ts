import { ComponentPropsWithRef, ReactNode } from "react";
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
	ingredientType: string;
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

export interface LoginResponse {
	errorMessage: string | null;
}

export interface SignUpResponse {
	errorMessage: string | null;
}

// ! PROPS

export interface LargeRecipeCardProps {
	recipe: Recipe;
}

export interface SmallRecipeCardProps {
	recipe: Recipe;
}

export interface InfoWidgetProps {
	icon: ReactNode;
	iconColor: string;
	text: string;
	onClick?: () => void;
	onHover?: () => void;
}

export interface RecipeIngredientProps {
	recipeIngredient: RecipeIngredient;
}

export interface CollapsiblePanelProps {
	title: string;
	children: ReactNode;
	titleStyle?: string;
}

export interface SearchBarProps {
	placeholderText: string;
}

export interface IngredientCardProps {
	ingredient: Ingredient;
	icon: ReactNode;
}

export interface RightSideBarProps {
	children: ReactNode;
}

export interface ToolTipProps {
	children: ReactNode;
	toolTipContent: string;
}

export interface FormInputProps extends ComponentPropsWithRef<"input"> {
	title: string;
	password?: boolean;
	errorMessage?: string;
	isSubmitting: boolean;
}

export interface FormButtonProps extends ComponentPropsWithRef<"button"> {
	title: string;
	isSubmitting: boolean;
}

// ! Form schemas
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

export const loginSchema = z.object({
	email: z.string().min(1, "Email cannot be empty").email(),
	password: z.string().min(1, "Password cannot be empty"),
	rememberMe: z.boolean(),
});

export type TLoginSchema = z.infer<typeof loginSchema>;
