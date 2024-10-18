import Dropdown from "../common/Dropdown";
import SearchBar from "../common/SearchBar";
import AllPrimaryIngredients from "./AllPrimaryIngredients";
import AllSecondaryIngredients from "./AllSecondaryIngredients";

const AllIngredients = () => {
	return (
		<section className="flex flex-col gap-3">
			<div className="flex flex-col gap-6">
				<div className="flex gap-6">
					<SearchBar placeholderText="Search for a ingredient" />
					<Dropdown />
				</div>
				{/* All recipes */}
				<AllPrimaryIngredients />
				<AllSecondaryIngredients />
			</div>
		</section>
	);
};

export default AllIngredients;
