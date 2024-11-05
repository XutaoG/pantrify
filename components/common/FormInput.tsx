"use client";

import { FormInputProps } from "@/types";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import React, { useState } from "react";

const FormInput = ({ title, placeholder, password }: FormInputProps) => {
	const [passwordVisibility, setPasswordVisibility] = useState(false);

	const togglePasswordVisibility = () => {
		setPasswordVisibility((val) => !val);
	};

	return (
		<div
			className="flex flex-col gap-0 bg-neutral-100 border border-neutral-200 
			rounded shadow-md px-4 pt-2 min-w-12"
		>
			<p className="text-sm font-semibold text-neutral-600">{title}</p>
			<div className="flex gap-2 items-center">
				<input
					className="grow py-2 bg-transparent outline-none"
					placeholder={placeholder}
					type={password && !passwordVisibility ? "password" : ""}
				/>
				{password && (
					<div
						className="cursor-pointer"
						onClick={togglePasswordVisibility}
					>
						{passwordVisibility ? (
							<MdOutlineVisibility className="text-xl" />
						) : (
							<MdOutlineVisibilityOff className="text-xl" />
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default FormInput;
