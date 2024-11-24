import { IngredientSortSchema } from "@/constants";
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

// ! PROPS

export interface PageTitleProps {
	title: string;
	subtitle: string;
}

export interface PaginationProps {
	pageSize: number;
	totalCount: number;
	currentPageNumber: number;
	setCurrentPageNumber: (pageNumber: number) => void;
}

export interface ActiveViewContextWrapperProps {
	children: ReactNode;
}

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
	onSearch: (searchWord: string) => void;
	placeholderText: string;
}

export interface IngredientSortByProps {
	selections: IngredientSortSchema[];
	onSort: (sortBy: IngredientSortSchema) => void;
}

export interface AllPrimaryIngredientsProps {
	ingredients: IngredientList;
	pageSize: number;
	currentPageNumber: number;
	setCurrentPageNumber: (pageNumber: number) => void;
}

export interface AllSecondaryIngredientsProps {
	ingredients: IngredientList;
	pageSize: number;
	currentPageNumber: number;
	setCurrentPageNumber: (pageNumber: number) => void;
}

export interface IngredientCardProps {
	mode: "ingredient" | "shopping";
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

export interface RecipeviewProps {
	recipe: Recipe;
}

export interface FormInputProps extends ComponentPropsWithRef<"input"> {
	header: string;
	headerIcon?: ReactNode;
	errorMessage?: string;
}

export interface FormPasswordInputProps extends ComponentPropsWithRef<"input"> {
	header: string;
	headerIcon?: ReactNode;
	errorMessage?: string;
}

export interface FormTextAreaProps extends ComponentPropsWithRef<"textarea"> {
	header: string;
	headerIcon?: ReactNode;
	errorMessage?: string;
}

export interface RecipeDurationInputProps {
	className?: string;
}

export interface FormNumberProps extends ComponentPropsWithRef<"input"> {
	header: string;
	headerIcon?: ReactNode;
	onValueIncrement: (val: number) => void;
	incrementAmount: number;
}

export interface FormSelectionInputProps extends ComponentPropsWithRef<"input"> {
	header: string;
	headerIcon?: ReactNode;
	currentSelection: string;
	selections: string[];
	onSelectionChange: (val: string) => void;
}

export interface RecipeIngredientFormModalProps {
	onIngredientAdd: (ingredient: TAddRecipeIngredientSchema) => string | null;
	onModalClose: () => void;
	index: number | null;
	ingredient: TAddRecipeIngredientSchema | null;
	onIngredientEdit: (index: number, newIngredient: TAddRecipeIngredientSchema) => string | null;
}

export interface FormQuantityInputProps {
	className?: string;
}

export interface FormInstructionInputProps {
	index: number;
	value: string;
	onInstructionEdit: (index: number, newInstruction: string) => void;
	onInstructionRemove: (index: number) => void;
	onInstructionMove: (index: number, direction: number) => void;
	isSubmitting: boolean;
}

export interface RecipeIngredientCardProps {
	index: number;
	ingredient: TAddRecipeIngredientSchema;
	onEdit: (index: number, ingredient: TAddRecipeIngredientSchema) => void;
	onDelete: (index: number) => void;
	isSubmitting: boolean;
}

export interface FormDateInputProps extends ComponentPropsWithRef<"input"> {
	header: string;
	headerIcon?: ReactNode;
	password?: boolean;
	errorMessage?: string;
}

export interface FormButtonProps extends ComponentPropsWithRef<"button"> {
	title: string;
	icon?: ReactNode;
}

export interface IngredientFormModalProps {
	mode: "ingredient" | "shopping";
	onModalClose: () => void;
	ingredient?: Ingredient;
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
