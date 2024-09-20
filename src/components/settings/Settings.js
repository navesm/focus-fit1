function Settings ({ mode, pomodoroDuration, tabataDuration, breakDuration, setDurations, totalRounds, setTotalRounds}) {
	// Inputs to adjust the time settings

	return (
		<div> 
		  <h3>Customize Timers</h3>
		  {mode === 'pomodoro' ? (
		  	<div>
		  	    <label>PomodoroDuration (minutes)</label>
			  	<input 
			  	  type="number" 
			  	  value={pomodoroDuration} 
			  	  onChange={(e) => setDurations('pomodoro', e.target.value)}
			  	/>
		  	</div>
		  // else use the tabata duration default and/or set time
		  ) : (
		    <div>
		        <div>
			        <label>Total Rounds</label>
				  	<input 
				  	  type="number"
				  	  value={totalRounds}
				  	  onChange={(e) => setTotalRounds(e.target.value)}
			     	/>
		     	</div>
		        <div>
			        <label>Tabata Duration (seconds)</label>
				  	<input 
				  	  type="number" 
				  	  value={tabataDuration} 
				  	  onChange={(e) => setDurations('tabata', e.target.value)} 
				  	/>
			  	</div>
		    </div>
		  )}
		  <div>
		    <label>Break Duration ({mode === 'pomodoro' ? 'minutes' : 'seconds'})</label>
		    <input
		      type='number'
		      value={breakDuration}
		      onChange={(e) => setDurations('break', e.target.value)}
		    />
		  </div>
		</div>
	);
}

export default Settings;