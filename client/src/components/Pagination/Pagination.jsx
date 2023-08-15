import React from "react";
import './Pagination.css';

const Pagination = ({pokemonsPerPage, pokemons, pagination, handleNext, handlePrevious, currentPage}) => {
    
    const numOfPages = [];
    const amountOfPages = Math.ceil(pokemons/pokemonsPerPage);
    for (let i = 1; i <= amountOfPages; i++) {
        numOfPages.push(i);
    }


    return (
        <div className="pagination-cont">
            <div className="buttons-container">
                <div className="prev-cont"><button className="prev-button" onClick={(e) => handlePrevious(e)}>Previous</button></div>
                {
                    numOfPages?.map((page) => {
                        return <button className="page-num" id={page} key={page} onClick={() => pagination(page)}>{page}
                        </button>
                    })
                }
                <div className="next-cont"><button className="next-button" onClick={(e) => handleNext(e)}>Next</button></div>
            </div>
        </div>
    )
}

export default Pagination;