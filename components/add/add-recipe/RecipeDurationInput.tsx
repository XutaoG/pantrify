"use client";

import { RecipeDurationInputProps, TAddRecipeSchema } from "@/types";
import { useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";

const RecipeDurationInput = ({ className }: RecipeDurationInputProps) => {
	const {
		register,
		formState: { isSubmitting },
		getValues,
		setValue,
	} = useFormContext<TAddRecipeSchema>();

	//* Interval

	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		// Stop interval when app unmounts
		return () => stopValueIncrement();
	}, []);

	const keepValueIncrement = (timer: "hour" | "minute", val: number) => {
		// If interval already exist, do not add a new interval
		if (intervalRef.current) {
			return;
		}

		intervalRef.current = setInterval(() => {
			if (timer === "hour") {
				incrementHour(val);
			} else {
				incrementMinute(val);
			}
		}, 150);
	};

	const stopValueIncrement = () => {
		// Clear all interval
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
	};

	//* Change hours

	const incrementHour = (val: number) => {
		const hour = Number(getValues("durationHour"));

		if (hour + val < 0 || hour + val > 99) {
			return;
		}

		setValue("durationHour", (hour + val).toLocaleString(undefined, { minimumIntegerDigits: 2 }));
	};

	//* Change minutes

	const incrementMinute = (val: number) => {
		const minute = Number(getValues("durationMinute"));

		if (minute + val < 0 || minute + val > 60) {
			return;
		}

		setValue("durationMinute", (minute + val).toLocaleString(undefined, { minimumIntegerDigits: 2 }));
	};

	return (
		<div
			className={`h-20 flex flex-col gap-1 bg-neutral-100 border border-neutral-200 
			rounded px-4 py-2 ${className}`}
		>
			{/* Title */}
			<p className="text-sm font-semibold text-neutral-600 select-none">Duration</p>

			<div className="grow flex items-center gap-4">
				<div className="flex gap-2 items-center">
					<p className="font-medium select-none">Hour:</p>

					{/* Hour field */}
					<div className="flex">
						<input
							{...register("durationHour")}
							disabled={isSubmitting}
							className="w-8 bg-white rounded-l border border-neutral-200 p-1 bg-transparent outline-none"
							readOnly
						/>

						{/* Control */}
						<div className="flex flex-col justify-evenly">
							<button
								className="border border-l-0 border-neutral-200 rounded-tr hover:bg-neutral-300"
								type="button"
								onClick={() => incrementHour(1)}
								onMouseDown={() => keepValueIncrement("hour", 1)}
								onMouseUp={stopValueIncrement}
								onMouseLeave={stopValueIncrement}
								disabled={isSubmitting}
							>
								<MdArrowDropUp className="" />
							</button>
							<button
								className="border border-l-0 border-t-0 border-neutral-200 rounded-br hover:bg-neutral-300"
								type="button"
								onClick={() => incrementHour(-1)}
								onMouseDown={() => keepValueIncrement("hour", -1)}
								onMouseUp={stopValueIncrement}
								onMouseLeave={stopValueIncrement}
								disabled={isSubmitting}
							>
								<MdArrowDropDown />
							</button>
						</div>
					</div>
				</div>

				<div className="flex gap-2 items-center">
					<p className="font-medium select-none">Minute:</p>

					{/* Minute field */}
					<div className="flex">
						<input
							{...register("durationMinute")}
							disabled={isSubmitting}
							className="w-8 bg-white rounded-l border border-neutral-200 p-1 bg-transparent outline-none"
							readOnly
						/>

						{/* Control */}
						<div className="flex flex-col justify-evenly">
							<button
								className="border border-l-0 border-neutral-200 rounded-tr hover:bg-neutral-300"
								type="button"
								onClick={() => incrementMinute(5)}
								onMouseDown={() => keepValueIncrement("minute", 5)}
								onMouseUp={stopValueIncrement}
								onMouseLeave={stopValueIncrement}
								disabled={isSubmitting}
							>
								<MdArrowDropUp />
							</button>
							<button
								className="border border-l-0 border-t-0 border-neutral-200 rounded-br hover:bg-neutral-300"
								type="button"
								onClick={() => incrementMinute(-5)}
								onMouseDown={() => keepValueIncrement("minute", -5)}
								onMouseUp={stopValueIncrement}
								onMouseLeave={stopValueIncrement}
								disabled={isSubmitting}
							>
								<MdArrowDropDown />
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RecipeDurationInput;
