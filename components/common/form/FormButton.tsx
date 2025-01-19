"use client";

import { LoaderCircle } from "lucide-react";
import React, { ComponentPropsWithRef, Fragment, ReactNode } from "react";
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
				`bg-sky-600 py-2 rounded-xl flex justify-center items-center gap-2 ${
					disabled ? "cursor-not-allowed" : "hover:bg-sky-500"
				}`,
				className
			)}
			disabled={disabled}
			{...rest}
		>
			{disabled ? (
				<Fragment>
					<LoaderCircle className="animate-spin" color="white" />
					<p className="text-white font-semibold tracking-wide">Loading</p>
				</Fragment>
			) : (
				<Fragment>
					{icon}
					<p className="text-white font-semibold tracking-wide">{title}</p>
				</Fragment>
			)}
		</button>
	);
};

export default FormButton;
