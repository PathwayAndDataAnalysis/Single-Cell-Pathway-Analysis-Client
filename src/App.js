import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {Login} from "./components/login";
import {Register} from "./components/register";
import "./App.css";
import {HomePage} from "./components/homepage/homePage";
import {NewAnalysis} from "./components/pages/newAnalysis";
import {ForgetPassword} from "./components/forgetPassword";
import {ViewAnalysis} from "./components/pages/viewAnalysis/viewAnalysis";

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

                    <Route exact path='/analysis/:analysisName' element={<NewAnalysis/>}/>
                    <Route exact path='/view/analysis/:analysisName' element={<ViewAnalysis/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
