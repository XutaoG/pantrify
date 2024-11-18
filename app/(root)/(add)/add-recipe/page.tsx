"use client";

import RecipeIngredientFormModal from "@/components/add/add-recipe/RecipeIngredientFormModal";
import RecipeIngredientCard from "@/components/add/add-recipe/RecipeIngredientCard";
import FormButton from "@/components/form/FormButton";
import FormInput from "@/components/form/FormInput";
import FormNumberInput from "@/components/form/FormNumberInput";
import FormSelectionInput from "@/components/form/FormSelectionInput";
import FormTextArea from "@/components/form/FormTextArea";
import { addRecipeSchema, TAddRecipeIngredientSchema, TAddRecipeSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { MdOutlineAddCircle } from "react-icons/md";
import RecipeInstructionCard from "@/components/add/add-recipe/RecipeInstructionCard";
import RecipeDurationInput from "@/components/add/add-recipe/RecipeDurationInput";

const AddRecipePage = () => {
	const methods = useForm<TAddRecipeSchema>({
		resolver: zodResolver(addRecipeSchema),
		defaultValues: {
			numServings: 1,
			difficulty: "Easy",
			duration: "00:00",
			durationHour: "00",
			durationMinute: "00",
		},
	});

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		getValues,
		setValue,
	} = methods;

	//! Serving

	const onServingChange = (val: number) => {
		const numServings = Number(getValues("numServings"));

		if (isNaN(numServings) || numServings + val < 1 || numServings + val > 10) {
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

	//! Ingredients
	// * Model control
	const [isIngredientModalOpen, setIsIngredientModalOpen] = useState(false);
	const [ingredientEditIndex, setIngredientEditIndex] = useState<number | null>(null);
	const [ingredientEditObj, setIngredientEditObj] = useState<TAddRecipeIngredientSchema | null>(null);

	const openModelForAdd = () => {
		setIsIngredientModalOpen(true);
	};

	const openModelForEdit = (index: number, ingredient: TAddRecipeIngredientSchema) => {
		setIngredientEditIndex(index);
		setIngredientEditObj(ingredient);
		setIsIngredientModalOpen(true);
	};

	const closeModel = () => {
		setIsIngredientModalOpen(false);
	};

	const resetModal = () => {
		setIngredientEditIndex(null);
		setIngredientEditIndex(null);
		setIsIngredientModalOpen(false);
	};

	const [ingredients, setIngredients] = useState<TAddRecipeIngredientSchema[]>([]);

	//* Add ingredient
	const addIngredient = (newIngredient: TAddRecipeIngredientSchema) => {
		for (const ingredient of ingredients) {
			if (ingredient.name == newIngredient.name) {
				// Ingredient duplicated
				return;
			}
		}

		setIngredients([...ingredients, newIngredient]);
	};

	//* Edit ingredient
	const editIngredient = (index: number, newIngredient: TAddRecipeIngredientSchema) => {
		const updatedIngredients = ingredients.map((ingredient, i) => {
			if (index == i) {
				return newIngredient;
			}

			return ingredient;
		});

		setIngredients(updatedIngredients);
		resetModal();
	};

	//* Delete ingredient
	const deleteIngredient = (index: number) => {
		const updatedIngredients = ingredients.filter((_, i) => {
			return i !== index;
		});

		setIngredients(updatedIngredients);
		resetModal();
	};

	//* Render ingredient cards
	const primaryIngredients: JSX.Element[] = [];
	const secondaryIngredients: JSX.Element[] = [];
	const optionalIngredients: JSX.Element[] = [];

	ingredients.forEach((ingredient, index) => {
		const recipeIngredientCard = (
			<RecipeIngredientCard
				key={ingredient.name}
				ingredient={ingredient}
				index={index}
				onEdit={openModelForEdit}
				onDelete={deleteIngredient}
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
	const [instructions, setInstructions] = useState<string[]>(["", "", ""]);

	const addInstruction = () => {
		setInstructions([...instructions, ""]);
	};

	//* Edit instruction
	const editInstruction = (index: number, newInstruction: string) => {
		const updatedInstructions = instructions.map((instruction, i) => {
			if (index === i) {
				return newInstruction;
			}
			return instruction;
		});

		setInstructions(updatedInstructions);
	};

	//* Remove instruction
	const removeInstruction = (index: number) => {
		const updatedInstructions = instructions.filter((_, i) => {
			return index !== i;
		});

		setInstructions(updatedInstructions);
	};

	//* Move instruction
	const moveInstruction = (index: number, direction: number) => {
		if ((index === 0 && direction === -1) || (index === instructions.length - 1 && direction === 1)) {
			return;
		}

		const originalInstruction = instructions[index];
		const newInstruction = instructions[index + direction];

		const updatedInstructions = [...instructions];
		updatedInstructions[index] = newInstruction;
		updatedInstructions[index + direction] = originalInstruction;

		setInstructions(updatedInstructions);
	};

	//* Render instruction cards
	const instructionCards = instructions.map((instruction, index) => {
		return (
			<RecipeInstructionCard
				key={index}
				index={index}
				value={instruction}
				onInstructionRemove={removeInstruction}
				onInstructionEdit={editInstruction}
				onInstructionMove={moveInstruction}
			/>
		);
	});

	const addRecipe = () => {
		console.log(errors);
	};

	return (
		<div className="grow flex flex-col items-center gap-6 px-5 pt-10 pb-5 overflow-y-auto relative">
			<div className="container mx-auto flex flex-col gap-6">
				{/* Page title */}
				<div className="flex flex-col gap-2">
					<h2 className="font-semibold text-sky-600">Add a New Recipe</h2>
					<p className="text-neutral-600 font-medium">Enrich Your Own Personal Cookbook.</p>
				</div>

				<FormProvider {...methods}>
					<section className="flex flex-col gap-5">
						{/* Name field */}
						<FormInput
							{...register("name")}
							title="Recipe Name"
							placeholder="Enter the name of the recipe"
							errorMessage={errors.name?.message}
							isSubmitting={isSubmitting}
							className="grow"
						/>

						<div className="flex gap-4">
							{/* Serving field */}
							<FormNumberInput
								{...register("numServings")}
								title="Servings"
								placeholder="1"
								isSubmitting={isSubmitting}
								onValueIncrement={onServingChange}
								incrementAmount={1}
								className="w-40"
							/>

							{/* Duration field */}
							<RecipeDurationInput />

							{/* Difficulty field */}
							<FormSelectionInput
								{...register("difficulty")}
								title="Difficulty"
								isSubmitting={isSubmitting}
								selections={["Easy", "Medium", "Hard"]}
								currentSelection={getValues("difficulty")}
								onSelectionChange={onDifficultyChange}
								className="grow"
							/>
						</div>

						{/* Description field */}
						<FormTextArea
							{...register("description")}
							title="Description (optional)"
							placeholder="Enter the description of the recipe"
							errorMessage={errors.description?.message}
							isSubmitting={isSubmitting}
						/>

						{/* Open ingredient form */}
						<button
							type="button"
							className="self-center flex items-center gap-1 bg-emerald-500 p-2 rounded hover:bg-emerald-600 cursor-pointer"
							onClick={openModelForAdd}
						>
							<MdOutlineAddCircle className="text-white text-2xl" />
							<p className="text-white font-medium">Add Ingredient</p>
						</button>

						{/* Add ingredient form modal */}
						{isIngredientModalOpen && (
							<RecipeIngredientFormModal
								onIngredientAdd={addIngredient}
								onModalClose={closeModel}
								index={ingredientEditIndex}
								ingredient={ingredientEditObj}
								onIngredientEdit={editIngredient}
								onIngredientDelete={deleteIngredient}
							/>
						)}

						{/* Primary ingredients */}
						{primaryIngredients.length != 0 && (
							<section className="flex flex-col gap-2">
								<p className="font-semibold select-none">Primary Ingredients</p>
								<div className="grid grid-cols-3 gap-4">{primaryIngredients}</div>
							</section>
						)}
						{/* Secondary ingredients */}
						{secondaryIngredients.length != 0 && (
							<section className="flex flex-col gap-2">
								<p className="font-semibold select-none">Secondary Ingredients</p>
								<div className="grid grid-cols-3 gap-4">{secondaryIngredients}</div>
							</section>
						)}
						{/* Optional ingredients */}
						{optionalIngredients.length != 0 && (
							<section className="flex flex-col gap-2">
								<p className="font-semibold select-none">Optional Ingredients</p>
								<div className="grid grid-cols-3 gap-4">{optionalIngredients}</div>
							</section>
						)}

						{/* Instructions */}
						<section className="flex flex-col gap-6">
							<div className="flex flex-col gap-2">
								{/* Title */}
								<p className="font-semibold select-none">Instructions</p>

								{/* Cards */}
								{instructionCards}
							</div>

							{/* Add instruction button */}
							<button
								type="button"
								className="self-center flex items-center gap-1 bg-emerald-500 p-2 rounded hover:bg-emerald-600 cursor-pointer"
								onClick={addInstruction}
							>
								<MdOutlineAddCircle className="text-white text-2xl" />
								<p className="text-white font-medium">Add Instruction</p>
							</button>
						</section>

						{/* Add */}
						<FormButton title="Add Recipe" isSubmitting={isSubmitting} onClick={handleSubmit(addRecipe)} />
					</section>
				</FormProvider>
			</div>
		</div>
	);
};

export default AddRecipePage;
