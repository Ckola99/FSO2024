import { useState, useEffect } from "react";

const CountryList = ({ countryList, searchQuery }) => {


	const matchedCountries = countryList.filter((country) =>
		country.name.common
			.toLowerCase()
			.includes(searchQuery.toLowerCase())
	);

	return (
		<div>
			{ matchedCountries.length < 10 &&
			  matchedCountries.length > 0 ? (
				<ul>
					{matchedCountries.map(
						(country, index) => (
							<li key={index}>
								{
									country
										.name
										.common
								}
							</li>
						)
					)}
				</ul>
			) : matchedCountries.length > 10 && searchQuery ? (
				<p>
					Too many matches, please specify your
					search.
				</p>
			) : searchQuery ? (
				<p>No corresponding country data found.</p>
			) : null }
		</div>
	);
};
export default CountryList;
