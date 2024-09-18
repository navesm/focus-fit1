import React from 'react';

function ModeSwitcher ({ setMode }) {
	return (
		<div> 
		  <button onClick={() => setMode('pomodoro')}> Pomodoro</button>
		  <button onClick={() => setMode('tabata')}>Tabata</button>
		</div>
	);
}

export default ModeSwitcher;