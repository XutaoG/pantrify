import FormInstructionInput from "@/components/form/FormInstructionInput";

const AddRecipeInstructionForm = () => {
	return (
		<section className="flex flex-col gap-6">
			<div className="flex flex-col gap-2">
				<p className="font-semibold">Instructions</p>

				<FormInstructionInput />
			</div>
		</section>
	);
};

export default AddRecipeInstructionForm;
