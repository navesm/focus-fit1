import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';

function Dashboard ({ user }) {
	const [userStats, setUserStats] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchUserStats = async () => {
			if (user && user.id) {
				const { data, error } = await supabase
					.from('user_stats')
					.select('login_count, pomodoro_count, tabata_count, round_count')
					.eq('uid', user.id)
					.single();

				if (error) {
					setError(error.message);
				} else {
					setUserStats(data);
				}
			};
			fetchUserStats();
		}
	}, [user]);

	

	return (
		<div>
		  <h1>Welcome to your Dashboard, {user.display_name || 'User'}!</h1>
		  {error && <p>Error loading stats: {error}</p>}
		  {userStats ? (
		  	<div>
			  <p>Logged in {userStats.login_count} times</p>
			  <p>Completed {userStats.tabata_count} Tabata workouts</p>
			  <p>And {userStats.tabata_count} Tabata rounds</p>
			  <p>Completed {userStats.pomodoro_count} Pomodoros</p>
		  	</div>
		  ) : (
		    <p>Loading your stats...</p>
		)}
		</div>
	);
}

export default Dashboard;