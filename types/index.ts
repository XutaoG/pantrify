import { ReactNode } from "react";

export interface Recipe {
	imageUrl: string;
	name: string;
	time: string;
	difficulty: string;
	numIngredients: number;
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
