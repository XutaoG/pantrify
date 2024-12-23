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
	RecipeInstructionCardObj,
} from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import RecipeInstructionCard from "@/components/add/add-recipe/RecipeInstructionCard";
import RecipeDurationInput from "@/components/add/add-recipe/RecipeDurationInput";
import { Text, ChefHat, Gauge, Users, CirclePlus } from "lucide-react";
import PageTitle from "@/components/common/PageTitle";
import RecipeImagesInput from "@/components/add/add-recipe/RecipeImagesInput";
import { addRecipeApi } from "@/api";
import Divider from "@/components/common/Divider";

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

	//! Images
	const [images, setImages] = useState<File[]>([]);

	//* Add image
	const addImage = (image: File) => {
		if (images.length < 4) {
			setImages([...images, image]);
		}
	};

	//* Delete image
	const removeImage = (index: number) => {
		const updatedImages = images.filter((_, i) => {
			return i !== index;
		});

		setImages(updatedImages);
	};

	//* Move image
	const moveImage = (index: number, direction: number) => {
		if ((index === 0 && direction === -1) || (index === images.length - 1 && direction === 1)) {
			return;
		}

		const originalImage = images[index];
		const newImage = images[index + direction];

		const updatedImages = [...images];
		updatedImages[index] = newImage;
		updatedImages[index + direction] = originalImage;

		setImages(updatedImages);
	};

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
	const [ingredientEditObj, setIngredientEditObj] = useState<TAddRecipeIngredientSchema | null>(
		null
	);

	//* Ingredients error
	const [ingredientsError, setIngredientsError] = useState<string | null>(null);

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
		setIngredientsError(null);
		return null;
	};

	//* Edit ingredient
	// Success: returns null
	// Fail: error message
	const editIngredient = (index: number, newIngredient: TAddRecipeIngredientSchema) => {
		for (let i = 0; i < ingredients.length; i++) {
			if (i != index && ingredients[i].name == newIngredient.name) {
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

	//* Check if zero primary or secondary ingredients
	//* true is valid
	const checkIngredientsCount = () => {
		let hasIngredients = false;
		ingredients.forEach((ingredient) => {
			if (
				ingredient.ingredientType === "Primary" ||
				ingredient.ingredientType === "Secondary"
			) {
				hasIngredients = true;
			}
		});

		if (!hasIngredients) {
			setIngredientsError("At least 1 ingredient must be added");
		}

		return hasIngredients;
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
	const [instructions, setInstructions] = useState<RecipeInstructionCardObj[]>([
		{ value: "" },
		{ value: "" },
		{ value: "" },
	]);

	//* Ingredients error
	const [instructionsError, setInstructionsError] = useState<string | null>(null);

	const addInstruction = () => {
		setInstructions([...instructions, { value: "" }]);
		setInstructionsError(null);
	};

	//* Edit instruction
	const editInstruction = (index: number, newInstruction: string) => {
		const updatedInstructions = instructions.map((instruction, i) => {
			if (index === i) {
				if (newInstruction.trim().length === 0) {
					return {
						value: newInstruction,
						error: "Instruction cannot be empty",
					};
				} else {
					return { value: newInstruction };
				}
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
		if (
			(index === 0 && direction === -1) ||
			(index === instructions.length - 1 && direction === 1)
		) {
			return;
		}

		const originalInstruction = instructions[index];
		const newInstruction = instructions[index + direction];

		const updatedInstructions = [...instructions];
		updatedInstructions[index] = newInstruction;
		updatedInstructions[index + direction] = originalInstruction;

		setInstructions(updatedInstructions);
	};

	//* Check if zero instructions
	const checkInstructionsCount = () => {
		if (instructions.length === 0) {
			setInstructionsError("At least 1 instruction must be added");
			return false;
		}
		return true;
	};

	//* Check if instructions are empty
	const checkInstructionsContent = () => {
		let hasEmptyInstructions = false;
		const updatedInstructions = instructions.map((instruction) => {
			if (instruction.value.trim().length === 0) {
				hasEmptyInstructions = true;
				return {
					value: instruction.value,
					error: "Instruction cannot be empty",
				};
			}

			return instruction;
		});

		setInstructions(updatedInstructions);
		return !hasEmptyInstructions;
	};

	//* Render instruction cards
	const instructionCards = instructions.map((instruction, index) => {
		return (
			<RecipeInstructionCard
				key={index}
				index={index}
				value={instruction.value}
				onInstructionRemove={removeInstruction}
				onInstructionEdit={editInstruction}
				onInstructionMove={moveInstruction}
				isSubmitting={isSubmitting}
				error={instruction.error}
			/>
		);
	});

	const parseRecipe = () => {
		// * Sanitize data
		const name = getValues("name").trim();
		const description = getValues("description").trim();
		const duration =
			Number(getValues("durationHour")) * 60 + Number(getValues("durationMinute"));
		const difficulty =
			getValues("difficulty") == "Easy" ? 1 : getValues("difficulty") == "Medium" ? 2 : 3;
		const numServings = Number(getValues("numServings"));

		for (let i = 0; i < instructions.length; i++) {
			instructions[i].value = instructions[i].value.trim();
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
			instructions: instructions.map((instruction) => instruction.value),
			images: images,
		};

		return addRecipeDto;
	};

	const addRecipe = async () => {
		const recipe = parseRecipe();

		const ingredientsCountCheck = checkIngredientsCount();
		const instructionsCountCheck = checkInstructionsCount();
		const instructionsContentCheck = checkInstructionsContent();

		if (!ingredientsCountCheck || !instructionsCountCheck || !instructionsContentCheck) {
			return;
		}

		const response = await addRecipeApi(recipe);
		if (response.errorMessage != null) {
			console.log(response.errorMessage);
		}
	};

	return (
		<div
			id="add-recipe-page"
			className="grow flex flex-col items-center gap-6 px-5 pt-10 pb-5 overflow-y-auto"
		>
			<div className="container mx-auto flex flex-col gap-6">
				{/* Page title */}
				<PageTitle title="Add a New Recipe" subtitle="Enrich Your Own Personal Cookbook." />

				<FormProvider {...methods}>
					<section className="flex flex-col gap-5">
						{/* Images field */}
						<RecipeImagesInput
							images={images}
							onImageAdd={addImage}
							onImageRemove={removeImage}
							onImageMove={moveImage}
							isSubmitting={isSubmitting}
						/>

						{/* Name field */}
						<FormInput
							{...register("name")}
							header="Recipe Name"
							headerIcon={<ChefHat size={16} />}
							placeholder="Enter the name of the recipe"
							errorMessage={errors.name?.message}
							className="grow"
							disabled={isSubmitting}
						/>

						<div className="flex gap-6">
							{/* Serving field */}
							<FormNumberInput
								{...register("numServings")}
								header="Servings"
								headerIcon={<Users size={16} />}
								onValueIncrement={onServingChange}
								incrementAmount={1}
								className="w-40"
								disabled={isSubmitting}
							/>

							{/* Duration field */}
							<RecipeDurationInput />

							{/* Difficulty field */}
							<FormSelectionInput
								{...register("difficulty")}
								header="Difficulty"
								headerIcon={<Gauge size={16} />}
								selections={["Easy", "Medium", "Hard"]}
								currentSelection={getValues("difficulty")}
								onSelectionChange={onDifficultyChange}
								className="grow"
								disabled={isSubmitting}
							/>
						</div>

						{/* Description field */}
						<FormTextArea
							{...register("description")}
							header="Description (optional)"
							headerIcon={<Text size={16} />}
							placeholder="Enter the description of the recipe"
							errorMessage={errors.description?.message}
							disabled={isSubmitting}
						/>

						<Divider />

						{/* Open ingredient form */}
						<button
							type="button"
							className={`self-center flex items-center gap-2 bg-emerald-400 p-2 px-3 rounded-full ${
								isSubmitting ? "cursor-not-allowed" : "hover:bg-emerald-500"
							}`}
							onClick={openModalForAdd}
							disabled={isSubmitting}
						>
							<CirclePlus size={20} color="white" />
							<p className="text-white font-medium">Add Ingredient</p>
						</button>

						{/* Ingredients error */}
						{ingredientsError && (
							<p className="self-center font-medium px-1 text-red-600">
								{ingredientsError}
							</p>
						)}

						{/* Add ingredient form modal */}
						{isIngredientModalOpen && (
							<RecipeIngredientFormModal
								onIngredientAdd={addIngredient}
								onModalClose={closeModal}
								index={ingredientEditIndex}
								ingredient={ingredientEditObj}
								onIngredientEdit={editIngredient}
							/>
						)}

						{/* Primary ingredients */}
						{primaryIngredients.length != 0 && (
							<section className="flex flex-col gap-2">
								<p className="font-semibold text-sm select-none">
									Primary Ingredients
								</p>
								<div className="grid grid-cols-3 gap-4">{primaryIngredients}</div>
							</section>
						)}
						{/* Secondary ingredients */}
						{secondaryIngredients.length != 0 && (
							<section className="flex flex-col gap-2">
								<p className="font-semibold text-sm select-none">
									Secondary Ingredients
								</p>
								<div className="grid grid-cols-3 gap-4">{secondaryIngredients}</div>
							</section>
						)}
						{/* Optional ingredients */}
						{optionalIngredients.length != 0 && (
							<section className="flex flex-col gap-2">
								<p className="font-semibold text-sm select-none">
									Optional Ingredients
								</p>
								<div className="grid grid-cols-3 gap-4">{optionalIngredients}</div>
							</section>
						)}

						<Divider />

						{/* Instructions */}
						<section className="flex flex-col gap-5">
							{instructionCards.length !== 0 && (
								<div className="flex flex-col gap-4">
									{/* Title */}
									<p className="font-medium self-center select-none">
										Instructions
									</p>

									{/* Cards */}
									<div className="flex flex-col gap-4">{instructionCards}</div>
								</div>
							)}

							{/* Add instruction button */}
							<button
								type="button"
								className={`self-center flex items-center gap-2 bg-emerald-400 p-2 px-3 rounded-full ${
									isSubmitting ? "cursor-not-allowed" : "hover:bg-emerald-500"
								}`}
								onClick={addInstruction}
								disabled={isSubmitting}
							>
								<CirclePlus size={20} color="white" />
								<p className="text-white font-medium">Add Instruction</p>
							</button>

							{/* Instructions error */}
							{instructionsError && (
								<p className="self-center font-medium px-1 text-red-600">
									{instructionsError}
								</p>
							)}
						</section>

						{/* Add */}
						<FormButton
							title="Add Recipe"
							icon={<ChefHat color="white" />}
							onClick={handleSubmit(addRecipe)}
							disabled={isSubmitting}
						/>
					</section>
				</FormProvider>
			</div>
		</div>
	);
};

export default AddRecipePage;
