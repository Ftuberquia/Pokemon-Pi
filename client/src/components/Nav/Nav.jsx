import React from "react";
import { Link } from 'react-router-dom';
import Searchbar from '../Search/SearchBar.jsx';
import './Nav.css';
import Switcher from "../Switcher/Switcher.jsx";
import logopokemon from "../../img/logo-black.png"

export default function Nav () {

    return (
        <nav className="navbar">
            <Link to={'/home'}>
                <div className="logo-container"><img src={logopokemon} alt="logo"/>
                </div>
            </Link>
            <div className="searchbar-cont"><Searchbar/></div>
                <div className="create-cont">
                    <Link to={'/create'}>
                    <button className="create-button">Create pokémon</button>
                    </Link>
                    <div className="switch-cont"><Switcher/></div>
                </div>
        </nav>
        )
}