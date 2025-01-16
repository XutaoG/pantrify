"use client";

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
	Recipe,
} from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useContext, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Text, ChefHat, Gauge, Users, CirclePlus, CircleX } from "lucide-react";
import PageTitle from "@/components/common/PageTitle";
import { addRecipeApi, updateRecipeApi } from "@/api";
import Divider from "@/components/common/Divider";
import { RefreshContext } from "@/components/common/FetchContext";
import { convertImageURLtoFile, getHourFromTime, getMinuteFromTime } from "@/utils";
import RecipeInstructionCard from "./RecipeInstructionCard";
import RecipeImagesInput from "./RecipeImagesInput";
import RecipeDurationInput from "./RecipeDurationInput";
import RecipeIngredientFormModal from "./RecipeIngredientFormModal";
import RecipeIngredientCardsDisplay from "./RecipeIngredientCardsDisplay";

interface AddRecipePageProps {
	recipe?: Recipe;
	onModalClose: () => void;
}

const RecipeFormModal = ({ recipe, onModalClose }: AddRecipePageProps) => {
	const { refresh } = useContext(RefreshContext)!;

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

	const [isFetchingImages, setIsFetchingImages] = useState(false);

	//* Add image
	const addImage = useCallback(
		(image: File) => {
			if (images.length < 4) {
				setImages([...images, image]);
			}
		},
		[images]
	);

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

	//* Ingredient type counts
	let primaryIngredientsCount = 0;
	let secondaryIngredientsCount = 0;
	let optionalIngredientsCount = 0;

	ingredients.forEach((ingredient) => {
		if (ingredient.ingredientType == "Primary") {
			primaryIngredientsCount++;
		} else if (ingredient.ingredientType == "Secondary") {
			secondaryIngredientsCount++;
		} else {
			optionalIngredientsCount++;
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

	const submitRecipe = async () => {
		const parsedRecipe = parseRecipe();

		const ingredientsCountCheck = checkIngredientsCount();
		const instructionsCountCheck = checkInstructionsCount();
		const instructionsContentCheck = checkInstructionsContent();

		if (!ingredientsCountCheck || !instructionsCountCheck || !instructionsContentCheck) {
			return;
		}

		if (recipe == null) {
			// Add recipe

			const response = await addRecipeApi(parsedRecipe);
			if (response.errorMessage != null) {
				console.log(response.errorMessage);
			}
		} else {
			// Update recipe

			const response = await updateRecipeApi(recipe.id, parsedRecipe);
			if (response.errorMessage != null) {
				console.log(response.errorMessage);
			}
		}

		onModalClose();
		refresh();
	};

	useEffect(() => {
		//* Initialize form if recipe is valid
		if (recipe != null) {
			setValue("name", recipe.name, { shouldValidate: true });
			setValue("description", recipe.description ?? "");
			setValue("difficulty", recipe.difficulty.toString(), { shouldValidate: true });
			setValue("durationHour", getHourFromTime(recipe.duration).toString(), {
				shouldValidate: true,
			});
			setValue("durationMinute", getMinuteFromTime(recipe.duration).toString(), {
				shouldValidate: true,
			});
			setValue("numServings", recipe.numServings.toString(), { shouldValidate: true });

			// Initialize images

			const populateImages = async () => {
				setIsFetchingImages(true);

				const imageFiles: File[] = [];

				for (const image of recipe.images) {
					imageFiles.push(await convertImageURLtoFile(image.path));
				}

				setImages(imageFiles);

				setIsFetchingImages(false);
			};

			populateImages();

			// Initialize ingredients
			const populateIngredients = () => {
				const existingIngredients: TAddRecipeIngredientSchema[] = recipe.ingredients.map(
					(ingredient) => {
						return {
							name: ingredient.name,
							ingredientType: ingredient.ingredientType,
							quantityWhole: ingredient.quantityWhole?.toString() ?? "",
							quantityFraction: ingredient.quantityFraction ?? "None",
							quantityUnit: ingredient.quantityUnit ?? "",
						};
					}
				);

				setIngredients(existingIngredients);
			};

			populateIngredients();

			// Initialize instructions
			const populateInstructions = () => {
				const existingInstructions: RecipeInstructionCardObj[] = recipe.instructions.map(
					(instruction) => {
						return { value: instruction.instruction };
					}
				);

				setInstructions(existingInstructions);
			};

			populateInstructions();
		}
	}, [recipe, setValue]);

	return (
		<section
			className="fixed inset-0 flex flex-col custom-sm:items-center gap-6 
			py-0 custom-sm:py-2 sm:py-4 md:py-6 lg:py-10 bg-black/15 z-50"
		>
			<div
				className="grow custom-sm:w-[440px] sm:w-[600px] md:w-[728px] lg:w-[984px] 
				flex flex-col items-center gap-6 bg-gray-100 p-3 custom-sm:p-6 pr-1.5 custom-sm:pr-3 
				pt-4 custom-sm:pt-6 rounded-none custom-sm:rounded-2xl shadow-sm min-h-0"
			>
				{/* Discard */}
				<button
					type="button"
					className={`bg-neutral-500 rounded-full 
						flex justify-center items-center gap-2 p-1 px-1.5 pr-2.5 ${
							isSubmitting ? "cursor-not-allowed" : "hover:bg-neutral-600"
						}`}
					onClick={onModalClose}
				>
					<CircleX color="white" />
					<p className="text-white font-semibold">Discard</p>
				</button>

				{/* Content */}
				<div className="container mx-auto flex flex-col gap-6 pr-1.5 custom-sm:pr-3 overflow-y-auto">
					{/* Page title */}
					<PageTitle
						title={recipe == null ? "Add a New Recipe" : "Editing Existing Recipe"}
						subtitle="Enrich Your Own Personal Cookbook."
					/>

					<FormProvider {...methods}>
						<section className="flex flex-col gap-3 custom-sm:gap-4 lg:gap-6">
							{/* Images field */}
							<RecipeImagesInput
								images={images}
								onImageAdd={addImage}
								onImageRemove={removeImage}
								onImageMove={moveImage}
								isSubmitting={isSubmitting}
								isFetchingImages={isFetchingImages}
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

							<div className="flex flex-wrap gap-3 custom-sm:gap-4 lg:gap-6">
								{/* Serving field */}
								<FormNumberInput
									{...register("numServings")}
									header="Servings"
									headerIcon={<Users size={16} />}
									onValueIncrement={onServingChange}
									incrementAmount={1}
									className="w-40 grow md:w-auto lg:w-40"
									disabled={isSubmitting}
								/>

								{/* Duration field */}
								<RecipeDurationInput className="grow sm:grow-0" />

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

							{/* Ingredients */}
							<div className="flex flex-col gap-3 custom-sm:gap-4 lg:gap-6 py-6 md:py-8">
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

								{ingredients.length !== 0 && (
									<div
										className="flex flex-col gap-3 custom-sm:gap-4 lg:gap-6 
										p-4 py-4 sm:py-6 rounded-lg bg-gray-200"
									>
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
										{primaryIngredientsCount > 0 && (
											<RecipeIngredientCardsDisplay
												ingredientType="Primary"
												ingredients={ingredients}
												onEdit={openModalForEdit}
												onDelete={deleteIngredient}
												isSubmitting={isSubmitting}
											/>
										)}
										{/* Secondary ingredients */}
										{secondaryIngredientsCount > 0 && (
											<RecipeIngredientCardsDisplay
												ingredientType="Secondary"
												ingredients={ingredients}
												onEdit={openModalForEdit}
												onDelete={deleteIngredient}
												isSubmitting={isSubmitting}
											/>
										)}
										{/* Optional ingredients */}
										{optionalIngredientsCount > 0 && (
											<RecipeIngredientCardsDisplay
												ingredientType="Optional"
												ingredients={ingredients}
												onEdit={openModalForEdit}
												onDelete={deleteIngredient}
												isSubmitting={isSubmitting}
											/>
										)}
									</div>
								)}
							</div>

							<Divider />

							{/* Instructions */}
							<section className="flex flex-col gap-3 custom-sm:gap-4 lg:gap-6 py-6 md:py-8">
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

								{instructionCards.length !== 0 && (
									<div className="flex flex-col gap-2 p-4 py-4 sm:py-6 rounded-lg bg-gray-200">
										{/* Title */}
										<p className="font-medium self-center select-none">
											Instructions
										</p>

										{/* Cards */}
										<div className="flex flex-col gap-3 custom-sm:gap-4 lg:gap-6">
											{instructionCards}
										</div>
									</div>
								)}
							</section>

							<Divider />

							{/* Add and discard buttons */}
							<div className="flex flex-col md:grid md:grid-cols-2 pt-4 md:pt-6 gap-2 custom-sm:gap-3 md:gap-4">
								{/* Add */}
								<FormButton
									title={recipe == null ? "Add Recipe" : "Save"}
									icon={<ChefHat color="white" />}
									onClick={handleSubmit(submitRecipe)}
									disabled={isSubmitting || isFetchingImages}
								/>

								{/* Discard */}
								<button
									type="button"
									className={`bg-red-400 py-2 rounded-xl flex justify-center items-center gap-2 ${
										isSubmitting ? "cursor-not-allowed" : "hover:bg-red-500"
									}`}
									onClick={onModalClose}
								>
									<CircleX color="white" />
									<p className="text-white font-semibold">
										{recipe == null ? "Discard" : "Discard changes"}
									</p>
								</button>
							</div>
						</section>
					</FormProvider>
				</div>
			</div>
		</section>
	);
};

export default RecipeFormModal;
