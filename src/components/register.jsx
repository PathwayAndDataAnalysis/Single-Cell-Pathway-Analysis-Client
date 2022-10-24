import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export function Register() {
	const [username] = useState("");

	return (
		<div>
			<h1>Register</h1>
		</div>
	);
}
