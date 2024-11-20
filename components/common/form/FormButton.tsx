"use client";

import { FormButtonProps } from "@/types";
import { LoaderCircle } from "lucide-react";
import React from "react";
import { twMerge } from "tailwind-merge";

const FormButton = ({ title, icon, className, disabled, ...rest }: FormButtonProps) => {
	return (
		<button
			type="submit"
			className={twMerge(
				"bg-sky-600 hover:bg-sky-500 py-2 rounded flex justify-center items-center",
				className
			)}
			{...rest}
		>
			{disabled ? (
				<div className="flex gap-2 items-center">
					<LoaderCircle className="animate-spin" color="white" />
					<p className="text-white font-semibold">Loading</p>
				</div>
			) : (
				<div className="flex gap-2 items-center">
					{icon}
					<p className="text-white font-semibold">{title}</p>
				</div>
			)}
		</button>
	);
};

export default FormButton;
