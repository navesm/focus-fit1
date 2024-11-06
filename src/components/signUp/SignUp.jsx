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
			const userId = data.user.id;

			//Automatically insert initial user stats for the new user
			const { error: statsError } = await supabase
			  .from('user_stats')
			  .insert({
			  	  uid: userId,
			  	  login_count: 1,
			  	  pomodoro_count: 0,
			  	  tabata_count: 0,
			  	  round_count: 0,
			  });

			if (statsError) {
				setError(statsError.message);
			} else {
				setMessage('Sign-up successful! Redirecting to dashboard...');
			setTimeout(() => {
				navigate('/dashboard');
			  }, 2000);
			}	
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
			  <button className="start-button" type="submit">Sign Up</button>
			</form>
			{error && <p>{error}</p>}
			{message && <p>{message}</p>}
		</div>
	);
};

export default SignUp;