"use client";

import { FormNumberProps } from "@/types";
import { forwardRef, useEffect, useRef } from "react";
import { MdAdd, MdRemove } from "react-icons/md";

const FormNumberInput = forwardRef<HTMLInputElement, FormNumberProps>(
	({ title, placeholder, isSubmitting, onValueIncrement, incrementAmount, className, ...rest }, ref) => {
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
							disabled={isSubmitting}
							className="grow py-1 bg-transparent outline-none min-w-0"
							placeholder={placeholder}
							readOnly
						/>
						<div className="flex gap-2 items-center">
							<button
								type="button"
								onClick={() => onValueIncrement(-incrementAmount)}
								onMouseDown={() => keepValueIncrement(-incrementAmount)}
								onMouseUp={stopValueIncrement}
								onMouseLeave={stopValueIncrement}
								disabled={isSubmitting}
							>
								<MdRemove className="text-lg" />
							</button>
							<p className="text-neutral-600 select-none">|</p>
							<button
								type="button"
								onClick={() => onValueIncrement(incrementAmount)}
								onMouseDown={() => keepValueIncrement(incrementAmount)}
								onMouseUp={stopValueIncrement}
								onMouseLeave={stopValueIncrement}
								disabled={isSubmitting}
							>
								<MdAdd className="text-lg cursor-pointer" />
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
);

FormNumberInput.displayName = "FormNumberInput";

export default FormNumberInput;
