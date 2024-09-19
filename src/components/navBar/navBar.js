import './navBar.style.scss';

function NavBar () {
	return(
	<nav className='navbar'>
	<div className='logo'> FocusFit</div>
		<ul className='nav-links'>
			<li>Home</li>
			<li>About</li>
			<li>Origins</li>
		</ul>
	</nav>
	);
}

export default NavBar;