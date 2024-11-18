"use client";

import { FormButtonProps } from "@/types";
import React from "react";
import { MdOutlineRefresh } from "react-icons/md";

const FormButton = ({ title, isSubmitting, ...rest }: FormButtonProps) => {
	return (
		<button
			{...rest}
			type="submit"
			className="bg-sky-600 py-2 rounded shadow-md flex justify-center items-center"
			disabled={isSubmitting}
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
