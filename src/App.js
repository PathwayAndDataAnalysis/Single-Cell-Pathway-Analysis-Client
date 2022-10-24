import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./components/login";
import { Register } from "./components/register";
import "./App.css";

function App() {
	return (
		<div className='App'>
			<BrowserRouter>
				<Routes>
					<Route exact path='/login' element={<Login />} />
					<Route exact path='/register' element={<Register />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
