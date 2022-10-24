import NavBar from "./navBar";

const { Component } = require("react");

class HomePage extends Component {
	state = {
		name: "John Doe",
	};

	render() {
		return (
			<div>
				<div>
					<NavBar />
				</div>

				<div className='flex container mx-auto'>
					<h1>HELLO USER</h1>
				</div>
			</div>
		);
	}
}

export default HomePage;
