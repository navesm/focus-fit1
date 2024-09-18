import  React, { useState, useEffect } from 'react';

function Timer ({mode, duration}) {
	const [timeLeft, setTimeLeft] = useState(duration);
	const [isRunning, setIsRunning] = useState(false);
    

    // TODO : mode is set to tabata, change default timer

    
    // Calculate minutes and seconds from timeLeft
    let minutesOutput = Math.floor(timeLeft / 60);
    let secondsOutput = timeLeft % 60;

    // Start/Pause button handler
    const startClickHandler = () => {
    	setIsRunning(!isRunning); // Toggle isRunning
    }

    // Reset timer to initial duration
    const resetHandler = () => {
    	setIsRunning(false);
    	setTimeLeft(duration);
    }

    // Countdown logic using useEffect to handle side effects
    useEffect(() => {
    	let timer;

    	//Only start the timer if isRunning is true
    	if (isRunning && timeLeft > 0) {
    		timer = setTimeout(() => {
    			setTimeLeft(prev => prev - 1) //Update timeLeft by decrementing 1 second
    		}, 1000);
    	} else if (timeLeft === 0) {
    		setIsRunning(false); // Stop the timer when time runs out
    	}

    	//Cleanup interval on unmount or when isRunning changes
    	return () => clearTimeout(timer);
    }, [isRunning, timeLeft]);

	return (
		<div>
			<h2> {mode === 'pomodoro' ? 'Study Time' : 'Exercise Time'} </h2>
			<div> { `${minutesOutput}:${secondsOutput < 10 ? '0': ''}${secondsOutput}`}</div>
			<button 
			    onClick={ () => {
			        startClickHandler();
			    }}>
			    {isRunning ? 'Pause' : 'Start'} 
			</button>
			<button onClick={resetHandler}> Reset </button>
		</div>
		)

}

export default Timer;