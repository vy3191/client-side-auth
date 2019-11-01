import "./App.css"
import React from "react"
import { Link, Route} from 'react-router-dom';

function App() {
	return (
		<div className="wrapper">
			<nav>
				<Link to="/">Home</Link>
			</nav>
			<Route exact path="/signin">Home</Route>
			
		</div>
	)
}

export default App
