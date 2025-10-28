import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Sidebar from './Sidebar.jsx'
import userdata from  './userdata.js'
import Cards from './cards.jsx'

import Dashboard from "./pages/dashboard.jsx";
import Analytics from "./pages/analytics.jsx";
import Settings from "./pages/settings.jsx";
import Share from "./pages/share.jsx";


const user = userdata;


function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
   function handleDarkMode() {
    setIsDarkMode(!isDarkMode)
   }

  return (

  <Router>
              <div className='background' style={{}}></div>
              <Sidebar user={user.christian}/>
              <main>
                <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/share" element={<Share />} />
                </Routes>
              </main>
  </Router>
  )
}

export default App
