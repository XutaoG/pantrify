import FormInput from "@/components/form/FormInput";
import FormQuantityInput from "@/components/form/FormQuantityInput";
import FormSelectionInput from "@/components/form/FormSelectionInput";
import { ingredientQuantityUnits, ingredientTypes } from "@/constants";
import {
	AddRecipeIngredientFormProps,
	addRecipeIngredientSchema,
	TAddRecipeIngredientSchema,
} from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { MdAdd } from "react-icons/md";

const AddRecipeIngredientForm = ({
	onIngredientAdd,
}: AddRecipeIngredientFormProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		getValues,
		setValue,
	} = useForm<TAddRecipeIngredientSchema>({
		resolver: zodResolver(addRecipeIngredientSchema),
		defaultValues: {
			ingredientType: ingredientTypes[0],
			// quantityUnit: ingredientQuantityUnits[0],
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
		<div className="flex flex-col gap-6">
			<div className="flex flex-col gap-2">
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
			</div>

			<div
				className="self-center flex items-center gap-1 bg-emerald-500 p-1 pr-2 rounded hover:bg-emerald-600 cursor-pointer"
				onClick={handleSubmit(onIngredientAdd)}
			>
				<MdAdd className="text-white text-3xl" />
				<p className="text-white font-medium">Add Ingredient</p>
			</div>
		</div>
	);
};

export default AddRecipeIngredientForm;
