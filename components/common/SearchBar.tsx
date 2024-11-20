"use client";

import { SearchBarProps } from "@/types";
import { useState } from "react";
import { Search } from "lucide-react";

const SearchBar = ({ placeholderText }: SearchBarProps) => {
	const [searchKeyword, setSearchKeyword] = useState("");

	return (
		<form
			className="h-12 bg-neutral-100 border border-neutral-200 rounded 
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
			<button type="submit">
				<Search size={20} />
			</button>
		</form>
	);
};

export default SearchBar;
