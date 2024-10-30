import { useState } from 'react';
import { supabase } from '../../supabaseClient';
import { useNavigate } from 'react-router-dom';

function SignIn () {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const handleSignIn = async (e) => {
		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) {
			setError(error.message);
		} else {
			navigate('/dashboard');
		}
	};


	return (
		<div>
		<h2>Sign In</h2>
		  <form onSubmit={handleSignIn}>
		  	<input 
		  	   type="email" 
		  	   value={email} 
		  	   onChange={(e) => setEmail(e.target.value)} 
		  	   placeholder="Email"
		  	 />
		  	<input
		  	  type="password"
		  	  value={password}
		  	  onChange={(e) => setPassword(e.target.value)}
		  	  placeholder="Password"
		  	/>
		  	<button type="submit">Sign In</button>
		  	{error && <p>{error}</p>}
		  </form>		
		</div>
	);
}

export default SignIn;