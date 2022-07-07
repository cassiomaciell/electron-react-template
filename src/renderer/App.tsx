import { useEffect, useState } from "react";
import "./app.css";

function App() {
	const [date, setDate] = useState(new Date());

	useEffect(() => {
		const task = setInterval(() => {
			setDate(new Date());
		}, 1000);
		return () => clearInterval(task);
	}, []);

	return (
		<div className="app">
			<div className="content">
				<div className="text">Hello World!</div>
				<div className="text">{date.toLocaleTimeString()}</div>
			</div>
		</div>
	);
}

export default App;
