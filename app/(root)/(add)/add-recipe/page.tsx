"use client";

import FormButton from "@/components/form/FormButton";
import FormInput from "@/components/form/FormInput";
import FormNumberInput from "@/components/form/FormNumberInput";
import FormSelectionInput from "@/components/form/FormSelectionInput";
import FormTextArea from "@/components/form/FormTextArea";
import { addRecipeSchema, TAddRecipeSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const AddRecipePage = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		getValues,
		setValue,
	} = useForm<TAddRecipeSchema>({
		resolver: zodResolver(addRecipeSchema),
		defaultValues: {
			numServings: 1,
			difficulty: "Easy",
		},
	});

	const onServingChange = (val: number) => {
		const numServings = Number(getValues("numServings"));

		if (
			isNaN(numServings) ||
			numServings + val < 1 ||
			numServings + val > 10
		) {
			return;
		}

		if (getValues("numServings"))
			setValue("numServings", numServings + val, {
				shouldValidate: true,
				shouldDirty: true,
				shouldTouch: true,
			});
	};

	const onDifficultyChange = (val: string) => {
		setValue("difficulty", val, { shouldValidate: true });
	};

	return (
		<div className="flex flex-col items-center gap-6 px-5 pt-10 pb-5">
			<div className="container mx-auto flex flex-col gap-6">
				{/* Page title */}
				<div className="flex flex-col gap-2">
					<h2 className="font-semibold text-sky-600">
						Add a New Recipe
					</h2>
					<p className="text-neutral-600 font-medium">
						Enrich Your Own Personal Cookbook.
					</p>
				</div>

				<form
					onSubmit={handleSubmit(() => {})}
					className="flex flex-col gap-4"
				>
					<div className="flex gap-4">
						{/* Name field */}
						<FormInput
							{...register("name")}
							title="Recipe Name"
							placeholder="Enter the name of the recipe"
							errorMessage={errors.name?.message}
							isSubmitting={isSubmitting}
						/>
						<FormNumberInput
							{...register("numServings")}
							title="Servings"
							placeholder="1"
							errorMessage={errors.numServings?.message}
							isSubmitting={isSubmitting}
							onValueIncrement={onServingChange}
						/>
						<FormSelectionInput
							{...register("difficulty")}
							title="Difficulty"
							errorMessage={errors.difficulty?.message}
							isSubmitting={isSubmitting}
							selections={["Easy", "Medium", "Hard"]}
							currentSelection={getValues("difficulty")}
							onSelectionChange={onDifficultyChange}
						/>
					</div>

					{/* Description */}
					<FormTextArea
						{...register("description")}
						title="Description"
						placeholder="Enter the description of the recipe"
						errorMessage={errors.description?.message}
						isSubmitting={isSubmitting}
					/>

					<FormButton title="Add" isSubmitting={isSubmitting} />
				</form>
			</div>
		</div>
	);
};

export default AddRecipePage;
