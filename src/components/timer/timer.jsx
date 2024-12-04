import  React, { useState, useEffect, useCallback, useRef } from 'react';
import './timer.styles.css';


function Timer ({mode, pomodoroDuration, tabataDuration, pomodoroBreak, tabataBreak, totalRounds, updateStat, wakeLockActive, setWakeLockActive}) {
	const [timeLeft, setTimeLeft] = useState(mode === 'pomodoro' ? pomodoroDuration * 60 : tabataDuration);
	const [isRunning, setIsRunning] = useState(false);
	const [isBreak, setIsBreak] = useState(false);
	const [currentRound, setCurrentRound] = useState(1);
	const [delayBreakStart, setDelayBreakStart] = useState(false); //For lining up beep with break start


  const audioContextRef = useRef(null);

  //Initialize audio context on first user interaction
  const initializeAudio = useCallback(async () => {
  	if (!audioContextRef.current) {
  		audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
  	}

  	// iOS requires resume on each user interaction
  	if (audioContextRef.current.state === 'suspended') {
  		try {
  			await audioContextRef.current.resume();
  		} catch(error) {
  			console.error('Failed to resume audio context', error);
  		}
  	}
  }, []);

	  // Memoize playBeep with useCallback to prevent it from being recreated on every render
  const playBeep = useCallback(async() => {
    //Check if audio context is suspended and resume it if necesary
    try {
    	if (!audioContextRef.current) {
    		await initializeAudio();
    	}

    	//Double-check context state
    	if (audioContextRef.current.state === 'suspended') {
    		await audioContextRef.current.resume();
    	}

    	const oscillator = audioContextRef.current.createOscillator();
    	const gainNode = audioContextRef.current.createGain();

    	oscillator.type = 'sine';
    	oscillator.frequency.setValueAtTime(440, audioContextRef.current.currentTime);

    	//Add gain node to control volume
    	gainNode.gain.setValueAtTime(0.1, audioContextRef.current.currentTime);
    	oscillator.connect(gainNode);
    	gainNode.connect(audioContextRef.current.destination);

    	oscillator.start();
    	oscillator.stop(audioContextRef.current.currentTime + 0.75);

    	//Cleanup
    	setTimeout(() => {
    		gainNode.disconnect();
    	}, 750);
    } catch (error) {
    	console.error('Audio playback failed:', error);
    }
  },[initializeAudio]);

  

  

    // Start/Pause button handler with audio initialization
    const startClickHandler = async () => {
    	try {
    		await initializeAudio(); //Initialize audio on start
    		setIsRunning(!isRunning);
    	} catch (error){
    		console.error('Failed to initialize audio:', error);
    		setIsRunning(!isRunning); // Toggle isRunning
    	}
    }

    // Reset timer to initial duration
    const resetHandler = () => {
    	setIsRunning(false);
    	setIsBreak(false);
    	setTimeLeft(mode === 'pomodoro' ? pomodoroDuration * 60 : tabataDuration);
    	setCurrentRound(1);
    }

    // Countdown logic using useEffect to handle side effects
    useEffect(() => {
    	let timer = null;

    	//Only start the timer if isRunning is true
    	if (isRunning && timeLeft > 0) {
    		timer = setTimeout(() => {
    			setTimeLeft(prev => prev - 1) //Update timeLeft by decrementing 1 second
    		}, 1000);
    	} 

    	if (timeLeft === 0 && isRunning) {
    		playBeep(); //Play the beep when the timer reaches 0
    		
    		if (mode === 'pomodoro'){
    			updateStat('pomodoro_count');
	    		if (isBreak) {
	    		  setIsRunning(false); // Stop the timer when time runs out
	            } else {

	            	//Start break after delay
	            	setDelayBreakStart(true); //Activate one-second delay
	            	setTimeout(() => {
	            	  //Switch to break timer when main timer finishes
	            	  setIsBreak(true);
	                  setTimeLeft(pomodoroBreak * 60); // Start break with specified time
	                  setDelayBreakStart(false); //End delay
	            	}, 1000) // 1 second delay before break starts
	            }
    	    } else {
    	    	// Tabata mode: Switch between work and break, and count rounds
    	    	if (isBreak) {
    	    		if(currentRound < totalRounds) {
    	    			//Continue to the next round
    	    			setIsBreak(false);
    	    			setTimeLeft(tabataDuration);
    	    			setCurrentRound((prevRound) => prevRound + 1);
    	    			updateStat('round_count');
    	    		} else {
    	    			//Finish all rounds
    	    			setIsRunning(false);
    	    			setCurrentRound(1); //Reset rounds
    	    			updateStat('tabata_count');
    	    			updateStat('round_count');
    	    		}
    	    	} else {
    	    		setDelayBreakStart(true);
    	    		setTimeout(() => {
    	    			setIsBreak(true);
    	    			setTimeLeft(tabataBreak);
    	    			setDelayBreakStart(false);
    	    		}, 1000); // 1 second delay before break starts to line up beep sound
    	    	}
    	    }
    	}

    	//Cleanup timeout on unmount or when isRunning changes
    	return () => clearTimeout(timer);
    }, [isRunning, timeLeft, isBreak, delayBreakStart, pomodoroBreak, tabataBreak, playBeep, mode, currentRound, totalRounds, tabataDuration, updateStat]);

    // Keep timer running in the background if screen locks/ battery saver mode on Mobile
    useEffect(() => {
    	if (isRunning && audioContextRef.current) {
    		if (audioContextRef.current.state === 'suspended') {
    			audioContextRef.resume().catch(err => console.error('Error resuming AudioContext:', err));
    		}
    	}
    }, [isRunning])
    //Cleanup effect for audio context
    useEffect(() => {
    	return () => {
    		if (audioContextRef.current) {
    			audioContextRef.current.close();
    			audioContextRef.current=null;
    		}
    	};
    }, []);
    //Reset timer when mode changes or when manually reset
    useEffect(() => {
    	setIsBreak(false);
    	setTimeLeft(mode === 'pomodoro' ? pomodoroDuration * 60 : tabataDuration);
    	setCurrentRound(1);
    }, [mode, pomodoroDuration, tabataDuration]);

    // Calculate minutes and seconds from timeLeft
    let minutesOutput = Math.floor(timeLeft / 60 || 0);
    let secondsOutput = timeLeft % 60 || 0;

    useEffect(() => {
    	let wakeLock = null;

    	const requestWakeLock = async () => {
    		try {
    			if ('wakeLock' in navigator) {
    				wakeLock = await navigator.wakeLock.request('screen');
    				console.log("Wake Lock activated");
    			}
    		} catch (err) {
    			console.error("Failed to acquire wake lock:", err);
    		}
    	};

    	const releaseWakeLock = async () => {
    		if (wakeLock) {
    			try {
    				await wakeLock.release();
    				console.log("Wake Lock released");
    				wakeLock = null;
    			} catch (err) {
    				console.error("Failed to release wake lock:", err);
    			}
    		}
    	};

    	if (wakeLockActive) {
    		requestWakeLock();
    	} else {
    		releaseWakeLock();
    	}

    	return () => {
    		releaseWakeLock();
    	};
    }, [wakeLockActive]);


	return (
		<div className="button-container">
			<h2 className="title"> {mode === 'pomodoro' 
			        ? isBreak ? 'Break Time' : 'Study Time' 
			        : isBreak ? 'Break Time' : `Exercise Time - Round ${currentRound} of ${totalRounds}`} </h2>
			<div> 
			{ mode === 'pomodoro' 
			  ? `${String(minutesOutput).padStart(2,'0')}:${String(secondsOutput).padStart(2,'0')}`
			  : `${timeLeft} seconds`
			}
			</div>
			<button
			    className="start-button" 
			    onClick={ () => {
			        startClickHandler();
			    }}>
			    {isRunning ? 'Pause' : 'Start'} 
			</button>
			<button className="reset-button" onClick={resetHandler}> Reset </button>
			<div className="wake-lock-toggle">
              <label className="switch">
                <input
                  type="checkbox"
                  checked={wakeLockActive}
                  onChange={() => setWakeLockActive(!wakeLockActive)}
                  />
                  <span className="slider round"></span>
              </label>
              <span>Screen Active Lock</span>
            </div>
		</div>
		)
}

export default Timer;