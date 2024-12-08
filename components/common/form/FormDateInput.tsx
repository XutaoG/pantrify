"use client";

import { ComponentPropsWithRef, forwardRef, ReactNode, useState } from "react";

interface FormDateInputProps extends ComponentPropsWithRef<"input"> {
	header: string;
	headerIcon?: ReactNode;
	password?: boolean;
	errorMessage?: string;
}

const FormDateInput = forwardRef<HTMLInputElement, FormDateInputProps>(
	({ header, headerIcon, errorMessage, className, disabled, ...rest }, ref) => {
		const [isFocused, setIsFocused] = useState(false);

		return (
			<div className={`flex flex-col gap-1 min-w-12 ${className}`}>
				{/* Input */}
				<div
					className={`h-20 flex flex-col gap-1 card-container rounded-xl px-4 py-2 ${
						isFocused && "border-neutral-200"
					}`}
				>
					{/* Title */}
					<div className="flex items-center gap-1.5">
						{headerIcon}
						<p className="text-sm font-semibold text-neutral-600 select-none">
							{header}
						</p>
					</div>

					<div className="grow flex gap-2 items-center">
						{/* Input */}
						<input
							{...rest}
							ref={ref}
							type="date"
							className={`grow py-1 bg-transparent outline-none ${
								disabled && "cursor-not-allowed"
							}`}
							disabled={disabled}
							onFocus={() => setIsFocused(true)}
							onBlur={() => setIsFocused(false)}
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
