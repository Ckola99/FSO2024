import React, { useState, useEffect } from "react";
import axios from "axios";
import CountryDetail from "./components/CountryDetail";

function App() {
	const [searchQuery, setSearchQuery] = useState("");
	const [countryList, setCountryList] = useState([]);
	const [selectedCountry, setSelectedCountry] = useState(null);
	const [weatherData, setWeatherData] = useState(null);

	useEffect(() => {
		if (searchQuery.trim() === "") {
			setCountryList([]);
			return;
		}

		const fetchCountry = async () => {
			try {
				const response = await axios.get(
					`https://restcountries.com/v3.1/name/${searchQuery}`
				);
				setCountryList(response.data);
				console.log(response.data);
				setSelectedCountry(null);
				setWeatherData(null);

				if (response.data.length === 1){
					const [lat, lon] = response.data[0].capitalInfo.latlng;
					fetchWeatherData(lat, lon);
				}

			} catch (error) {
				console.error(
					"Error fetching data: ",
					error.data
				);
			}

		};
		fetchCountry();
	}, [searchQuery]);

	const handleClick = (country) => {
		// If the country clicked is the already selected one, hide it by setting it to null
		if (selectedCountry === country) {
			setSelectedCountry(null);
			setWeatherData(null);
		} else {
			setSelectedCountry(country); // Show the clicked country
			const [lat, lon] = country.capitalInfo.latlng;
			fetchWeatherData(lat, lon);
		}
	};

	const fetchWeatherData = async (lat, lon) => {
		try {
			const apiKey = import.meta.env.VITE_API_KEY; // Access the API key
			const response = await axios.get(
				`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
			);
			console.log('weatherData:', response.data)
			setWeatherData(response.data); // Save the weather data to state
		} catch (error) {
			console.error("Error fetching weather data:", error);
			setWeatherData(null);
		}
	};

	return (
		<>
			<h1>Country Information App</h1>
			<label htmlFor="country-search">
				Search for a country:{" "}
				<input
					type="text"
					value={searchQuery}
					onChange={(e) =>
						setSearchQuery(e.target.value)
					}
				/>
			</label>
			{countryList.length > 10 && (
				<p>
					Too many matches, please refine your
					search
				</p>
			)}
			{countryList.length <= 10 && countryList.length > 1 && (
				<div>
					<h2>Matching Countries</h2>
					<ul>
						{countryList.map((country) => (
							<li
								key={
									country
										.name
										.common
								}
							>
								{
									country
										.name
										.common
								}{" "}
								<button
									onClick={() =>
										handleClick(
											country
										)
									}
								>
									{selectedCountry ===
									country
										? "Hide"
										: "Show"}
								</button>
								{/* Show the details only if this country is selected */}
								{selectedCountry ===
									country && (
									<CountryDetail
										country={
											selectedCountry
										}
										weather={weatherData}
									/>
								)}
							</li>
						))}
					</ul>
				</div>
			)}

			{countryList.length === 1 && (
				<CountryDetail country={countryList[0]} weather={weatherData}/>
			)}
		</>
	);
}

export default App;
