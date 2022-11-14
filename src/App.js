import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {Login} from "./components/login";
import {Register} from "./components/register";
import "./App.css";
import HomePage from "./components/homepage/homePage";
import {NewAnalysis} from "./components/pages/newAnalysis";
import {ForgetPassword} from "./components/forgetPassword";

function App() {
    return (
        <div className='App'>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Navigate to='/login'/>}/>
                    <Route exact path='/login' element={<Login/>}/>
                    <Route exact path='/register' element={<Register/>}/>
                    <Route exact path='/forget-password' element={<ForgetPassword/>}/>
                    <Route exact path='/home' element={<HomePage/>}/>
                    <Route exact path='/new-analysis' element={<NewAnalysis/>}/>

                    <Route exact path='/analysis' element={<NewAnalysis/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
