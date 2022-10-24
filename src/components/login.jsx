import {useState} from "react";
import axios from "axios";
import {InputTextField} from "./inputTextField";

export function Login() {
    const [data, setData] = useState({email: "", password: ""});

    function handleChange(e) {
        setData((data) => ({...data, [e.target.name]: e.target.value}));
    }

    function onLoginClick(e) {
        e.preventDefault();

        const loginInfo = {
            email: data.email,
            password: data.password,
        };

        axios
            .post("http://127.0.0.1:8000/auth/login/", loginInfo)
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log("Error Login: " + err.message);
            });
    }

    return (
        <div className='min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12'>
            <div className='p-10 xs:p-0 mx-auto md:w-full md:max-w-md'>
                <h1 className='font-bold text-center text-2xl mb-5'>Log in</h1>

                <div class='bg-white shadow w-full rounded-lg divide-y divide-gray-200'>
                    <div class='px-5 py-7'>
                        <form onSubmit={onLoginClick}>
                            <div>
                                <label htmlFor='email' className='font-semibold text-sm text-gray-600 pb-1 block'>
                                    Email
                                </label>
                                <input
                                    type='email'
                                    name='email'
                                    id='email'
                                    value={data.email}
                                    onChange={handleChange}
                                    placeholder='Example@email.com'
                                    className='border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full'
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor='password'
                                    className='font-semibold text-sm text-gray-600 pb-1 block'
                                >
                                    Password
                                </label>
                                <input
                                    type='password'
                                    name='password'
                                    id='password'
                                    value={data.password}
                                    onChange={handleChange}
                                    placeholder='Password'
                                    className='border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full'
                                />
                            </div>

                            <button
                                type='submit'
                                class='transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block'
                            >
                                <span class='inline-block mr-2'>Login</span>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    stroke='currentColor'
                                    class='w-4 h-4 inline-block'
                                >
                                    <path
                                        stroke-linecap='round'
                                        stroke-linejoin='round'
                                        stroke-width='2'
                                        d='M17 8l4 4m0 0l-4 4m4-4H3'
                                    />
                                </svg>
                            </button>
                        </form>
                    </div>

                    <div class='py-5'>
                        <div class='grid grid-cols-2 gap-1'>
                            <div class='text-center sm:text-left whitespace-nowrap'>
                                <button
                                    class='transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset'>
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        stroke='currentColor'
                                        class='w-4 h-4 inline-block align-text-top'
                                    >
                                        <path
                                            stroke-linecap='round'
                                            stroke-linejoin='round'
                                            stroke-width='2'
                                            d='M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z'
                                        />
                                    </svg>
                                    <span class='inline-block ml-1'>Forgot Password</span>
                                </button>
                            </div>
                            <div class='text-center sm:text-right  whitespace-nowrap'>
                                <button
                                    class='transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset'>
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        stroke='currentColor'
                                        class='w-4 h-4 inline-block align-text-bottom	'
                                    >
                                        <path
                                            stroke-linecap='round'
                                            stroke-linejoin='round'
                                            stroke-width='2'
                                            d='M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z'
                                        />
                                    </svg>
                                    <span class='inline-block ml-1'>Help</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
