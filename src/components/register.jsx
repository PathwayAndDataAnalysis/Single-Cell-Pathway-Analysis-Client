import {useState} from "react";
import {InputTextField} from "./inputTextField";
import {LoginButton} from "./buttons/loginButton";
import {BackToLoginButton} from "./buttons/backToLoginButton";
import {Link} from "react-router-dom";
import {registerUser} from "./api/apiHandlers";

export function Register() {
    const [inputFullName, setInputFullName] = useState("");
    const [inputEmail, setInputEmail] = useState("");
    const [inputPassword, setInputPassword] = useState("");

    function handleChange(event) {
        const {name, value} = event.target;
        switch (name) {
            case "fullname":
                setInputFullName(value);
                break;
            case "email":
                setInputEmail(value);
                break;
            default:
                setInputPassword(value);
                break;
        }
    }

    function onRegisterClick(e) {
        e.preventDefault();

        const registerInfo = {
            fullname: inputFullName,
            email: inputEmail,
            password: inputPassword,
        };

        registerUser(registerInfo)
            .then((response) => {
                    setInputFullName("");
                    setInputEmail("");
                    setInputPassword("");
                }
            )
            .catch((error) => {
                console.log("Error: " + error);
            });

    }

    return (
        <div className='min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12'>
            <div className='p-10 xs:p-0 mx-auto md:w-full md:max-w-md'>
                <h1 className='font-bold text-center text-2xl mb-5'>Register account</h1>

                <div className='bg-white shadow w-full rounded-lg divide-y divide-gray-200'>

                    <div className='px-5 py-7'>

                        <form onSubmit={onRegisterClick}>

                            <div>
                                <label htmlFor='fullname' className='font-semibold text-sm text-gray-600 pb-1 block'>
                                    Full Name
                                </label>

                                <InputTextField
                                    type='text'
                                    name='fullname'
                                    id='fullname'
                                    onChange={handleChange}
                                    value={inputFullName}
                                    placeholder='Full Name'
                                />
                            </div>

                            <div>
                                <label htmlFor='fullname' className='font-semibold text-sm text-gray-600 pb-1 block'>
                                    Email
                                </label>

                                <InputTextField
                                    type='email'
                                    name='email'
                                    onChange={handleChange}
                                    id='email'
                                    value={inputEmail}
                                    placeholder='Example@email.com'
                                />
                            </div>

                            <div>
                                <label htmlFor='fullname' className='font-semibold text-sm text-gray-600 pb-1 block'>
                                    Password
                                </label>

                                <InputTextField
                                    type='password'
                                    name='password'
                                    id='password'
                                    onChange={handleChange}
                                    value={inputPassword}
                                    placeholder='Password'
                                />
                            </div>

                            <LoginButton buttonName={"Register"}/>

                        </form>

                        <Link to={"/login"}>
                            <BackToLoginButton buttonName={"Back to Login"}/>
                        </Link>

                    </div>

                </div>

            </div>

        </div>
    );
}
