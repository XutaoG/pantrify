"use client";

import { FormButtonProps } from "@/types";
import React from "react";
import { MdOutlineRefresh } from "react-icons/md";
import { twMerge } from "tailwind-merge";

const FormButton = ({ title, className, isSubmitting, ...rest }: FormButtonProps) => {
	return (
		<button
			type="submit"
			className={twMerge(
				"bg-sky-600 hover:bg-sky-500 py-2 rounded shadow-md flex justify-center items-center",
				className
			)}
			disabled={isSubmitting}
			{...rest}
		>
			{isSubmitting ? (
				<div className="flex gap-2 items-center">
					<MdOutlineRefresh className="text-white text-xl animate-spin" />
					<p className="text-white font-semibold">Loading</p>
				</div>
			) : (
				<p className="text-white font-semibold">{title}</p>
			)}
		</button>
	);
};

export default FormButton;
