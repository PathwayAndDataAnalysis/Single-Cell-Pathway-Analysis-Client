import { useState } from "react";
import { InputTextField } from "./inputTextField";
import { LoginButton } from "./buttons/loginButton";
import { BackToLoginButton } from "./buttons/backToLoginButton";
import { Link } from "react-router-dom";
import axios from "axios";

export function ForgetPassword() {
	const [inputEmail, setInputEmail] = useState("");

	function onSubmitClick(e) {
		e.preventDefault();
	}
	function handleChange(event) {
		const { name, value } = event.target;

		setInputEmail(value);
	}

	return (
		<div className='min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12'>
			<div className='p-10 xs:p-0 mx-auto md:w-full md:max-w-md'>
				<h1 className='font-bold text-center text-2xl mb-5'>Forget Password</h1>

				<div className='bg-white shadow w-full rounded-lg divide-y divide-gray-200'>
					<div className='px-5 py-7'>
						<form onSubmit={onSubmitClick}>
							<div>
								<label
									htmlFor='fullname'
									className='font-semibold text-sm text-gray-600 pb-1 block'
								>
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

							<LoginButton buttonName={"Reset Password"} />
						</form>

						<Link to={"/login"}>
							<BackToLoginButton buttonName={"Back to Login"} />
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
