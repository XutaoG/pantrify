"use client";

import { FormEvent, useState } from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
	onSearch: (searchWord: string) => void;
	placeholderText: string;
	className?: string;
}

const SearchBar = ({ placeholderText, onSearch, className }: SearchBarProps) => {
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
			className={`card-container rounded-full min-w-0
			flex items-center grow gap-2 sm:gap-4 py-1.5 md:py-2 px-3 md:px-4 ${
				isFocused && "border-neutral-200"
			} ${className}`}
			onSubmit={search}
		>
			{/* Input */}
			<input
				value={searchWord}
				onChange={(e) => {
					setSearchWord(e.target.value);
				}}
				className="bg-transparent grow outline-none min-w-0"
				placeholder={placeholderText}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
			/>

			{/* Clear search */}
			{searchWord.trim() !== "" && (
				<button type="button" className="px-2 rounded-full border" onClick={clearSearch}>
					<p className="text-neutral-600 text-sm sm:text-base text-nowrap">
						Clear Search
					</p>
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
