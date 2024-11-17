"use client";

import AddRecipeIngredientForm from "@/components/add/add-recipe/AddRecipeIngredientForm";
import AddRecipeInstructionForm from "@/components/add/add-recipe/AddRecipeInstructionForm";
import RecipeIngredientCard from "@/components/add/add-recipe/RecipeIngredientCard";
import FormButton from "@/components/form/FormButton";
import FormInput from "@/components/form/FormInput";
import FormNumberInput from "@/components/form/FormNumberInput";
import FormSelectionInput from "@/components/form/FormSelectionInput";
import FormTextArea from "@/components/form/FormTextArea";
import {
	addRecipeSchema,
	TAddRecipeIngredientSchema,
	TAddRecipeSchema,
} from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

const AddRecipePage = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		getValues,
		setValue,
	} = useForm<TAddRecipeSchema>({
		resolver: zodResolver(addRecipeSchema),
		defaultValues: {
			numServings: 1,
			difficulty: "Easy",
			duration: "00:00",
		},
	});

	//! Serving

	const onServingChange = (val: number) => {
		const numServings = Number(getValues("numServings"));

		if (
			isNaN(numServings) ||
			numServings + val < 1 ||
			numServings + val > 10
		) {
			return;
		}

		if (getValues("numServings"))
			setValue("numServings", numServings + val, {
				shouldValidate: true,
			});
	};

	//! Difficulty

	const onDifficultyChange = (val: string) => {
		setValue("difficulty", val, { shouldValidate: true });
	};

	//! Duration

	const onDurationChange = (val: number) => {
		const displayDuration = getValues("duration").split(":");
		const duration =
			Number(displayDuration[0]) * 60 + Number(displayDuration[1]);

		if (duration + val < 0) {
			return;
		}

		const newNumHours = Math.floor((duration + val) / 60);
		const newNumMinutes = (duration + val) % 60;

		setValue(
			"duration",
			`${newNumHours.toLocaleString(undefined, {
				minimumIntegerDigits: 2,
			})}:${newNumMinutes.toLocaleString(undefined, {
				minimumIntegerDigits: 2,
			})}`,
			{
				shouldValidate: true,
			}
		);
	};

	//! Ingredients
	const [ingredients, setIngredients] = useState<
		TAddRecipeIngredientSchema[]
	>([]);

	const addIngredient = (newIngredient: TAddRecipeIngredientSchema) => {
		for (const ingredient of ingredients) {
			if (ingredient.name == newIngredient.name) {
				// Ingredient duplicated
				return;
			}
		}

		setIngredients([...ingredients, newIngredient]);
	};

	const primaryIngredients: JSX.Element[] = [];
	const secondaryIngredients: JSX.Element[] = [];
	const optionalIngredients: JSX.Element[] = [];

	ingredients.forEach((ingredient) => {
		const recipeIngredientCard = (
			<RecipeIngredientCard
				key={ingredient.name}
				ingredient={ingredient}
			/>
		);

		if (ingredient.ingredientType == "Primary") {
			primaryIngredients.push(recipeIngredientCard);
		} else if (ingredient.ingredientType == "Secondary") {
			secondaryIngredients.push(recipeIngredientCard);
		} else {
			optionalIngredients.push(recipeIngredientCard);
		}
	});

	//! Instructions
	const [instructions, setInstructions] = useState<string[]>([]);

	const addInstruction = (newInstruction: string) => {
		setInstructions([...instructions, newInstruction]);
	};

	return (
		<div className="flex flex-col items-center gap-6 px-5 pt-10 pb-5">
			<div className="container mx-auto flex flex-col gap-6">
				{/* Page title */}
				<div className="flex flex-col gap-2">
					<h2 className="font-semibold text-sky-600">
						Add a New Recipe
					</h2>
					<p className="text-neutral-600 font-medium">
						Enrich Your Own Personal Cookbook.
					</p>
				</div>

				<form
					onSubmit={handleSubmit(() => {})}
					className="flex flex-col gap-5"
				>
					<div className="flex gap-4">
						{/* Name field */}
						<FormInput
							{...register("name")}
							title="Recipe Name"
							placeholder="Enter the name of the recipe"
							errorMessage={errors.name?.message}
							isSubmitting={isSubmitting}
							className="grow"
						/>
						<FormNumberInput
							{...register("numServings")}
							title="Servings"
							placeholder="1"
							errorMessage={errors.numServings?.message}
							isSubmitting={isSubmitting}
							onValueIncrement={onServingChange}
							incrementAmount={1}
							className="w-40"
						/>
					</div>

					<div className="flex gap-4">
						<FormNumberInput
							{...register("duration")}
							title="Duration (Hour:Min)"
							errorMessage={errors.duration?.message}
							isSubmitting={isSubmitting}
							onValueIncrement={onDurationChange}
							incrementAmount={10}
							className="grow"
						/>
						<FormSelectionInput
							{...register("difficulty")}
							title="Difficulty"
							errorMessage={errors.difficulty?.message}
							isSubmitting={isSubmitting}
							selections={["Easy", "Medium", "Hard"]}
							currentSelection={getValues("difficulty")}
							onSelectionChange={onDifficultyChange}
							className="grow"
						/>
					</div>

					{/* Description */}
					<FormTextArea
						{...register("description")}
						title="Description"
						placeholder="Enter the description of the recipe"
						errorMessage={errors.description?.message}
						isSubmitting={isSubmitting}
					/>

					{/* Add ingredient form */}
					<AddRecipeIngredientForm onIngredientAdd={addIngredient} />

					{/* Primary ingredients */}
					{primaryIngredients.length != 0 && (
						<section className="flex flex-col gap-2">
							<p className="font-semibold">Primary Ingredients</p>
							<div className="grid grid-cols-4 gap-4">
								{primaryIngredients}
							</div>
						</section>
					)}
					{/* Secondary ingredients */}
					{secondaryIngredients.length != 0 && (
						<section className="flex flex-col gap-2">
							<p className="font-semibold">Primary Ingredients</p>
							<div className="grid grid-cols-4 gap-4">
								{secondaryIngredients}
							</div>
						</section>
					)}
					{/* Optional ingredients */}
					{optionalIngredients.length != 0 && (
						<section className="flex flex-col gap-2">
							<p className="font-semibold">Primary Ingredients</p>
							<div className="grid grid-cols-4 gap-4">
								{optionalIngredients}
							</div>
						</section>
					)}

					<AddRecipeInstructionForm />

					<FormButton title="Add" isSubmitting={isSubmitting} />
				</form>
			</div>
		</div>
	);
};

export default AddRecipePage;
