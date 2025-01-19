import FormInput from "@/components/common/form/FormInput";
import FormSelectionInput from "@/components/common/form/FormSelectionInput";
import { ingredientQuantityFractions, recipeIngredientTypes } from "@/constants";
import { addRecipeIngredientSchema, TAddRecipeIngredientSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Fragment, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { CirclePlus, CircleX, Egg, Ham, Pencil } from "lucide-react";
import RecipeIngredientQuantityInput from "./RecipeIngredientQuantityInput";

interface RecipeIngredientFormModalProps {
	onIngredientAdd: (ingredient: TAddRecipeIngredientSchema) => string | null;
	onModalClose: () => void;
	index: number | null;
	ingredient: TAddRecipeIngredientSchema | null;
	onIngredientEdit: (index: number, newIngredient: TAddRecipeIngredientSchema) => string | null;
}

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
		<section className="fixed inset-0 flex justify-center items-end custom-sm:items-center bg-black/25">
			<FormProvider {...methods}>
				<form
					onSubmit={handleSubmit(submitForm)}
					className="grow custom-sm:grow-0 custom-sm:w-[400px] flex flex-col gap-3 custom-sm:gap-4 
					bg-gray-100 p-5 rounded-none custom-sm:rounded-xl shadow-sm"
					noValidate
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
							className={`flex justify-center items-center gap-2 bg-sky-600
							p-1.5 rounded-full ${isSubmitting ? "cursor-not-allowed" : "hover:bg-sky-500"}`}
							disabled={isSubmitting}
						>
							{index == null || ingredient == null ? (
								<Fragment>
									{/* Add icon and text */}
									<CirclePlus size={20} color="white" />
									<p className="text-white font-medium tracking-wide">Add</p>
								</Fragment>
							) : (
								<Fragment>
									{/* Edit icon and text */}
									<Pencil size={18} color="white" />
									<p className="text-white font-medium tracking-wide">Save</p>
								</Fragment>
							)}
						</button>

						{/* Cancel */}
						<button
							type="button"
							className={`flex justify-center items-center gap-2 bg-red-400 
							p-1.5 rounded-full ${isSubmitting ? "cursor-not-allowed" : "hover:bg-red-500"}`}
							onClick={onModalClose}
							disabled={isSubmitting}
						>
							<CircleX size={20} color="white" />
							<p className="text-white font-medium tracking-wide">Cancel</p>
						</button>
					</div>
				</form>
			</FormProvider>
		</section>
	);
};

export default RecipeIngredientFormModal;
