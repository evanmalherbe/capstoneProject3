import React from 'react';

// Import logo image
import Logo from '../bangLogo.png';

// Import menu component
import Menu from './Menu';

// Create function to display header 
function Header() {
    return (
        <header className="header">
            
            <div className="heading">
                <img src={Logo} alt="logo" className="logoImg" />
                <h1>Minesweeper </h1>
            </div>
            
            <Menu />
        </header>
    );
}

// Export component so it can be used by App.js
export default Header;