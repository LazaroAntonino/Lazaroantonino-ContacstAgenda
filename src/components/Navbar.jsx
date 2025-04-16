import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container p-2">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Antonino´s web</span>
				</Link>
			</div>
		</nav>
	);
};