"use client";

import { SearchBarProps } from "@/types";
import { useState } from "react";
import { MdSearch } from "react-icons/md";

const SearchBar = ({ placeholderText }: SearchBarProps) => {
	const [searchKeyword, setSearchKeyword] = useState("");

	return (
		<div
			className="h-12 bg-neutral-100 border border-neutral-200 rounded shadow-md 
			flex items-center grow gap-4 px-4"
		>
			<input
				value={searchKeyword}
				onChange={(e) => {
					setSearchKeyword(e.target.value);
				}}
				className="bg-transparent grow outline-none"
				placeholder={placeholderText}
			/>
			<MdSearch className="text-2xl" />
		</div>
	);
};

export default SearchBar;
