import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { supabase } from './supabaseClient';
import ModeSwitcher from './components/modeSwitcher/modeSwitcher.js';
import Timer from './components/timer/timer.js';
import Settings from './components/settings/Settings.js';
import NavBar from './components/navBar/navBar.jsx';
import About from './components/about/About.jsx';
import Origins from './components/origins/Origins.jsx';
import SignUp from './components/signUp/SignUp.jsx';
import SignIn from './components/signIn/SignIn.jsx';
import Dashboard from './components/dashboard/Dashboard.jsx';

import './App.css';

function App() {

  const [mode, setMode] = useState('pomodoro'); // Either 'pomodoro' or 'tabata'
  const [pomodoroDuration, setPomodoroDuration] = useState(25); // Default pomodoro in minutes
  const [tabataDuration, setTabataDuration] = useState(20); //Default tabata time in seconds
  const [pomodoroBreak, setPomodoroBreak] = useState(5); //Default pomodoro break in minutes;
  const [tabataBreak, setTabataBreak] = useState(10); //Default tabata break in seconds
  const [totalRounds, setTotalRounds] = useState(10); // 10 rounds by default
  const [user, setUser] = useState(null);

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

useEffect(() => {
  const fetchUser = async() => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user ? { displayName: user.display_name }: null);
  };

  fetchUser();

  //Listen for auth state changes
  const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
    setUser(session?.user ? { displayName: session.user.display_name } : null);
  });

  return () => subscription.unsubscribe();
}, []);


const handleSignOut = async () => {
  await supabase.auth.signOut();
  setUser(null);
};

  return (
    <Router>
    <div className="App">
      <NavBar 
         className='NavBar'
         user={user}
         onSignOut={handleSignOut}
         />
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
            <Route path="/origins" element={<Origins/>}/>
            <Route path="/sign-in" element={<SignIn/>}/>
            <Route path="/sign-up" element={<SignUp/>}/>
            <Route path="/dashboard" element={<Dashboard user={user}/>} />
        </Routes>
      </div>
    </div>
  </Router>
  );
}

export default App;
