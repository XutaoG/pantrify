import { FormDateInputProps } from "@/types";
import { forwardRef } from "react";

const FormDateInput = forwardRef<HTMLInputElement, FormDateInputProps>(
	({ title, errorMessage, isSubmitting, className, ...rest }, ref) => {
		return (
			<div className={`flex flex-col gap-1 min-w-12 ${className}`}>
				{/* Input */}
				<div
					className="h-20 flex flex-col gap-1 bg-neutral-100 border border-neutral-200 
					rounded px-4 py-2"
				>
					{/* Title */}
					<p className="text-sm font-semibold text-neutral-600 select-none">{title}</p>

					<div className="grow flex gap-2 items-center">
						{/* Input */}
						<input
							{...rest}
							ref={ref}
							type="date"
							disabled={isSubmitting}
							className="grow py-1 bg-transparent outline-none"
						/>
					</div>
				</div>

				{/* Error */}
				{errorMessage && <p className="px-1 text-red-600">{errorMessage}</p>}
			</div>
		);
	}
);

FormDateInput.displayName = "FormDateInput";

export default FormDateInput;
