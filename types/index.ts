import { ComponentPropsWithRef, ReactNode } from "react";
import { UseFormRegister } from "react-hook-form";
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

export interface JwtInfo {
	tokenType: string;
	tokenExpiryTime: Date;
	refreshTokenExpiryTime: Date;
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

export interface FormTextAreaProps extends ComponentPropsWithRef<"textarea"> {
	title: string;
	errorMessage?: string;
	isSubmitting: boolean;
}

export interface FormTimeInputProps extends ComponentPropsWithRef<"input"> {
	title: string;
	errorMessage?: string;
	isSubmitting: boolean;
}

export interface FormNumberProps extends ComponentPropsWithRef<"input"> {
	title: string;
	errorMessage?: string;
	isSubmitting: boolean;
	onValueIncrement: (val: number) => void;
	incrementAmount: number;
}

export interface FormSelectionInputProps extends ComponentPropsWithRef<"input"> {
	title: string;
	currentSelection: string;
	selections: string[];
	isSubmitting: boolean;
	onSelectionChange: (val: string) => void;
}

export interface AddRecipeIngredientFormProps {
	onIngredientAdd: (ingredient: TAddRecipeIngredientSchema) => void;
	onModalClose: () => void;
	index: number | null;
	ingredient: TAddRecipeIngredientSchema | null;
	onIngredientEdit: (index: number, newIngredient: TAddRecipeIngredientSchema) => void;
	onIngredientDelete: (index: number) => void;
}

export interface FormQuantityInputProps {
	className?: string;
	isSubmitting: boolean;
	// quantityWholeRegister: UseFormRegisterReturn;
	// quantityFractionRegister: UseFormRegisterReturn;
	register: UseFormRegister<TAddRecipeIngredientSchema>;
	currentQuantityFractionSelection: string;
	onQuantityFractionSelectionChange: (val: string) => void;
	currentQuantityUnitSelection: string;
	onQuantityUnitSelectionChange: (val: string) => void;
}

export interface FormInstructionInputProps {
	index: number;
	value: string;
	onInstructionEdit: (index: number, newInstruction: string) => void;
	onInstructionRemove: (index: number) => void;
	onInstructionMove: (index: number, direction: number) => void;
}

export interface RecipeIngredientCardProps {
	index: number;
	ingredient: TAddRecipeIngredientSchema;
	onEdit: (index: number, ingredient: TAddRecipeIngredientSchema) => void;
	onDelete: (index: number) => void;
}

export interface FormButtonProps extends ComponentPropsWithRef<"button"> {
	title: string;
	isSubmitting: boolean;
}

// ! Form schemas

// Sign up
export const signUpSchema = z
	.object({
		email: z.string().min(1, "Email cannot be empty").email({ message: "Invalid email address" }),
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
	description: z.string().max(500, "Description cannot be longer than 500 characters"),
	difficulty: z.string().min(1, "Difficulty cannot be empty"),
	duration: z.string(),
	numServings: z.number().int("Invalid serving number"),
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
