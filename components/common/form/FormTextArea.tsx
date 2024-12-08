"use client";

import { ComponentPropsWithRef, forwardRef, ReactNode, useState } from "react";

interface FormTextAreaProps extends ComponentPropsWithRef<"textarea"> {
	header: string;
	headerIcon?: ReactNode;
	errorMessage?: string;
}

const FormTextArea = forwardRef<HTMLTextAreaElement, FormTextAreaProps>(
	({ header, headerIcon, errorMessage, placeholder, disabled, ...rest }, ref) => {
		const [isFocused, setIsFocused] = useState(false);

		return (
			<div className="flex flex-col gap-1 min-w-12">
				{/* Input */}
				<div
					className={`flex flex-col gap-1 card-container rounded-xl px-4 py-2 ${
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

					<div className="flex gap-2 items-center">
						{/* Input */}
						<textarea
							{...rest}
							ref={ref}
							className={`grow py-1 bg-transparent outline-none min-h-36 max-h-36 resize-none ${
								disabled && "cursor-not-allowed"
							}`}
							placeholder={placeholder}
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

FormTextArea.displayName = "FormTextArea";

export default FormTextArea;
