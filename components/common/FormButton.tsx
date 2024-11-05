import { FormButtonProps } from "@/types";
import React from "react";

const FormButton = ({ title }: FormButtonProps) => {
	return (
		<button className="bg-sky-600 py-2 rounded shadow-md">
			<p className="text-white font-semibold">{title}</p>
		</button>
	);
};

export default FormButton;
