import {useEffect, useState, memo} from 'react'
import UserData from './user.jsx'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { House, Settings2, ChartLine, Send, LogOut, User, FolderGit2 } from 'lucide-react';
import { useExtended } from './context/ExtendContext.jsx';

import DashboardSettings from "./pages/dashboard_settings.jsx";
import AnalyticsSettings from "./pages/analytics_settings.jsx";
import ProfileSettings from "./pages/profile_settings.jsx";
import ShareSettings from "./pages/share_settings.jsx";



// Navbar außerhalb definieren und mit memo memoizen
const Navbar = memo(({ isExtended}) => {
    if (isExtended) return (
    <>
        <nav className="menuExt" style={{gap: "20px"}}>
            <NavLink to="/" className="menuItemExt">
            <House size={18} />
            <span>Dashboard</span>
            </NavLink>
            <NavLink to="/analytics" className="menuItemExt">
            <ChartLine size={18} />
            <span>Analytics</span>
            </NavLink>
            <NavLink to="/settings" className="menuItemExt">
            <User size={18} />
            <span>Profile</span>
            </NavLink>
            <NavLink to="/share" className='menuItemExt'>
            <FolderGit2 size={18} />
            <span>Projects</span>
            </NavLink>
        </nav>

        <hr></hr>

        <div className='settings'>
                <Routes>
                    <Route path="/" element={<DashboardSettings />} />
                    <Route path="/analytics" element={<AnalyticsSettings />} />
                    <Route path="/settings" element={<ProfileSettings />} />
                    <Route path="/share" element={<ShareSettings />} />
                </Routes>
        </div>

    </>)

    else return (
    <nav className="menu" style={{gap: "40px"}}>
        <NavLink to="/" className="menuItem">
        <House size={40} />
        </NavLink>
        <NavLink to="/analytics" className="menuItem">
        <ChartLine size={40} />
        </NavLink>
        <NavLink to="/settings" className="menuItem">
        <User size={40} />
        </NavLink>
        <NavLink to="/share" className='menuItem'>
        <FolderGit2 size={40} />
        </NavLink>
    </nav>
    )
})

export default function Sidebar({user}){
    const { isExtended, setIsExtended } = useExtended();

    const [width, setWidth] = useState(150);
    const [isSnapping, setIsSnapping] = useState(false);
    const [isGrabbing, setIsGrabbing] = useState(false);
    // const [isExtented, setIsExtended] = useState(false);
    const [isHover, setIsHover] = useState(false)

    function handlePointerDown(e) {
    setIsGrabbing(true);
    setIsSnapping(false);
    const startX = e.clientX;
    const startWidth = width;
    let newWidth = width;

    function handlePointerMove(e) {
    newWidth = startWidth + (e.clientX - startX);
      if (newWidth > 400) return;
      if (newWidth < 150) return;

      setWidth(newWidth);
    }

    function handlePointerUp() {
    setIsGrabbing(false);
    setIsSnapping(true);
      if (newWidth < 275) {
        setWidth(150);
        setIsExtended(false)
      } else if (newWidth > 275) {
        setWidth(400);
        setIsExtended(true)
      }
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    }

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
  }

    return (
        <>
        <div className='Sidebar' onPointerEnter={()=>setIsHover(true)} onPointerLeave={()=>setIsHover(false)} style={{width: isExtended ? "95%" : `${width}px`, transition: isSnapping ? "all 0.4s ease" : "none", background: isExtended ? "rgba(12, 0, 25, 1)" : "rgba(38, 0, 84, 0.4)"}}>
            <div className='sidebuttonBorder'></div>
        {/* <UserData name={user.name} img={user.img} status={user.status} display={isExtended ? "l" : "m"} theme="dark"/> */}
        <Navbar isExtended={isExtended} />
         

            <button className='SideButton' onPointerDown={handlePointerDown} onDoubleClick={()=> {const switchWidth = isExtended ? 150 : 400; setWidth(switchWidth); const refreshExt = !isExtended; setIsExtended(refreshExt)}} style={{backgroundColor: isGrabbing ? "#ffebeb" : "#FF6BD6", cursor: isGrabbing ? "grabbing" : "grab", opacity: isHover ? "1" : "0", transform: isHover ? "translate(-50%, -50%)":"translate(-100%, -50%)"}}></button>
            <LogOut size={isExtended?18:40} style={{ position: 'absolute', top: "90%", left: "50%", transform: "translateX(-50%)", color: "#fff"}}/>
        </div>

        </>

    );
}
