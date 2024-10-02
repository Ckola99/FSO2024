import { useState } from "react";

// Button.jsx
const Button = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>;
};

const StatisticLine = ({ text, value }) => {
	return (
		<p>
			{text} {value}
		</p>
	);
};


const Statistics = ({ good, bad, neutral, total }) => {
	return (
		<>
			<h1>statistics</h1>
			{total > 0 ? (
				<div>
					<StatisticLine
						text="good"
						value={good}
					/>
					<StatisticLine
						text="neutral"
						value={neutral}
					/>
					<StatisticLine text="bad" value={bad} />
					<StatisticLine
						text="all"
						value={total}
					/>
					<StatisticLine
						text="average"
						value={
							(good - bad) / total ||
							0
						}
					/>
					<StatisticLine
						text="positive"
						value={`${
							(good / total) * 100 ||
							0
						}%`}
					/>
				</div>
			) : (
				<p>No feedback given</p>
			)}
		</>
	);
};

const App = () => {
	// save clicks of each button to its own state
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);
	const total = good + neutral + bad;

	const handleGood = () => {
		console.log(good);
		setGood(good + 1);
	};

	const handleBad = () => {
		setBad(bad + 1);
	};

	const handleNeutral = () => {
		setNeutral(neutral + 1);
	};

	return (
		<div>
			<h1>give feedback</h1>
			<Button text="good" onClick={handleGood} />
			<Button text="neutral" onClick={handleNeutral} />
			<Button text="bad" onClick={handleBad} />
			<Statistics
				total={total}
				good={good}
				bad={bad}
				neutral={neutral}
			/>
		</div>
	);
};

export default App;
