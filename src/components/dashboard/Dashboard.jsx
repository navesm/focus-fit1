import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';

function Dashboard ({ user, updateStat }) {
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
			}
		};
		fetchUserStats();
	}, [user, userStats]);

	return (
		<div>

		  <h1>Welcome to your Dashboard, {user.displayName || 'User'}!</h1>
		  {error && <p>Error loading stats: {error}</p>}
		  {userStats ? (
		  	<div>
			  <p>Completed {userStats.tabata_count} Tabata workouts</p>
			  <p>And {userStats.round_count} Tabata rounds</p>
			  <p>Completed {userStats.pomodoro_count} Pomodoros</p>
			  			  <p>Smashed Goals {userStats.login_count} times</p>
			  <button className='reset-button' onClick={() => updateStat('login_count')}>Smashed Goal? Press Here</button>
		  	</div>
		  ) : (
		    <p>Loading your stats...</p>
		)}
		</div>
	);
}

export default Dashboard;