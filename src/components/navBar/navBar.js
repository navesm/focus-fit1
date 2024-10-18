
import { Link } from 'react-router-dom';
import './navBar.style.scss';

function NavBar () {
	return(
	<nav className='navbar'>
	<div className='logo'> FocusFit</div>
		<ul className='nav-links'>
			<li>
			  <Link className="link" to="/">Home</Link>
			</li>
			<li>
			   <Link className="link" to="/about">About</Link>
			</li>
			<li>
			   <Link className="link" to="/origins">Origins</Link>
			</li>
			<li>
			   <Link className="link" to="/sign-in">Sign In</Link>
			</li>
			<li>
			   <Link className="link" to="/sign-up">Sign Up</Link>
			</li>
		</ul>
	</nav>
	);
}

export default NavBar;