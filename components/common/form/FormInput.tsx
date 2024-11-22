"use client";

import { FormInputProps } from "@/types";
import { forwardRef, useState } from "react";

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
	({ header, headerIcon, errorMessage, placeholder, className, disabled, ...rest }, ref) => {
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
							className={`grow py-1 bg-transparent outline-none min-w-0 ${
								disabled && "cursor-not-allowed"
							}`}
							disabled={disabled}
							placeholder={placeholder}
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

FormInput.displayName = "FormInput";

export default FormInput;
