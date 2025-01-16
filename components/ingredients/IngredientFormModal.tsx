"use client";

import { ingredientTypes } from "@/constants";
import { AddIngredientDto, addIngredientSchema, Ingredient, TAddIngredientSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormInput from "../common/form/FormInput";
import FormSelectionInput from "../common/form/FormSelectionInput";
import FormDateInput from "../common/form/FormDateInput";
import { Fragment, useContext, useEffect, useState } from "react";
import { addIngredient, updateIngredient } from "@/api";
import { CalendarX2, CirclePlus, CircleX, Egg, Ham, LoaderCircle, Pencil } from "lucide-react";
import { RefreshContext } from "../common/FetchContext";

interface IngredientFormModalProps {
	mode: "ingredient" | "shopping";
	onModalClose: () => void;
	ingredient?: Ingredient;
}

const IngredientFormModal = ({ mode, ingredient, onModalClose }: IngredientFormModalProps) => {
	//! Context
	const { refresh } = useContext(RefreshContext)!;

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
				ingredient.dateExpired
					? new Date(ingredient?.dateExpired ?? "").toISOString().substring(0, 10)
					: ""
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

	const submit = async () => {
		if (ingredient == null) {
			//* Add ingredient
			await submitAddIngredient();
		} else {
			//* Update ingredient
			await submitEditIngredient();
		}

		refresh();
	};

	const submitAddIngredient = async () => {
		const response = await addIngredient(parseIngredient());

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

	const submitEditIngredient = async () => {
		if (ingredient == null) {
			onModalClose();
			return;
		}

		const response = await updateIngredient(ingredient.id, parseIngredient());

		if (response.errorMessage == null) {
			// No error

			onModalClose();
		} else {
			setFormSuccessMessage(null);
			setFormErrorMessage(response.errorMessage);
		}
	};

	const parseIngredient = () => {
		// Sanitize inputs

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

		return newIngredient;
	};

	//! Cancel
	const cancel = () => {
		onModalClose();
	};

	return (
		<section className="fixed inset-0 flex justify-center items-end custom-sm:items-center bg-black/25 z-20">
			<form
				onSubmit={handleSubmit(submit)}
				className="grow custom-sm:grow-0 custom-sm:w-[400px] flex flex-col gap-3 custom-sm:gap-4 
				bg-gray-100 p-5 rounded-none custom-sm:rounded-xl shadow-sm"
				noValidate
			>
				{/* Page title */}
				<p className="font-semibold select-none">
					{ingredient != null
						? "Edit"
						: mode === "ingredient"
						? "Add New Ingredient"
						: "Add to Shopping List"}
				</p>

				{/* Name field */}
				<FormInput
					{...register("name")}
					header="Ingredient Name"
					headerIcon={<Ham size={16} />}
					placeholder="Enter the name of the ingredient"
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
					selections={ingredientTypes}
					onSelectionChange={onIngredientTypeChange}
					disabled={isSubmitting}
				/>

				{/* Expiration date field */}
				{mode == "ingredient" && (
					<FormDateInput
						{...register("dateExpired")}
						header="Expiration Date (Optional)"
						headerIcon={<CalendarX2 size={16} />}
						className="grow"
						errorMessage={errors.dateExpired?.message}
						disabled={isSubmitting}
					/>
				)}

				{/* Success message */}
				{formSuccessMessage && (
					<p className="self-center px-1 text-emerald-500 font-medium">
						{formSuccessMessage}
					</p>
				)}

				{/* Error message */}
				{formErrorMessage && (
					<p className="self-center px-1 text-red-600 font-medium">{formErrorMessage}</p>
				)}

				<div className="grid grid-cols-2 gap-3">
					{/* Add or edit ingredient */}
					<button
						type="submit"
						className="flex justify-center items-center gap-2 
							bg-sky-600 p-1.5 rounded-full hover:bg-sky-500"
					>
						{ingredient == null ? (
							<Fragment>
								{/* Add icon and text */}
								{isSubmitting ? (
									<LoaderCircle
										className="animate-spin"
										size={20}
										color="white"
									/>
								) : (
									<CirclePlus size={20} color="white" />
								)}
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
							p-1.5 rounded-full hover:bg-yellow-600"
						onClick={cancel}
					>
						<CircleX size={20} color="white" />
						<p className="text-white font-medium">Cancel</p>
					</button>
				</div>
			</form>
		</section>
	);
};

export default IngredientFormModal;
