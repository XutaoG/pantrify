import FormInput from "@/components/form/FormInput";
import RecipeIngredientQuantityInput from "@/components/add/add-recipe/RecipeIngredientQuantityInput";
import FormSelectionInput from "@/components/form/FormSelectionInput";
import { ingredientQuantityFractions, ingredientTypes } from "@/constants";
import { AddRecipeIngredientFormProps, addRecipeIngredientSchema, TAddRecipeIngredientSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Fragment, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { MdAdd, MdCancel, MdDelete, MdEdit } from "react-icons/md";

const RecipeIngredientFormModal = ({
	onIngredientAdd,
	onModalClose,
	index,
	ingredient,
	onIngredientEdit,
	onIngredientDelete,
}: AddRecipeIngredientFormProps) => {
	//* Form
	const methods = useForm<TAddRecipeIngredientSchema>({
		resolver: zodResolver(addRecipeIngredientSchema),
		defaultValues: {
			ingredientType: ingredientTypes[0],
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
			setValue("ingredientType", ingredient.ingredientType, { shouldValidate: true });
			setValue("quantityWhole", ingredient.quantityWhole, { shouldValidate: true });
			setValue("quantityFraction", ingredient.quantityFraction, { shouldValidate: true });
			setValue("quantityUnit", ingredient.quantityUnit, { shouldValidate: true });
		}
	}, [index, ingredient, setValue]);

	//* Selection management
	const onIngredientTypeChange = (val: string) => {
		setValue("ingredientType", val);
	};

	//* Form submission
	const submitForm = () => {
		if (index == null || ingredient == null) {
			// Add ingredient

			onIngredientAdd(getValues());
			reset();
		} else {
			// Edit ingredient
			onIngredientEdit(index, getValues());
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
		<section className="absolute inset-0 flex justify-center items-center">
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
					/>
					{/* Ingredient type field */}
					<FormSelectionInput
						{...register("ingredientType")}
						title="Ingredient Type"
						isSubmitting={isSubmitting}
						currentSelection={getValues("ingredientType")}
						selections={ingredientTypes}
						onSelectionChange={onIngredientTypeChange}
					/>
					{/* Ingredient quantity field */}
					<RecipeIngredientQuantityInput />

					<div className="flex flex-col gap-2">
						{/* Add ingredient */}
						<button
							type="submit"
							className="flex justify-center items-center gap-2
						bg-emerald-500 p-1.5 rounded hover:bg-emerald-600"
						>
							{index == null || ingredient == null ? (
								<Fragment>
									{/* Add icon and text */}
									<MdAdd className="text-white text-xl" />
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

						{/* Cancel */}
						<button
							type="button"
							className="flex justify-center items-center gap-2 bg-red-400 
							p-1.5 rounded hover:bg-red-500"
							onClick={cancelOrDelete}
						>
							{index == null || ingredient == null ? (
								<Fragment>
									{/* Cancel icon and text */}
									<MdCancel className="text-white text-xl" />
									<p className="text-white font-medium">Cancel</p>
								</Fragment>
							) : (
								<Fragment>
									{/* Delete icon and text */}
									<MdDelete className="text-white text-xl" />
									<p className="text-white font-medium">Delete</p>
								</Fragment>
							)}
						</button>
					</div>
				</form>
			</FormProvider>
		</section>
	);
};

export default RecipeIngredientFormModal;
