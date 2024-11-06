"use client";

import { FormInputProps } from "@/types";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { forwardRef, useState } from "react";

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
	(
		{ title, password, errorMessage, placeholder, isSubmitting, ...rest },
		ref
	) => {
		const [passwordVisibility, setPasswordVisibility] = useState(false);

		const togglePasswordVisibility = () => {
			setPasswordVisibility((val) => !val);
		};

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
							type={
								password && !passwordVisibility
									? "password"
									: ""
							}
						/>

						{/* Eye toggle */}
						{password && (
							<div
								className="cursor-pointer"
								onClick={togglePasswordVisibility}
							>
								{passwordVisibility ? (
									<MdOutlineVisibility className="text-xl" />
								) : (
									<MdOutlineVisibilityOff className="text-xl" />
								)}
							</div>
						)}
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

FormInput.displayName = "FormInput";

export default FormInput;
