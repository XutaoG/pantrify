"use client";

import { Minus, Plus } from "lucide-react";
import { ComponentPropsWithRef, forwardRef, ReactNode, useEffect, useRef } from "react";

interface FormNumberProps extends ComponentPropsWithRef<"input"> {
	header: string;
	headerIcon?: ReactNode;
	onValueIncrement: (val: number) => void;
	incrementAmount: number;
}

const FormNumberInput = forwardRef<HTMLInputElement, FormNumberProps>(
	(
		{ header, headerIcon, onValueIncrement, incrementAmount, className, disabled, ...rest },
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
				<div className="h-20 flex flex-col gap-1 card-container rounded-xl px-4 py-2">
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
							className="grow py-1 bg-transparent outline-none min-w-0 cursor-default"
							readOnly
							disabled={disabled}
						/>
						<div className="flex gap-2 items-center">
							<button
								type="button"
								className={`${disabled && "cursor-not-allowed"}`}
								onClick={() => onValueIncrement(-incrementAmount)}
								onMouseDown={() => keepValueIncrement(-incrementAmount)}
								onMouseUp={stopValueIncrement}
								onMouseLeave={stopValueIncrement}
								disabled={disabled}
							>
								<Minus size={16} />
							</button>
							<p className="text-neutral-600 select-none">|</p>
							<button
								type="button"
								className={`${disabled && "cursor-not-allowed"}`}
								onClick={() => onValueIncrement(incrementAmount)}
								onMouseDown={() => keepValueIncrement(incrementAmount)}
								onMouseUp={stopValueIncrement}
								onMouseLeave={stopValueIncrement}
								disabled={disabled}
							>
								<Plus size={16} />
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
