import FormInput from "@/components/common/form/FormInput";
import RecipeIngredientQuantityInput from "@/components/add/add-recipe/RecipeIngredientQuantityInput";
import FormSelectionInput from "@/components/common/form/FormSelectionInput";
import { ingredientQuantityFractions, recipeIngredientTypes } from "@/constants";
import { RecipeIngredientFormModalProps, addRecipeIngredientSchema, TAddRecipeIngredientSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Fragment, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { MdOutlineAddCircle, MdCancel, MdDelete, MdEdit, MdRemoveCircle } from "react-icons/md";

const RecipeIngredientFormModal = ({
	onIngredientAdd,
	onModalClose,
	index,
	ingredient,
	onIngredientEdit,
	onIngredientDelete,
}: RecipeIngredientFormModalProps) => {
	//* Form
	const methods = useForm<TAddRecipeIngredientSchema>({
		resolver: zodResolver(addRecipeIngredientSchema),
		defaultValues: {
			ingredientType: recipeIngredientTypes[0],
			quantityFraction: ingredientQuantityFractions[0],
		},
	});

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		getValues,
		setValue,
		reset,
	} = methods;

	useEffect(() => {
		//* Initialize form if ingredient is valid
		if (index != null && ingredient != null) {
			setValue("name", ingredient.name, { shouldValidate: true });
			setValue("ingredientType", ingredient.ingredientType);
			setValue("quantityWhole", ingredient.quantityWhole, { shouldValidate: true });
			setValue("quantityFraction", ingredient.quantityFraction);
			setValue("quantityUnit", ingredient.quantityUnit);
		}
	}, [index, ingredient, setValue]);

	//* Selection management
	const onIngredientTypeChange = (val: string) => {
		setValue("ingredientType", val);
	};

	// * Message management
	const [formSuccessMessage, setFormSuccessMessage] = useState<string | null>(null);
	const [formErrorMessage, setFormErrorMessage] = useState<string | null>(null);

	const removeMessages = () => {
		setFormSuccessMessage(null);
		setFormErrorMessage(null);
	};

	//* Form submission
	const submitForm = () => {
		if (index == null || ingredient == null) {
			// Add ingredient

			const response = onIngredientAdd(getValues());

			if (response == null) {
				setFormSuccessMessage("Ingredient added");
				reset();
			} else {
				setFormErrorMessage(response);
			}
		} else {
			// Edit ingredient
			const response = onIngredientEdit(index, getValues());

			if (response != null) {
				setFormErrorMessage(response);
			}
		}
	};

	//* Close
	const cancelOrDelete = () => {
		if (index == null || ingredient == null) {
			// Cancel

			onModalClose();
		} else {
			// Delete

			onIngredientDelete(index);
		}
	};

	return (
		<section className="fixed inset-0 flex justify-center items-center bg-black/15">
			<FormProvider {...methods}>
				<form
					onSubmit={handleSubmit(submitForm)}
					className="flex flex-col gap-4 bg-white p-4 
					border border-neutral-200 rounded-md shadow-md"
				>
					{/* Title */}
					<p className="font-semibold">
						{index == null || ingredient == null ? "Add Ingredients" : "Edit ingredient"}
					</p>

					{/* Ingredient name field */}
					<FormInput
						{...register("name")}
						title="Ingredient Name"
						placeholder="ex: Egg"
						errorMessage={errors.name?.message}
						isSubmitting={isSubmitting}
						className="grow"
						onFocus={removeMessages}
					/>
					{/* Ingredient type field */}
					<FormSelectionInput
						{...register("ingredientType")}
						title="Ingredient Type"
						isSubmitting={isSubmitting}
						currentSelection={getValues("ingredientType")}
						selections={recipeIngredientTypes}
						onSelectionChange={onIngredientTypeChange}
					/>
					{/* Ingredient quantity field */}
					<RecipeIngredientQuantityInput />

					{/* Success message */}
					{formSuccessMessage && (
						<p className="self-center px-1 text-emerald-500 font-medium">{formSuccessMessage}</p>
					)}

					{/* Error message */}
					{formErrorMessage && (
						<p className="self-center px-1 text-red-600 font-medium">{formErrorMessage}</p>
					)}

					<div className="flex flex-col gap-2">
						{/* Add or edit ingredient */}
						<button
							type="submit"
							className="flex justify-center items-center gap-2 
							bg-emerald-500 p-1.5 rounded hover:bg-emerald-600"
						>
							{index == null || ingredient == null ? (
								<Fragment>
									{/* Add icon and text */}
									<MdOutlineAddCircle className="text-white text-xl" />
									<p className="text-white font-medium">Add Ingredient</p>
								</Fragment>
							) : (
								<Fragment>
									{/* Edit icon and text */}
									<MdEdit className="text-white text-xl" />
									<p className="text-white font-medium">Save Changes</p>
								</Fragment>
							)}
						</button>

						{/* Discard change button */}
						<button
							type="button"
							className="flex justify-center items-center gap-2 bg-yellow-500 
							p-1.5 rounded hover:bg-yellow-600"
							onClick={onModalClose}
						>
							{index == null || ingredient == null ? (
								<Fragment>
									{/* Cancel icon and text */}
									<MdCancel className="text-white text-xl" />
									<p className="text-white font-medium">Cancel</p>
								</Fragment>
							) : (
								<Fragment>
									{/* Discard change icon and text */}
									<MdRemoveCircle className="text-white text-xl" />
									<p className="text-white font-medium">Discard Changes</p>
								</Fragment>
							)}
						</button>

						{/* Delete */}
						{index != null && ingredient != null && (
							<button
								type="button"
								className="flex justify-center items-center gap-2 bg-red-400 
								p-1.5 rounded hover:bg-red-500"
								onClick={cancelOrDelete}
							>
								{/* Delete icon and text */}
								<MdDelete className="text-white text-xl" />
								<p className="text-white font-medium">Delete</p>
							</button>
						)}
					</div>
				</form>
			</FormProvider>
		</section>
	);
};

export default RecipeIngredientFormModal;
