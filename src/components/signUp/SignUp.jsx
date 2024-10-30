import React, { useState } from 'react';
import { supabase } from '../../supabaseClient';
import { useNavigate } from 'react-router-dom';

function SignUp() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [preferredName, setPreferredName] = useState('');
	const [error, setError] = useState(null);
	const [message, setMessage] = useState(null);
	const navigate = useNavigate();

	const handleSignUp = async (e) => {
		e.preventDefault();

		//Attempt to sign up user
		const { data, error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				data: {display_name: preferredName}
			}
		});

		if (error) {
			setError(error.message);
		} else if (data.user) {
			setMessage('Sign-up successful! Redirecting to dashboard...');
			setTimeout(() => {
				navigate('/dashboard');
			}, 2000);
		}
	};


	return (
		<div>
		<h2> Sign Up </h2>
			<form onSubmit={handleSignUp}>
			  <input
			    type="text"
			    placeholder="Preferred Name"
			    value={preferredName}
			    onChange={(e) => setPreferredName(e.target.value)}
			  />
			  <input
			    type="email"
			    placeholder="Email"
			    value={email}
			    onChange={(e) => setEmail(e.target.value)}
			    required
			  />
			  <input
			    type="password"
			    placeholder="Password"
			    value={password}
			    onChange={(e) => setPassword(e.target.value)}
			    required
			  />
			  <button type="submit">Sign Up</button>
			</form>
			{error && <p>{error}</p>}
			{message && <p>{message}</p>}
		</div>
	);
};

export default SignUp;