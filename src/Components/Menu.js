import React from 'react';

// Import Link component to be used as part of React Router to display particular components based on URL
import {  
    Link
  } from "react-router-dom";

/* Create function to display dropdown menu to choose page. Changing the page (or URL) will then let us use 
React router to only show particular components to the user (i.e. Minesweeper game or Help page) */
function Menu () {
    return (
        <div className="menuDiv">
            <ul>
                <li><Link to="/Gameboard" className="menuLink">Play game</Link></li>
                <li><Link to="/Help" className="menuLink">Help</Link></li>
            </ul>
        </div>
    );
}

// Export component so it can be used by App.js
export default Menu;