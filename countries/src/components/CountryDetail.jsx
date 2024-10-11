const CountryDetail = ({ country, weather }) => {
	return (
		<div>
			<h2>{country.name.common}</h2>
			<p>Capital: {country.capital[0]}</p>
			<p>Area: {country.area}</p>
			<h4>Language(s): </h4>
			<ul>
				{Object.values(country.languages).map(
					(language, index) => (
						<li key={index}>{language}</li>
					)
				)}
			</ul>
			<img src={country.flags.png} alt={country.flags.alt} />
			{weather ? (
				<div className="">
					<h3>Weather in {country.capital[0]}</h3>
					<p>
						Temperature: {weather.main.temp}{" "}
						Celcius
					</p>
					<img
						src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
						alt={
							weather.weather[0]
								.description
						}
					/>
					<p>Wind: {weather.wind.speed} m/s</p>
				</div>
			) : (
				<p>Loading weather data...</p>
			)}
		</div>
	);
};

export default CountryDetail;
