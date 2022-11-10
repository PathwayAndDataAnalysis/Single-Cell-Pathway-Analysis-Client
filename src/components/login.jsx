import {useState} from "react";
import {InputTextField} from "./inputTextField";
import {LoginButton} from "./buttons/loginButton";
import {ForgetPasswordButton} from "./buttons/forgetPasswordButton";
import {RegisterButton} from "./buttons/registerButton";
import {Link} from "react-router-dom";
import {loginUser} from "./api/apiHandlers";

export function Login() {
    const [data, setData] = useState({email: "", password: ""});

    function handleChange(e) {
        setData((data) => ({...data, [e.target.name]: e.target.value}));
    }

    function handleForgetPassword() {
        console.log("Forget Password");
    }

    function handleRegister() {
        console.log("Register");
    }

    function onLoginClick(e) {
        e.preventDefault();

        const loginInfo = {
            email: data.email,
            password: data.password,
        };

        loginUser(loginInfo)
            .then((res) => {
                if (res.status === 200) {
                    window.location = "/home";
                }
            })
            .catch((err) => {
                console.log("Error Login: " + err.message);
            });
    }

    return (
        <div className='min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12'>
            <div className='p-10 xs:p-0 mx-auto md:w-full md:max-w-md'>
                <h1 className='font-bold text-center text-2xl mb-5'>Log in</h1>

                <div className='bg-white shadow w-full rounded-lg divide-y divide-gray-200'>
                    <div className='px-5 py-7'>
                        <form onSubmit={onLoginClick}>
                            <div>
                                <label htmlFor='email' className='font-semibold text-sm text-gray-600 pb-1 block'>
                                    Email
                                </label>
                                <InputTextField
                                    type='email'
                                    name='email'
                                    id='email'
                                    value={data.email}
                                    onChange={handleChange}
                                    placeholder='Example@email.com'
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor='password'
                                    className='font-semibold text-sm text-gray-600 pb-1 block'
                                >
                                    Password
                                </label>
                                <InputTextField
                                    type='password'
                                    name='password'
                                    id='password'
                                    value={data.password}
                                    onChange={handleChange}
                                    placeholder='Password'
                                />
                            </div>

                            <LoginButton buttonName={"Login"}/>
                        </form>
                    </div>

                    <div className='py-5'>
                        <div className='grid grid-cols-2 gap-1'>
                            <div className='text-center sm:text-left whitespace-nowrap'>
                                <Link to='/forget-password'>
                                    <ForgetPasswordButton onClick={handleForgetPassword}/>
                                </Link>
                            </div>

                            <div className='text-center sm:text-right  whitespace-nowrap'>
                                <Link to={"/register"}>
                                    <RegisterButton onClick={handleRegister}/>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
