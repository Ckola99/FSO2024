const Searchbar = ({ searchQuery, handleSearchChange, handleClear }) => {
	return (
		<div>
			<label htmlFor="country-search">
				find countries: <input type="text" id="country-search" value={searchQuery} onChange={handleSearchChange} placeholder="Enter country name" />
			</label>
		</div>
	);
};

export default Searchbar;
