import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterByCreated, filterByType, getAllPokemons, getTypes, orderByAttack, orderByName } from '../../redux/actions';
import './Home.css';
import Nav from '../Nav/Nav.jsx';
import Card from '../Card/Card.jsx';
import Pagination from '../Pagination/Pagination.jsx';
import Footer from '../Footer/Footer.jsx';
import Loader from '../Loader/Loader.jsx';


export default function Home () {

    // loader
    const loader = useSelector(state => state.loader);

    // pagination elements:
    const pokemons = useSelector(state => state.pokemons);
    const [ pokemonsPerPage ] = useState(12);
    const [ currentPage, setCurrentPage ] = useState(1);
    const last = currentPage * pokemonsPerPage;
    const first = last - pokemonsPerPage;
    const currentPokemons = pokemons.slice(first, last);
    const numberOfPages = pokemons.length/pokemonsPerPage
    const pagination = (numberPage) => {
        setCurrentPage(numberPage);
        document.getElementById(`${currentPage}`).classList.remove('active');
        document.getElementById(`${numberPage}`).classList.toggle('active');
    }

    //filtering & ordering:

    const dispatch = useDispatch();
    const types = useSelector(state => state.types);
    const [order, setOrder] = useState('');
    console.log(order);

    // loader
    // const [loader, setLoader] = useState(false);

    // const [data, setData] = useState(null);

    // message
    // const [error, setError] = useState(null);

    useEffect(() => {
        dispatch(getAllPokemons());
        dispatch(getTypes());
    }, [dispatch]);

    // filtering:

    const handleFilterByType = (event) => {
        dispatch(filterByType(event.target.value))
        setCurrentPage(1);
        document.getElementById(`${currentPage}`).classList.remove('active');
        document.getElementById("1").classList.toggle('active');
    }

    const handleFilterByCreated = (event) => {
        dispatch(filterByCreated(event.target.value))
        setCurrentPage(1);
        document.getElementById(`${currentPage}`).classList.remove('active');
        document.getElementById("1").classList.toggle('active');
    }

    // ordering:

    const handleOrderByName = (event) => {
        dispatch(orderByName(event.target.value));
        setOrder(event.target.value);
        setCurrentPage(1);
        document.getElementById(`${currentPage}`).classList.remove('active');
        document.getElementById("1").classList.toggle('active');
    }

    const handleOrderByAttack = (event) => {
        dispatch(orderByAttack(event.target.value));
        setOrder(event.target.value);
        setCurrentPage(1);
        document.getElementById(`${currentPage}`).classList.remove('active');
        document.getElementById("1").classList.toggle('active');
    }

    // reset: 

    const handleReset = (event) => {
        event.preventDefault();
        dispatch(getTypes());
        dispatch(getAllPokemons());
        document.getElementById('order').value = 'order';
        document.getElementById('attack').value = 'attack';
        document.getElementById('created').value = 'all';
        document.getElementById('types').value = 'type';
        setCurrentPage(1);
        document.getElementById(`${currentPage}`).classList.remove('active');
        document.getElementById("1").classList.toggle('active');
        alert('Loading...');
    }

    // next y previous buttons:

    const handleNext = (event) => {
        event.preventDefault();
        currentPage <= numberOfPages ? setCurrentPage(currentPage + 1) : setCurrentPage(currentPage);
        document.getElementById(`${currentPage}`).classList.remove('active');
        currentPage <= numberOfPages ? document.getElementById(`${currentPage + 1}`).classList.toggle('active') : 
        document.getElementById(`${currentPage}`).classList.toggle('active');
    }

    const handlePrevious = (event) => {
        event.preventDefault();
        currentPage > 1 ? setCurrentPage(currentPage - 1) : setCurrentPage(currentPage);
        document.getElementById(`${currentPage}`).classList.remove('active');
        currentPage > 1 ? document.getElementById(`${currentPage - 1}`).classList.toggle('active') :
        document.getElementById(`${currentPage}`).classList.toggle('active');
    }

    return (
        <section className='section-home'>
            <Nav/>
            <div className='filt-order-cont'>
                <div className='filters'>
                    <select className='filter-butt' id='order' onChange={(event) => handleOrderByName(event)}>
                        <option value="order">Order</option>
                        <option value="A-Z">A - Z</option>
                        <option value="Z-A">Z - A</option>
                    </select>
                    <select className='filter-butt' id='attack' onChange={(event) => handleOrderByAttack(event)}>
                        <option value="attack">Attack</option>
                        <option value="min">Min</option>
                        <option value="max">Max</option>
                    </select>
                </div>
                <div className='order'>
                    <select className='order-butt' id='types' onChange={(event) => handleFilterByType(event)}>
                        <option value="type">Type</option>
                        <option value="All">All</option>
                        {types.map((type) => {
                            return <option key={type.id} value={type.name}>{type.name}</option>
                        })}
                    </select>
                    <select className='order-butt' id='created' onChange={(event) => handleFilterByCreated(event)}>
                        <option value="All">All??</option>
                        <option value="created">Customized</option>
                        <option value="not-created">Not Customized</option>
                    </select>
                </div>
                <div className='reset'>
                    <button type='submit' className='reset-button' onClick={(event) => handleReset(event)}>Reset</button>
                </div>
            </div>
                <Pagination pokemonsPerPage={pokemonsPerPage} pokemons={pokemons.length} pagination={pagination} currentPage={currentPage}
                handlePrevious={handlePrevious} handleNext={handleNext}/>
            <div className='pokemons-grid'>
                    {
                        !loader ? <Loader/> : currentPokemons.map((pokemon) => {
                            return (
                                <Card
                                id={pokemon.id}
                                name={pokemon.name}
                                attack={pokemon.attack}
                                img={pokemon.imgUrl}
                                key={pokemon.id}
                                types={pokemon.types}
                                />)
                            })
                        }
            </div>
                <br></br>
                <br></br>
            <Footer/>
        </section>
    );
};