"use client";

import { FormTimeInputProps } from "@/types";
import { forwardRef } from "react";

const FormTimeInput = forwardRef<HTMLInputElement, FormTimeInputProps>(
	({ title, errorMessage, placeholder, isSubmitting, ...rest }, ref) => {
		return (
			<div className="flex flex-col gap-1 min-w-12">
				{/* Input */}
				<div
					className="flex flex-col gap-0 bg-neutral-100 border border-neutral-200 
					rounded shadow-md px-4 pt-2"
				>
					{/* Title */}
					<p className="text-sm font-semibold text-neutral-600">
						{title}
					</p>

					<div className="flex gap-2 items-center">
						{/* Input */}
						<input
							{...rest}
							ref={ref}
							disabled={isSubmitting}
							className="grow py-2 bg-transparent outline-none focus:bg-transparent"
							placeholder={placeholder}
						/>
					</div>
				</div>

				{/* Error */}
				{errorMessage && (
					<p className="px-1 text-red-600">{errorMessage}</p>
				)}
			</div>
		);
	}
);

FormTimeInput.displayName = "FormTimeInput";

export default FormTimeInput;
