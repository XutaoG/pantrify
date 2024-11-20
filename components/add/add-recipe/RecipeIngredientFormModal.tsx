import FormInput from "@/components/common/form/FormInput";
import RecipeIngredientQuantityInput from "@/components/add/add-recipe/RecipeIngredientQuantityInput";
import FormSelectionInput from "@/components/common/form/FormSelectionInput";
import { ingredientQuantityFractions, recipeIngredientTypes } from "@/constants";
import {
	RecipeIngredientFormModalProps,
	addRecipeIngredientSchema,
	TAddRecipeIngredientSchema,
} from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Fragment, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { CirclePlus, CircleX, Egg, Ham, Pencil } from "lucide-react";

const RecipeIngredientFormModal = ({
	onIngredientAdd,
	onModalClose,
	index,
	ingredient,
	onIngredientEdit,
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

	return (
		<section className="fixed inset-0 flex justify-center items-center bg-black/15">
			<FormProvider {...methods}>
				<form
					onSubmit={handleSubmit(submitForm)}
					className="w-96 flex flex-col gap-4 bg-white p-6 
					border border-neutral-200 rounded-md shadow-md"
				>
					{/* Title */}
					<p className="font-semibold">
						{index == null || ingredient == null
							? "Add Ingredients"
							: "Edit ingredient"}
					</p>

					{/* Ingredient name field */}
					<FormInput
						{...register("name")}
						header="Ingredient Name"
						headerIcon={<Ham size={16} />}
						placeholder="ex: Egg"
						errorMessage={errors.name?.message}
						className="grow"
						onFocus={removeMessages}
						disabled={isSubmitting}
					/>
					{/* Ingredient type field */}
					<FormSelectionInput
						{...register("ingredientType")}
						header="Ingredient Type"
						headerIcon={<Egg size={16} />}
						currentSelection={getValues("ingredientType")}
						selections={recipeIngredientTypes}
						onSelectionChange={onIngredientTypeChange}
						disabled={isSubmitting}
					/>
					{/* Ingredient quantity field */}
					<RecipeIngredientQuantityInput />

					{/* Success message */}
					{formSuccessMessage && (
						<p className="self-center px-1 text-emerald-500 font-medium">
							{formSuccessMessage}
						</p>
					)}

					{/* Error message */}
					{formErrorMessage && (
						<p className="self-center px-1 text-red-600 font-medium">
							{formErrorMessage}
						</p>
					)}

					<div className="grid grid-cols-2 gap-3">
						{/* Add or edit ingredient */}
						<button
							type="submit"
							className="flex justify-center items-center gap-2 
							bg-emerald-500 p-1.5 rounded hover:bg-emerald-600"
						>
							{index == null || ingredient == null ? (
								<Fragment>
									{/* Add icon and text */}
									<CirclePlus size={20} color="white" />
									<p className="text-white font-medium">Add</p>
								</Fragment>
							) : (
								<Fragment>
									{/* Edit icon and text */}
									<Pencil size={18} color="white" />
									<p className="text-white font-medium">Save</p>
								</Fragment>
							)}
						</button>

						{/* Cancel */}
						<button
							type="button"
							className="flex justify-center items-center gap-2 bg-yellow-500 
							p-1.5 rounded hover:bg-yellow-600"
							onClick={onModalClose}
						>
							<CircleX size={20} color="white" />
							<p className="text-white font-medium">Cancel</p>
						</button>
					</div>
				</form>
			</FormProvider>
		</section>
	);
};

export default RecipeIngredientFormModal;
