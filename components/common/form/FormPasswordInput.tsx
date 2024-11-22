"use client";

import { FormPasswordInputProps } from "@/types";
import { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const FormPasswordInput = forwardRef<HTMLInputElement, FormPasswordInputProps>(
	({ header, headerIcon, errorMessage, placeholder, className, disabled, ...rest }, ref) => {
		const [passwordVisibility, setPasswordVisibility] = useState(false);

		const [isFocused, setIsFocused] = useState(false);

		const togglePasswordVisibility = () => {
			setPasswordVisibility((val) => !val);
		};

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
							className="grow py-1 bg-transparent outline-none min-w-0"
							placeholder={placeholder}
							type={!passwordVisibility ? "password" : ""}
							disabled={disabled}
							onFocus={() => setIsFocused(true)}
							onBlur={() => setIsFocused(false)}
						/>

						{/* Eye toggle */}
						<button
							type="button"
							className={`${disabled && "cursor-not-allowed"}`}
							onClick={togglePasswordVisibility}
						>
							{passwordVisibility ? <Eye size={20} /> : <EyeOff size={20} />}
						</button>
					</div>
				</div>

				{/* Error */}
				{errorMessage && <p className="px-1 text-red-600">{errorMessage}</p>}
			</div>
		);
	}
);

FormPasswordInput.displayName = "FormPasswordInput";

export default FormPasswordInput;
