"use client";

import RecipeIngredientFormModal from "@/components/add/add-recipe/RecipeIngredientFormModal";
import RecipeIngredientCard from "@/components/add/add-recipe/RecipeIngredientCard";
import FormButton from "@/components/common/form/FormButton";
import FormInput from "@/components/common/form/FormInput";
import FormNumberInput from "@/components/common/form/FormNumberInput";
import FormSelectionInput from "@/components/common/form/FormSelectionInput";
import FormTextArea from "@/components/common/form/FormTextArea";
import {
	addRecipeSchema,
	AddRecipeDto,
	AddRecipeIngredientDto,
	TAddRecipeIngredientSchema,
	TAddRecipeSchema,
} from "@/types";
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
			numServings: "1",
			difficulty: "Easy",
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

		if (numServings + val < 1 || numServings + val > 10) {
			return;
		}

		if (getValues("numServings")) setValue("numServings", (numServings + val).toLocaleString());
	};

	//! Difficulty

	const onDifficultyChange = (val: string) => {
		setValue("difficulty", val, { shouldValidate: true });
	};

	//! Ingredients
	// * Modal control
	const [isIngredientModalOpen, setIsIngredientModalOpen] = useState(false);
	const [ingredientEditIndex, setIngredientEditIndex] = useState<number | null>(null);
	const [ingredientEditObj, setIngredientEditObj] = useState<TAddRecipeIngredientSchema | null>(null);

	const openModalForAdd = () => {
		setIsIngredientModalOpen(true);
	};

	const openModalForEdit = (index: number, ingredient: TAddRecipeIngredientSchema) => {
		setIngredientEditIndex(index);
		setIngredientEditObj(ingredient);
		setIsIngredientModalOpen(true);
	};

	const closeModal = () => {
		setIngredientEditIndex(null);
		setIngredientEditIndex(null);
		setIsIngredientModalOpen(false);
	};

	const [ingredients, setIngredients] = useState<TAddRecipeIngredientSchema[]>([]);

	//* Add ingredient
	// Success: returns null
	// Fail: error message
	const addIngredient = (newIngredient: TAddRecipeIngredientSchema) => {
		for (const ingredient of ingredients) {
			if (ingredient.name == newIngredient.name) {
				// Ingredient duplicated

				return "Ingredient already added";
			}
		}

		setIngredients([...ingredients, newIngredient]);
		return null;
	};

	//* Edit ingredient
	// Success: returns null
	// Fail: error message
	const editIngredient = (index: number, newIngredient: TAddRecipeIngredientSchema) => {
		for (const ingredient of ingredients) {
			if (ingredient.name == newIngredient.name) {
				// Ingredient duplicated

				return "Ingredient already added";
			}
		}

		const updatedIngredients = ingredients.map((ingredient, i) => {
			if (index == i) {
				return newIngredient;
			}

			return ingredient;
		});

		setIngredients(updatedIngredients);
		closeModal();
		return null;
	};

	//* Delete ingredient
	const deleteIngredient = (index: number) => {
		const updatedIngredients = ingredients.filter((_, i) => {
			return i !== index;
		});

		setIngredients(updatedIngredients);
		closeModal();
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
				onEdit={openModalForEdit}
				onDelete={deleteIngredient}
				isSubmitting={isSubmitting}
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
				isSubmitting={isSubmitting}
			/>
		);
	});

	const addRecipe = () => {
		// * Sanitize data
		const name = getValues("name").trim();
		const description = getValues("description").trim();
		const duration = Number(getValues("durationHour")) * 60 + Number(getValues("durationMinute"));
		const difficulty = getValues("difficulty") == "Easy" ? 1 : getValues("difficulty") == "Medium" ? 2 : 3;
		const numServings = Number(getValues("numServings"));

		for (let i = 0; i < instructions.length; i++) {
			instructions[i] = instructions[i].trim();
		}

		const addRecipeIngredientDtos = ingredients.map((ingredient) => {
			const ingredientDto: AddRecipeIngredientDto = {
				name: ingredient.name,
				ingredientType: ingredient.ingredientType,
				quantityWhole: Number(ingredient.quantityWhole),
				quantityFraction: ingredient.quantityFraction,
				quantityUnit: ingredient.quantityUnit,
			};

			return ingredientDto;
		});

		const addRecipeDto: AddRecipeDto = {
			name,
			description,
			duration,
			difficulty,
			numServings,
			ingredients: addRecipeIngredientDtos,
			instructions: instructions,
		};

		console.log(addRecipeDto);
	};

	return (
		<div id="add-recipe-page" className="grow flex flex-col items-center gap-6 px-5 pt-10 pb-5 overflow-y-auto">
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

						<div className="flex gap-6">
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
							onClick={openModalForAdd}
							disabled={isSubmitting}
						>
							<MdOutlineAddCircle className="text-white text-2xl" />
							<p className="text-white font-medium">Add Ingredient</p>
						</button>

						{/* Add ingredient form modal */}
						{isIngredientModalOpen && (
							<RecipeIngredientFormModal
								onIngredientAdd={addIngredient}
								onModalClose={closeModal}
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
								<div className="flex flex-col gap-4">{instructionCards}</div>
							</div>

							{/* Add instruction button */}
							<button
								type="button"
								className="self-center flex items-center gap-1 bg-emerald-500 p-2 rounded hover:bg-emerald-600 cursor-pointer"
								onClick={addInstruction}
								disabled={isSubmitting}
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
