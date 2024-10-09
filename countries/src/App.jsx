import Searchbar from './components/Searchbar';
import React, { useState, useEffect } from "react";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  const handleSearchChange = (event) => {
		setSearchQuery(event.target.value);
  };

  return (
		<>
			<Searchbar
				searchQuery={searchQuery}
				handleSearchChange={handleSearchChange}
			/>
		</>
  );
}

export default App
