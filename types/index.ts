import { ReactNode } from "react";

export interface Recipe {
	imageUrl: string;
	name: string;
	time: string;
	difficulty: string;
	numIngredients: number;
}

export interface Ingredient {
	name: string;
	amount?: string;
	isAvailable: boolean;
	isInCart: boolean;
	dateAdded?: Date;
	dateExpired?: Date;
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
