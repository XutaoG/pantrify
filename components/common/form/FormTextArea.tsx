"use client";

import { FormTextAreaProps } from "@/types";
import { forwardRef } from "react";

const FormTextArea = forwardRef<HTMLTextAreaElement, FormTextAreaProps>(
	({ title, errorMessage, placeholder, isSubmitting, ...rest }, ref) => {
		return (
			<div className="flex flex-col gap-1 min-w-12">
				{/* Input */}
				<div
					className="flex flex-col gap-1 bg-neutral-100 border border-neutral-200 
					rounded shadow-md px-4 py-2"
				>
					{/* Title */}
					<p className="text-sm font-semibold text-neutral-600 select-none">{title}</p>

					<div className="flex gap-2 items-center">
						{/* Input */}
						<textarea
							{...rest}
							ref={ref}
							disabled={isSubmitting}
							className="grow py-1 bg-transparent outline-none min-h-36 max-h-36 resize-none"
							placeholder={placeholder}
						/>
					</div>
				</div>

				{/* Error */}
				{errorMessage && <p className="px-1 text-red-600">{errorMessage}</p>}
			</div>
		);
	}
);

FormTextArea.displayName = "FormTextArea";

export default FormTextArea;
