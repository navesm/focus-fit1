function Settings ({ mode, pomodoroDuration, tabataDuration, setDurations}) {
	// Inputs to adjust the time settings

	return (
		<div> 
		  <h3>Customize Timers</h3>
		  {/*//if mode equals pomodor, use the pomodor default and set time*/}
		  {mode === 'pomodoro' ? (
		  	<input 
		  	  type="number" 
		  	  value={pomodoroDuration} 
		  	  onChange={(e) => setDurations('pomodoro', e.target.value)}
		  	/>
		  // else use the tabata duration default and/or set time
		  ) : (
		  	<input 
		  	  type="number" 
		  	  value={tabataDuration} 
		  	  onChange={(e) => setDurations('tabata', e.target.value)} 
		  	/>
		  )}
		</div>
	);
}

export default Settings;