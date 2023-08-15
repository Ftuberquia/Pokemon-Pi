import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getPokemonByName } from "../../redux/actions";
import './SearchBar.css';


export default function Search () {

    const dispatch = useDispatch();
    const [input, setInput] = useState('');

    const handleChange = (event) => {
        setInput(event.target.value);
    }

    const handleSubmit = (event) => {
        if (!input){
            return alert ("Insert a valid name");
        }
        event.preventDefault();
        dispatch(getPokemonByName(input));
        setInput('');
    }
    
    return (
        <div className="search-cont">
            <input type="search" placeholder="Search Pokemon..."
            value={input} className="search-input"
            onChange={(event) => handleChange(event)}></input>
            <button className="search-button"
            onClick={(event) => handleSubmit(event)}>Search</button>
        </div>
        )
};