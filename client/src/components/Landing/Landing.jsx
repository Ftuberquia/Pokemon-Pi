import React from "react";
import './Landing.css';
import { Link } from 'react-router-dom';
import logolinkedin from "../../img/logolinkedin.png"
import logogithub from "../../img/logogithub.png"


export default function Landing () {

    return (
        <section className="landing">
            <div className="center-on-page">
                <div className="pokeball">
                    <Link exact to="/home">
                    <div className="pokeball__button"></div>
                    </Link>
                </div>
            </div>
            <div className="text-container"><p>© Frank Tuberquia - Fatube Desarrollo web - 2023</p></div>
            <div className="icons-container">
                <a className="icon-linkedin" href='https://www.linkedin.com/in/franktuberquia/'><img src={logolinkedin} alt="logolinkdin"/></a>
                <a className="icon-github"href='https://github.com/Ftuberquia'><img src={logogithub} alt="logogithub"/></a>
            </div>
        </section>
    )
}