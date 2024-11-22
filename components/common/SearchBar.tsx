"use client";

import { SearchBarProps } from "@/types";
import { FormEvent, useState } from "react";
import { Search } from "lucide-react";

const SearchBar = ({ placeholderText }: SearchBarProps) => {
	const [searchKeyword, setSearchKeyword] = useState("");

	const [isFocused, setIsFocused] = useState(false);

	const search = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};

	return (
		<form
			className={`h-10 card-container rounded-full 
			flex items-center grow gap-4 px-4 ${isFocused && "border-neutral-200"}`}
			onSubmit={search}
		>
			<input
				value={searchKeyword}
				onChange={(e) => {
					setSearchKeyword(e.target.value);
				}}
				className="bg-transparent grow outline-none"
				placeholder={placeholderText}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
			/>
			<button
				type="submit"
				className={`hover:text-black ${isFocused ? "text-black" : "text-neutral-400"}`}
			>
				<Search size={20} />
			</button>
		</form>
	);
};

export default SearchBar;
