import React from "react";
import './Footer.css';
import logolinkedin from "../../img/logolinkedin.png"
import logogithub from "../../img/logogithub.png"

const Footer = () => {
    return (
        <footer className="footer-cont">
            <div className="text-container"><p>© Frank Tuberquia - Fatube Desarrollo web - 2023</p></div>
            <div className="icons-container">
                <a className="icon-linkedin" href='https://www.linkedin.com/in/franktuberquia/'><img src={logolinkedin} alt="logolinkdin"/></a>
                <a className="icon-github"href='https://github.com/Ftuberquia'><img src={logogithub} alt="logogithub"/></a>
            </div>
        </footer>
        );
}

export default Footer;