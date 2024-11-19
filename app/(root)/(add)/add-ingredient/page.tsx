"use client";

import FormButton from "@/components/form/FormButton";
import FormInput from "@/components/form/FormInput";
import FormSelectionInput from "@/components/form/FormSelectionInput";
import { ingredientTypes } from "@/constants";
import { addIngredientSchema, TAddIngredientSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormDateInput from "@/components/form/FormDateInput";

const AddIngredientPage = () => {
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

	const addIngredient = () => {};

	const convertDate = (date: string) => {
		const parsedDate = Date.parse(date);

		if (isNaN(parsedDate)) {
			return undefined;
		} else {
			return new Date(parsedDate);
		}
	};

	return (
		<div className="grow flex flex-col items-center gap-6 px-5 pt-10 pb-5 overflow-y-auto relative">
			<div className="container mx-auto flex flex-col gap-6">
				{/* Page title */}
				<div className="flex flex-col gap-2">
					<h2 className="font-semibold text-sky-600">Add a New Ingredient</h2>
					<p className="text-neutral-600 font-medium">Build Your Ingredient Collection</p>
				</div>

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

					<div className="flex gap-6">
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
					</div>

					<FormButton
						title="Add to Pantry"
						isSubmitting={isSubmitting}
						onClick={handleSubmit(addIngredient)}
					/>
					<FormButton
						title="Add to Shopping List"
						isSubmitting={isSubmitting}
						onClick={handleSubmit(addIngredient)}
						className="bg-purple-500 hover:bg-purple-600"
					/>
				</div>
			</div>
		</div>
	);
};

export default AddIngredientPage;
