import React, {useState} from 'react';
import ModeSwitcher from './components/modeSwitcher/modeSwitcher.js';
import Timer from './components/timer/timer.js';
import Settings from './components/settings/Settings.js';
import NavBar from './components/navBar/navBar.js';

import './App.css';

function App() {

  const [mode, setMode] = useState('pomodoro');
  const [durations, setDurations] = useState({pomodoro: 1500, tabata: 240});

  const setTimerDuration = (type, duration) => {
    setDurations(prev => ({...prev, [type]: duration * 60}));
  };


  return (
    <div className="App">
      <div>
        <NavBar/>
        <ModeSwitcher setMode={setMode}/>
        <Timer mode={mode} duration={durations[mode]}/>
        <Settings mode={mode} pomodoroDuration={durations.pomodoro / 60} tabataDuration={durations.tabata / 60} setDurations={setTimerDuration}/>
      </div>
    </div>
  );
}

export default App;
