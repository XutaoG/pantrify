"use client";

import { FormNumberProps } from "@/types";
import { forwardRef } from "react";
import { MdAdd, MdRemove } from "react-icons/md";

const FormNumberInput = forwardRef<HTMLInputElement, FormNumberProps>(
	(
		{
			title,
			errorMessage,
			placeholder,
			isSubmitting,
			onValueIncrement,
			...rest
		},
		ref
	) => {
		return (
			<div className="flex flex-col gap-1 min-w-12 max-w-48">
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
							className="grow py-2 bg-transparent outline-none focus:bg-transparent min-w-0"
							placeholder={placeholder}
						/>
						<div className="flex gap-4 items-center">
							<MdRemove
								className="text-lg cursor-pointer"
								onClick={() => onValueIncrement(-1)}
							/>
							<p className="text-neutral-600">|</p>
							<MdAdd
								className="text-lg cursor-pointer"
								onClick={() => onValueIncrement(1)}
							/>
						</div>
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

FormNumberInput.displayName = "FormNumberInput";

export default FormNumberInput;
