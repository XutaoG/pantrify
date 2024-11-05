import { ReactNode } from "react";

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

	time: string;
	numIngredients: number;
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
}

export interface RecipeInstruction {
	id: number;
	step: number;
	instruction: number;
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

export interface IngredientProps {
	ingredient: Ingredient;
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

export interface FormInputProps {
	title: string;
	placeholder: string;
	password?: boolean;
}

export interface FormButtonProps {
	title: string;
}
