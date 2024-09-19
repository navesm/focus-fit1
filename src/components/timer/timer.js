import  React, { useState, useEffect, useCallback } from 'react';

function Timer ({mode, duration}) {
	const [timeLeft, setTimeLeft] = useState(duration);
	const [isRunning, setIsRunning] = useState(false);


	  // Memoize playBeep with useCallback to prevent it from being recreated on every render
  const playBeep = useCallback(() => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)(); // Moved inside useCallback
    const oscillator = audioContext.createOscillator();
    oscillator.type = 'sine'; 
    oscillator.frequency.setValueAtTime(440, audioContext.currentTime); 
    oscillator.connect(audioContext.destination); 
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.5); // Beep for 0.5 seconds
  }, []); // No dependencies, playBeep will always remain the same

  
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
    		playBeep(); //Play the beep when the timer reaches 0
    		setIsRunning(false); // Stop the timer when time runs out
    	}

    	//Cleanup interval on unmount or when isRunning changes
    	return () => clearTimeout(timer);
    }, [isRunning, timeLeft, playBeep]);

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