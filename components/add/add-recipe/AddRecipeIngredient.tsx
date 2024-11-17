import FormInput from "@/components/form/FormInput";
import FormQuantityInput from "@/components/form/FormQuantityInput";
import FormSelectionInput from "@/components/form/FormSelectionInput";
import { ingredientTypes } from "@/constants";
import { addRecipeIngredientSchema, TAddRecipeIngredientSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { MdAdd } from "react-icons/md";

const AddRecipeIngredient = () => {
	const {
		register,
		// handleSubmit,
		formState: { errors, isSubmitting },
		getValues,
		setValue,
	} = useForm<TAddRecipeIngredientSchema>({
		resolver: zodResolver(addRecipeIngredientSchema),
		defaultValues: {
			ingredientType: ingredientTypes[0],
		},
	});

	const onIngredientTypeChange = (val: string) => {
		setValue("ingredientType", val, { shouldValidate: true });
	};

	const onQuantityFractionSelectionChange = (val: string) => {
		setValue("quantityFraction", val, { shouldValidate: true });
	};

	const onQuantityUnitSelectionChange = (val: string) => {
		setValue("quantityUnit", val, { shouldValidate: true });
	};

	return (
		<div className="flex flex-col gap-4">
			<p className="font-semibold">Add Ingredients</p>

			<div className="flex gap-4">
				<FormInput
					{...register("name")}
					title="Ingredient Name"
					placeholder="ex: Egg"
					errorMessage={errors.name?.message}
					isSubmitting={isSubmitting}
					className="grow"
				/>
				<FormSelectionInput
					{...register("ingredientType")}
					title="Ingredient Type"
					isSubmitting={isSubmitting}
					currentSelection={getValues("ingredientType")}
					selections={ingredientTypes}
					onSelectionChange={onIngredientTypeChange}
				/>
				<FormQuantityInput
					// quantityWholeRegister={register("quantityWhole")}
					// quantityFractionRegister={register("quantityFraction")}
					register={register}
					isSubmitting={isSubmitting}
					currentQuantityFractionSelection={getValues(
						"quantityFraction"
					)}
					onQuantityFractionSelectionChange={
						onQuantityFractionSelectionChange
					}
					currentQuantityUnitSelection={getValues("quantityUnit")}
					onQuantityUnitSelectionChange={
						onQuantityUnitSelectionChange
					}
				/>
			</div>

			<div
				className="self-center size-10 rounded-full bg-emerald-300 flex justify-center items-center
				hover:bg-emerald-400 cursor-pointer"
			>
				<MdAdd className="text-white text-3xl" />
			</div>
		</div>
	);
};

export default AddRecipeIngredient;
