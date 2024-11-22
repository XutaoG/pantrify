"use client";

import { SearchBarProps } from "@/types";
import { FormEvent, useState } from "react";
import { Search } from "lucide-react";

const SearchBar = ({ placeholderText, onSearch }: SearchBarProps) => {
	const [searchWord, setSearchWord] = useState("");

	const [isFocused, setIsFocused] = useState(false);

	const search = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		onSearch(searchWord.trim());
	};

	const clearSearch = () => {
		setSearchWord("");
		onSearch("");
	};

	return (
		<form
			className={`h-10 card-container rounded-full 
			flex items-center grow gap-4 px-4 ${isFocused && "border-neutral-200"}`}
			onSubmit={search}
		>
			{/* Input */}
			<input
				value={searchWord}
				onChange={(e) => {
					setSearchWord(e.target.value);
				}}
				className="bg-transparent grow outline-none"
				placeholder={placeholderText}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
			/>

			{/* Clear search */}
			{searchWord.trim() !== "" && (
				<button type="button" className="px-2 rounded-full border" onClick={clearSearch}>
					<p className="text-neutral-600">Clear Search</p>
				</button>
			)}

			{/* Search */}
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
