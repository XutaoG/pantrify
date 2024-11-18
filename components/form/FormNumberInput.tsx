"use client";

import { FormNumberProps } from "@/types";
import { forwardRef, useEffect, useRef } from "react";
import { MdAdd, MdRemove } from "react-icons/md";

const FormNumberInput = forwardRef<HTMLInputElement, FormNumberProps>(
	(
		{ title, errorMessage, placeholder, isSubmitting, onValueIncrement, incrementAmount, className, ...rest },
		ref
	) => {
		// Store interval
		const intervalRef = useRef<NodeJS.Timeout | null>(null);

		useEffect(() => {
			// Stop interval when app unmounts
			return () => stopValueIncrement();
		}, []);

		const keepValueIncrement = (val: number) => {
			// If interval already exist, do not add a new interval
			if (intervalRef.current) {
				return;
			}

			intervalRef.current = setInterval(() => {
				onValueIncrement(val);
			}, 150);
		};

		const stopValueIncrement = () => {
			// Clear all interval
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
				intervalRef.current = null;
			}
		};

		return (
			<div className={`flex flex-col gap-1 min-w-0 ${className}`}>
				{/* Input */}
				<div
					className="flex flex-col gap-0 bg-neutral-100 border border-neutral-200 
					rounded shadow-md px-4 pt-2"
				>
					{/* Title */}
					<p className="text-sm font-semibold text-neutral-600 select-none">{title}</p>

					<div className="flex gap-2 items-center">
						{/* Input */}
						<input
							{...rest}
							ref={ref}
							disabled={isSubmitting}
							className="grow py-2 bg-transparent outline-none focus:bg-transparent min-w-0"
							placeholder={placeholder}
							readOnly
						/>
						<div className="flex gap-4 items-center">
							<MdRemove
								className="text-lg cursor-pointer"
								onClick={() => onValueIncrement(-incrementAmount)}
								onMouseDown={() => keepValueIncrement(-incrementAmount)}
								onMouseUp={stopValueIncrement}
								onMouseLeave={stopValueIncrement}
							/>
							<p className="text-neutral-600 select-none">|</p>
							<MdAdd
								className="text-lg cursor-pointer"
								onClick={() => onValueIncrement(incrementAmount)}
								onMouseDown={() => keepValueIncrement(incrementAmount)}
								onMouseUp={stopValueIncrement}
								onMouseLeave={stopValueIncrement}
							/>
						</div>
					</div>
				</div>

				{/* Error */}
				{errorMessage && <p className="px-1 text-red-600">{errorMessage}</p>}
			</div>
		);
	}
);

FormNumberInput.displayName = "FormNumberInput";

export default FormNumberInput;
