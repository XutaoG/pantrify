"use client";

import { LoaderCircle } from "lucide-react";
import React, { ComponentPropsWithRef, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface FormButtonProps extends ComponentPropsWithRef<"button"> {
	title: string;
	icon?: ReactNode;
}

const FormButton = ({ title, icon, className, disabled, ...rest }: FormButtonProps) => {
	return (
		<button
			type="submit"
			className={twMerge(
				`bg-sky-600 py-2 rounded-xl flex justify-center items-center ${
					disabled ? "cursor-not-allowed" : "hover:bg-sky-500"
				}`,
				className
			)}
			disabled={disabled}
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
