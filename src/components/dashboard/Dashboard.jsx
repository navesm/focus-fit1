import React from 'react';

function Dashboard ({ user }) {
	return (
		<div>
		  <h1>Welcome to your Dashboard, {user?.displayName || 'User'}!</h1>
		  <p>Logged in x times</p>
		  <p>Completed y Tabata workouts</p>
		  <p>And y Tabata rounds</p>
		  <p>Completed z Pomodoros</p>
		</div>
	);
}

export default Dashboard;