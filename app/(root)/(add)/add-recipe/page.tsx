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
import { useForm } from "react-hook-form";
import { MdAdd } from "react-icons/md";
import FormInstructionInput from "@/components/form/FormInstructionInput";

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

	//! Duration

	const onDurationChange = (val: number) => {
		const displayDuration = getValues("duration").split(":");
		const duration = Number(displayDuration[0]) * 60 + Number(displayDuration[1]);

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
			<FormInstructionInput
				key={index}
				index={index}
				value={instruction}
				onInstructionRemove={removeInstruction}
				onInstructionEdit={editInstruction}
				onInstructionMove={moveInstruction}
			/>
		);
	});

	return (
		<div className="grow flex flex-col items-center gap-6 px-5 pt-10 pb-5 overflow-y-auto relative">
			<div className="container mx-auto flex flex-col gap-6">
				{/* Page title */}
				<div className="flex flex-col gap-2">
					<h2 className="font-semibold text-sky-600">Add a New Recipe</h2>
					<p className="text-neutral-600 font-medium">Enrich Your Own Personal Cookbook.</p>
				</div>

				<section className="flex flex-col gap-5">
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

						{/* Serving field */}
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
						{/* Duration field */}
						<FormNumberInput
							{...register("duration")}
							title="Duration (Hour:Min)"
							errorMessage={errors.duration?.message}
							isSubmitting={isSubmitting}
							onValueIncrement={onDurationChange}
							incrementAmount={10}
							className="grow"
						/>

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
						title="Description"
						placeholder="Enter the description of the recipe"
						errorMessage={errors.description?.message}
						isSubmitting={isSubmitting}
					/>

					{/* Open ingredient form */}
					<div
						className="self-center flex items-center gap-1 bg-emerald-500 p-1 pr-2 rounded hover:bg-emerald-600 cursor-pointer"
						onClick={openModelForAdd}
					>
						<MdAdd className="text-white text-3xl" />
						<p className="text-white font-medium">Add Ingredient</p>
					</div>

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
							<p className="font-semibold">Primary Ingredients</p>
							<div className="grid grid-cols-3 gap-4">{primaryIngredients}</div>
						</section>
					)}
					{/* Secondary ingredients */}
					{secondaryIngredients.length != 0 && (
						<section className="flex flex-col gap-2">
							<p className="font-semibold">Secondary Ingredients</p>
							<div className="grid grid-cols-3 gap-4">{secondaryIngredients}</div>
						</section>
					)}
					{/* Optional ingredients */}
					{optionalIngredients.length != 0 && (
						<section className="flex flex-col gap-2">
							<p className="font-semibold">Optional Ingredients</p>
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
						<div
							className="self-center flex items-center gap-1 bg-emerald-500 p-1 pr-2 rounded hover:bg-emerald-600 cursor-pointer"
							onClick={addInstruction}
						>
							<MdAdd className="text-white text-3xl" />
							<p className="text-white font-medium">Add Instruction</p>
						</div>
					</section>

					{/* Add */}
					<FormButton title="Add Recipe" isSubmitting={isSubmitting} onClick={handleSubmit(() => {})} />
				</section>
			</div>
		</div>
	);
};

export default AddRecipePage;
