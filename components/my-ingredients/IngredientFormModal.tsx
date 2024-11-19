"use client";

import { ingredientTypes } from "@/constants";
import { addIngredientSchema, IngredientFormModalProps, TAddIngredientSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormInput from "../form/FormInput";
import FormSelectionInput from "../form/FormSelectionInput";
import FormDateInput from "../form/FormDateInput";
import { MdCancel, MdOutlineAddCircle } from "react-icons/md";

const IngredientFormModal = ({ mode, onIngredientAdd, onModalClose }: IngredientFormModalProps) => {
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
	} = methods;

	//* Selection management
	const onIngredientTypeChange = (val: string) => {
		setValue("ingredientType", val);
	};

	const addIngredient = () => {
		onIngredientAdd(getValues());
	};

	const convertDate = (date: string) => {
		const parsedDate = Date.parse(date);

		if (isNaN(parsedDate)) {
			return undefined;
		} else {
			return new Date(parsedDate);
		}
	};

	return (
		<section className="fixed inset-0 flex justify-center items-center bg-black/15">
			<form
				onSubmit={handleSubmit(addIngredient)}
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

					<FormDateInput
						{...register("dateExpired", { setValueAs: convertDate })}
						className="grow"
						title="Expiration Date (Optional)"
						isSubmitting={isSubmitting}
						errorMessage={errors.dateExpired?.message}
					/>

					<div className="flex flex-col gap-2">
						{/* Add ingredient */}
						<button
							type="submit"
							className="flex justify-center items-center gap-2 
							bg-emerald-500 p-1.5 rounded hover:bg-emerald-600"
						>
							<MdOutlineAddCircle className="text-white text-xl" />
							<p className="text-white font-medium">
								{mode === "ingredient" ? "Add New Ingredient" : "Add to Shopping List"}
							</p>
						</button>

						{/* Cancel */}
						<button
							type="button"
							className="flex justify-center items-center gap-2 bg-red-400 
							p-1.5 rounded hover:bg-red-500"
							onClick={onModalClose}
						>
							<MdCancel className="text-white text-xl" />
							<p className="text-white font-medium">Cancel</p>
						</button>
					</div>
				</div>
			</form>
		</section>
	);
};

export default IngredientFormModal;
