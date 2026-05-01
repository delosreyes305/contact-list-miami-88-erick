import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1"><i class="fa-brands fa-react fa-2xl"></i></span>
				</Link>
				<div className="ml-auto">
					<Link to="/add-contact">
						<button className="btn btn-dark">Add New Contact</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};