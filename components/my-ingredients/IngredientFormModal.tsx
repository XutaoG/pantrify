"use client";

import { ingredientTypes } from "@/constants";
import { AddIngredientDto, addIngredientSchema, IngredientFormModalProps, TAddIngredientSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormInput from "../common/form/FormInput";
import FormSelectionInput from "../common/form/FormSelectionInput";
import FormDateInput from "../common/form/FormDateInput";
import { MdCancel, MdDelete, MdEdit, MdOutlineAddCircle, MdRemoveCircle } from "react-icons/md";
import { Fragment, useEffect, useState } from "react";
import { addIngredient, deleteIngredient } from "@/api";

const IngredientFormModal = ({ mode, ingredient, onModalClose }: IngredientFormModalProps) => {
	//! Form
	const methods = useForm<TAddIngredientSchema>({
		resolver: zodResolver(addIngredientSchema),
		defaultValues: {
			ingredientType: ingredientTypes[0],
		},
	});

	const {
		register,
		formState: { errors, isSubmitting },
		getValues,
		setValue,
		handleSubmit,
		reset,
	} = methods;

	useEffect(() => {
		//* Initialize form if ingredient is valid
		if (ingredient != null) {
			setValue("name", ingredient.name, { shouldValidate: true });
			setValue("ingredientType", ingredient.ingredientType);
			setValue(
				"dateExpired",
				ingredient.dateExpired ? new Date(ingredient?.dateExpired ?? "").toISOString().substring(0, 10) : ""
			);
		}
	}, [ingredient, setValue]);

	//! Message management
	const [formSuccessMessage, setFormSuccessMessage] = useState<string | null>(null);
	const [formErrorMessage, setFormErrorMessage] = useState<string | null>(null);

	const removeMessages = () => {
		setFormSuccessMessage(null);
		setFormErrorMessage(null);
	};

	//! Selection management
	const onIngredientTypeChange = (val: string) => {
		setValue("ingredientType", val);
	};

	//! Add ingredient

	const submitAddIngredient = async () => {
		const name = getValues("name").trim();
		const ingredientType = getValues("ingredientType");
		const isAvailable = mode == "ingredient";
		const isInCart = mode == "shopping";

		const parsedDate = Date.parse(getValues("dateExpired") ?? "");
		const dateExpired = isNaN(parsedDate) ? undefined : new Date(parsedDate);

		const newIngredient: AddIngredientDto = {
			name,
			ingredientType,
			isAvailable,
			isInCart,
			dateExpired,
		};

		const response = await addIngredient(newIngredient);

		if (response.errorMessage == null) {
			// No error

			setFormErrorMessage(null);
			setFormSuccessMessage("Ingredient added");
			reset();
		} else {
			setFormSuccessMessage(null);
			setFormErrorMessage(response.errorMessage);
		}
	};

	//! Cancel
	const cancel = () => {
		onModalClose();
	};

	//! Delete ingredient
	const submitDeleteIngredient = async () => {
		if (ingredient != null) {
			const response = await deleteIngredient(ingredient.id);

			if (response.errorMessage == null) {
				// No error

				onModalClose();
			} else {
				setFormSuccessMessage(null);
				setFormErrorMessage(response.errorMessage);
			}
		}
	};

	return (
		<section className="fixed inset-0 flex justify-center items-center bg-black/15">
			<form
				onSubmit={handleSubmit(submitAddIngredient)}
				className="w-96 flex flex-col gap-4 bg-white p-4 
				border border-neutral-200 rounded-md shadow-md"
				noValidate
			>
				{/* Page title */}
				<p className="font-semibold select-none">
					{mode === "ingredient" ? "Add New Ingredient" : "Add to Shopping List"}
				</p>

				<div className="flex flex-col gap-5">
					{/* Name field */}
					<FormInput
						{...register("name")}
						title="Ingredient Name"
						placeholder="Enter the name of the ingredient"
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
						selections={ingredientTypes}
						onSelectionChange={onIngredientTypeChange}
					/>

					{/* Expiration date field */}
					<FormDateInput
						{...register("dateExpired")}
						className="grow"
						title="Expiration Date (Optional)"
						isSubmitting={isSubmitting}
						errorMessage={errors.dateExpired?.message}
					/>

					{/* Success message */}
					{formSuccessMessage && (
						<p className="self-center px-1 text-emerald-500 font-medium">{formSuccessMessage}</p>
					)}

					{/* Error message */}
					{formErrorMessage && (
						<p className="self-center px-1 text-red-600 font-medium">{formErrorMessage}</p>
					)}

					<div className="flex flex-col gap-2">
						{/* Add or editingredient */}
						<button
							type="submit"
							className="flex justify-center items-center gap-2 
							bg-emerald-500 p-1.5 rounded hover:bg-emerald-600"
						>
							{ingredient == null ? (
								<Fragment>
									{/* Add icon and text */}
									<MdOutlineAddCircle className="text-white text-xl" />
									<p className="text-white font-medium">
										{mode === "ingredient" ? "Add New Ingredient" : "Add to Shopping List"}
									</p>
								</Fragment>
							) : (
								<Fragment>
									{/* Edit icon and text */}
									<MdEdit className="text-white text-xl" />
									<p className="text-white font-medium">Save Changes</p>
								</Fragment>
							)}
						</button>

						{/* Discard change or cancel */}
						<button
							type="button"
							className="flex justify-center items-center gap-2 bg-yellow-500 
							p-1.5 rounded hover:bg-yellow-600"
							onClick={cancel}
						>
							{ingredient == null ? (
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
						{ingredient != null && (
							<button
								type="button"
								className="flex justify-center items-center gap-2 bg-red-400 
								p-1.5 rounded hover:bg-red-500"
								onClick={submitDeleteIngredient}
							>
								{/* Delete icon and text */}
								<MdDelete className="text-white text-xl" />
								<p className="text-white font-medium">Delete</p>
							</button>
						)}
					</div>
				</div>
			</form>
		</section>
	);
};

export default IngredientFormModal;
