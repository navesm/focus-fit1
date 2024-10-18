import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ModeSwitcher from './components/modeSwitcher/modeSwitcher.js';
import Timer from './components/timer/timer.js';
import Settings from './components/settings/Settings.js';
import NavBar from './components/navBar/navBar.js';
import About from './components/about/About.jsx';
import Origins from './components/origins/Origins.jsx';
import SignUp from './components/signUp/SignUp.jsx';
import SignIn from './components/signIn/SignIn.jsx';

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
    <Router>
    <div className="App">
      <NavBar className='NavBar'/>
      <div className="container">
        <Routes>
          <Route
             path="/"
             element={
              <>
            <ModeSwitcher setMode={setMode}/>
            <Timer 
              mode={mode} 
              pomodoroDuration={pomodoroDuration}
              pomodoroBreak={pomodoroBreak}
              tabataDuration={tabataDuration}
              tabataBreak={tabataBreak}
              totalRounds={totalRounds}
              className="timer-container"
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
              </>
            }
            />
            <Route path="/about" element={<About/>}/>
            <Route path="/sign-in" element=""/>

            <Route path="/sign-up" element=""/>
        </Routes>
      </div>
    </div>
  </Router>
  );
}

export default App;
