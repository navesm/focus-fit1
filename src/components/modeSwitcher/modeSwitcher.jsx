import React from 'react';

import './modeSwitcher.styles.scss';

function ModeSwitcher ({ setMode }) {
	return (
		<div> 
		  <button className='pomodoro' onClick={() => setMode('pomodoro')}> Pomodoro</button>
		  <button className='tabata' onClick={() => setMode('tabata')}>Tabata</button>
		</div>
	);
}

export default ModeSwitcher;