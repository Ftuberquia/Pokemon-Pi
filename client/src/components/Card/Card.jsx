import React from "react";
import { Link } from "react-router-dom";
import './Card.css';

export default function Card ({id, name, types, img}) {

    return (
        <Link to={`/details/${id}`}>
            <div className="card-cont">
                <div className="id-cont" key={id}>
                    <h3>{id}</h3>
                    <img src={"https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Pokebola-pokeball-png-0.png/800px-Pokebola-pokeball-png-0.png"} alt=""/>
                </div>
                <div className="name-cont">
                    <h3 className="card-name">{name}</h3>
                </div>
                <div className="img-cont"><img src={img} alt="imagen"/></div>
                <div className="types-cont">
                    {
                        types?.map((type) => {
                            return <span id="icon" className={type} key={type + id}><img src={`https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/5781623f147f1bf850f426cfe1874ba56a9b75ee/icons/${type}.svg`} alt="tipo-Poke"/></span>;
                        })
                    }
                </div>
            </div>
        </Link>
    )
}