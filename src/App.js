import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Login } from "./components/login";
import { Register } from "./components/register";
import "./App.css";
import HomePage from "./components/homePage";

function App() {
	return (
		<div className='App'>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Navigate to='/login' />} />
					<Route exact path='/login' element={<Login />} />
					<Route exact path='/register' element={<Register />} />
					<Route exact path='/home' element={<HomePage />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
