import React, {useState} from 'react';
import ModeSwitcher from './components/modeSwitcher/modeSwitcher.js';
import Timer from './components/timer/timer.js';
import Settings from './components/settings/Settings.js';
import NavBar from './components/navBar/navBar.js';

import './App.css';

function App() {

  const [mode, setMode] = useState('pomodoro'); // Either 'pomodoro' or 'tabata'
  const [pomodoroDuration, setPomodoroDuration] = useState(25); // Default pomodoro in minutes
  const [tabataDuration, setTabataDuration] = useState(20); //Default tabata time in seconds
  const [pomodoroBreak, setPomodoroBreak] = useState(5); //Default pomodoro break in minutes;
  const [tabataBreak, setTabataBreak] = useState(10); //Default tabata break in seconds
  const [totalRounds, setTotalRounds] = useState(10); // 10 rounds by default

  //Funcntion to update durations
  const setDurations = (type, value) => {
    if (type === 'pomodoro') {
      setPomodoroDuration(Number(value));
    } else if (type === 'tabata') {
      setTabataDuration(Number(value));
    } else if (type === 'pomodoroBreak') {
      setPomodoroBreak(Number(value));
    } else if (type === 'tabataBreak') {
      setTabataBreak(Number(value));
    }
  };


  return (
    <div className="App">
      <div>
        <NavBar/>
        <ModeSwitcher setMode={setMode}/>
        <Timer 
          mode={mode} 
          pomodoroDuration={pomodoroDuration}
          pomodoroBreak={pomodoroBreak}
          tabataDuration={tabataDuration}
          tabataBreak={tabataBreak}
          totalRounds={totalRounds}
        />
        <Settings 
          mode={mode} 
          pomodoroDuration={pomodoroDuration}
          pomodoroBreak={pomodoroBreak} 
          tabataDuration={tabataDuration}
          tabataBreak={tabataBreak} 
          totalRounds={totalRounds}
          setTotalRounds={setTotalRounds}
          setDurations={setDurations}
          />
        
      </div>
    </div>
  );
}

export default App;
