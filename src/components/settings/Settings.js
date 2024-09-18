function Settings ({ mode, pomodoroDuration, tabataDuration, setDurations}) {
	// Inputs to adjust the time settings

	return (
		<div> 
		  <h3>Customize Timers</h3>
		  {mode === 'pomodoro' ? (
		  	<input 
		  	  type="number" 
		  	  value={pomodoroDuration} 
		  	  onChange={(e) => setDurations('pomodoro', e.target.value)}
		  	/>
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