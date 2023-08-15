import React, { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getTypes, createPokemon} from '../../redux/actions/index.js';
import { Link } from "react-router-dom";
import './CreateForm.css';
import Footer from "../Footer/Footer.jsx";
  

const validation = (form) => {

    // const regExp = /(\!\¿\?\¡\)\/\&\$\#\"\=\-\.\,\:\_\;\{\¨\´\+\}\[\]\%\@\*)\w/
    const errors = {};
    if(!form.name) errors.name = 'Name is required';
    if (form.name && form.name.includes("/" || "*" || "+" || "$" || "#" || "!" || "%" || "&" || "(" || ")" || "=" || "?" || "¿" || "]" || "{" || "}" || "[" || "-" || "@" || "_" || "," || "." || ":" || "<" || ">")) errors.name = 'Signs are not allowed';
    if(form.name && form.name.length > 0 && form.name.length < 3) errors.name = 'Name must have 3 or more letters';
    
    if (!form.hp) errors.hp = 'Please enter a valid numer between 1 and 400';
    if (form.hp && Number(form.hp) === form.hp) errors.hp = 'Numbers allowed only';
    if (!form.attack) errors.attack = 'Please enter a valid numer between 1 and 350';
    // if (form.attack && typeof (form.attack) !== 'number') errors.attack = 'Numbers allowed only';
    if (!form.defense) errors.defense = 'Please enter a valid numer between 1 and 400';
    // if (form.defense && typeof (form.defense) !== 'number') errors.defense = 'Numbers allowed only';
    if (!form.speed) errors.speed = 'Please enter a valid numer between 1 and 100';
    // if (form.speed && typeof (form.speed) !== 'number') errors.speed = 'Numbers allowed only';
    if (!form.height) errors.height = 'Please enter a valid numer between 1 and 150';
    // if (form.height && typeof (form.height) !== 'number') errors.height = 'Numbers allowed only';
    if (!form.weight) errors.weight = 'Please enter a valid numer between 1 and 300';
    // if (form.weight && typeof (form.weight) !== 'number') errors.weight = 'Numbers allowed only';
    

    return errors;
}

const Create = () => {

    const dispatch = useDispatch();
    const types = useSelector(state => state.types);
    const history = useHistory();
    const [error, setError] = useState({});
    
    const [form, setForm] = useState({
        name: "",
        hp: "",
        attack: "",
        defense: "",
        speed: "",
        height: "",
        weight: "",
        image: "",
        types: [],
        custom: true,
    });

    useEffect(() => {
        dispatch(getTypes())
    }, [dispatch])
    
    const handleDelete = (type) => {
        setForm({
            ...form,
            types: form.types.filter((types) => types !== type)
        })
    }
    
    const handleSelect = (event) => {
        const selected = event.target.value;
        if (form.types.length >= 2) return alert ("Cannot choose more than two types");
        if (!form.types.includes(selected)){
            setForm({
                ...form,
                types: [...form.types, selected]
            })
        } 
    }

    const handleChange = (event) => {
        setForm({
              ...form,
              [event.target.name]: event.target.value
        });
        setError(validation({
            ...form,
            [event.target.name]: event.target.value
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setError(validation(form));
        if ((Object.keys(error)).length > 0) {
            return alert ("Make shure to complete all the fields")
            
        }
        if (!form.types.length) {
        form.types = ['normal'];
        }
        dispatch(createPokemon(form));
        alert("Pokemon created");
        history.push("/home");
        
    }   

    return (
        <section className="create-section">
            <Link to={'/home'}>
                <div className="back-home-cont"><button className="back-home-butt">Back Home</button></div>
            </Link>
            <div><h2>CREATE YOUR OWN POKÉMON</h2></div>
            <form className="form-cont" onSubmit={handleSubmit}>
                <label>Name: </label>
                <input type="text" name="name" value={form.name} onChange={handleChange}></input>
                {error.name && <span>{error.name}</span>}
                <label>HP: </label>
                <input type="number" min='0' max='400' name="hp" value={form.hp} onChange={handleChange}></input>
                {error.hp && <span>{error.hp}</span>}
                <label>attack: </label>
                <input type="number" min='0' max='350' name="attack" value={form.attack} onChange={handleChange}></input>
                {error.attack && <span>{error.attack}</span>}
                <label>defense: </label>
                <input type="number" min='0' max='400' name="defense" value={form.defense} onChange={handleChange}></input>
                {error.defense && <span>{error.defense}</span>}
                <label>speed: </label>
                <input type="number" min='0' max='100' name="speed" value={form.speed} onChange={handleChange}></input>
                {error.speed && <span>{error.speed}</span>}
                <label>height: </label>
                <input type="number" min='0' max='150' name="height" value={form.height} onChange={handleChange}></input>
                {error.height && <span>{error.height}</span>}
                <label>weight: </label>
                <input type="number" min='0' max='300' name="weight" value={form.weight} onChange={handleChange}></input>
                {error.weight && <span>{error.weight}</span>}
                <label>image: </label>
                <input type="url" name="image" value={form.image} onChange={handleChange}></input>
                <label>types:</label>
                <select className="select-button" name="type" onChange={handleSelect}>
                    {types.map((type) => {
                    return <option key={type.id} value={type.name}>{type.name}</option>
                    })}
                </select>
                <div className="selected">
                    {
                    form.types?.map((type) => {
                        return <span key={type} className="delete-type-cont">{type}<button className="delete-type-button" onClick={() => handleDelete(type)}>x</button></span>
                    })
                    }
                </div>
                <button type="submit" className="createpoke-button">Create Pokémon</button>
            </form>
            <Footer/>
        </section>
    )
}

export default Create;