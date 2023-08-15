const axios = require('axios');
const { Pokemon, Type } = require('../db');


const getPokemons = async () => {
    try {
        const api = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=251'); 
            const urls = await api.data.results?.map((p) => axios.get(p.url));
            const getAll = await Promise.all(urls);
            const result = getAll.map((pokemon) => {
                return {
                id: pokemon.data.id,
                name: pokemon.data.name,
                hp: pokemon.data.stats[0].base_stat,
                attack: pokemon.data.stats[1].base_stat,
                defense: pokemon.data.stats[2].base_stat,
                speed: pokemon.data.stats[5].base_stat,
                height: pokemon.data.height,
                weight: pokemon.data.weight,
                imgUrl: pokemon.data.sprites.other.home.front_default,
                custom: false,
                types: pokemon.data.types.map((type) => type.type.name)
            }});
            
        return result;

    } catch (error) {
        throw new Error ("cannot get all pokemons");    
    }
};

const getAll = async () => {
    const pokemonsFromApi = await getPokemons();
    let result = await Pokemon.findAll({
                    include: {
                        model: Type,
                        attributes: ['name'],
                        through: {
                            attributes: []
                        }
                    },
                    order: ['id']
            });
    const fromDb = result?.map((pokemon) => {
        return {
            id: pokemon.id,
            name: pokemon.name,
            hp: pokemon.hp,
            attack: pokemon.attack,
            defense: pokemon.defense,
            speed: pokemon.speed,
            height: pokemon.height,
            weight: pokemon.weight,
            imgUrl: pokemon.imgUrl,
            custom: pokemon.custom,
            types: pokemon.Types.map((type) => type.name)
        };
    })
    return [ ...pokemonsFromApi, ...fromDb ];
}

const getPokemonByNameFromDb = async (name) => {
    const fromDb = await Pokemon.findAll({
        where: {
            name: name,
            include: {
                model: Type,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            },
        }
    });
    return fromDb;
}

const getPokemonByName = async (name) => {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}/`);
    const result = response.data;
        return {
            id: result.id,
            name: result.name,
            hp: result.stats[0].base_stat,
            attack: result.stats[1].base_stat,
            defense: result.stats[2].base_stat,
            speed: result.stats[5].base_stat,
            height: result.height,
            weight: result.weight,
            imgUrl: result.sprites.other.home.front_default,
            custom: false,
            types: result.types.map((type) => type.type.name)
        };
};

const getPokemonByIdFromDb = async (id) => {
    const result = await Pokemon.findByPk(id, {
        include: {
            model: Type,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    });
    return {
        id: result.id,
        name: result.name,
        hp: result.hp,
        attack: result.attack,
        defense: result.defense,
        speed: result.speed,
        height: result.height,
        weight: result.weight,
        imgUrl: result.imgUrl,
        custom: result.custom,
        types: result.Types.map((type) => type.name)
    };
}

const getPokemonById = async (id) => {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    const result = response.data;
        return {
            id: result.id,
            name: result.name,
            hp: result.stats[0].base_stat,
            attack: result.stats[1].base_stat,
            defense: result.stats[2].base_stat,
            speed: result.stats[5].base_stat,
            height: result.height,
            weight: result.weight,
            imgUrl: result.sprites.other.home.front_default,
            custom: false,
            types: result.types.map((type) => type.type.name)
        };
} 




module.exports = {
    getPokemons,
    getPokemonByIdFromDb,
    getPokemonById, 
    getPokemonByNameFromDb,
    getPokemonByName,
    getAll,
}