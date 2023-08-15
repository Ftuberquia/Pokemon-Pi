import React from "react";
import './Switcher.css';

const Switcher = () => {

    const handleChangeTheme = (event) => {
        event.preventDefault();
        document.body.classList.toggle('darker');
        document.querySelector('.switch').classList.toggle('actived');
    }
    
    return (
        <button className="switch" onClick={handleChangeTheme}>
                <span className="switch-icon">Day</span>
                <span className="switch-icon">Dark</span>
        </button>
    )
}

export default Switcher;