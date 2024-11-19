import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { supabase } from './supabaseClient';
import ModeSwitcher from './components/modeSwitcher/modeSwitcher.jsx';
import Timer from './components/timer/timer.jsx';
import Settings from './components/settings/Settings.jsx';
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




  //Update user stats
  const updateStat = async (field, increment = 1) => {
    try {
      //Fetch current value
      const { data, error: fetchError } = await supabase
        .from('user_stats')
        .select(field)
        .eq('uid', user.id)
        .single();

      if (fetchError) throw fetchError;
      
      //Increment value and update
      const newValue = (data[field] || 0) + increment;

      const { error: updateError } = await supabase
        .from('user_stats')
        .update({ [field]: newValue })
        .eq('uid', user.id);

      if (updateError) console.error("Error updating stat: ", updateError);
    } catch (err) {
      console.error("Update stat failed: ", err);
    }
  }



useEffect(() => {
  const fetchUser = async() => {
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error) {
      console.error("Error fetching user:", error.message);
    } else {
      setUser(user ? { displayName: user.user_metadata?.display_name, id: user?.uid || null }: null);     
    }
  };

  fetchUser();

  //Listen for auth state changes
  const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
    if (session?.user) {
      setUser({ displayName: session.user.user_metadata?.display_name || "Guest", id: session.user.id });
    } else {
      setUser(null);
    }
    
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
              updateStat={updateStat}
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
            <Route path="/sign-in" element={<SignIn user={user}updateStat={updateStat}/>}/>
            <Route path="/sign-up" element={<SignUp/>}/>
            <Route path="/dashboard" element={user && <Dashboard user={user} updateStat={updateStat}/>} />
        </Routes>
      </div>
    </div>
  </Router>
  );
}

export default App;
