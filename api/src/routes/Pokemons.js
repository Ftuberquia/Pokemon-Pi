const { Router } = require('express');
const { Pokemon, Type } = require('../db.js');
const { getPokemonByName, getPokemonById, getAll, getPokemonByIdFromDb } = require('../controllers/getPokemons.js');
const router = Router();


// Sin modularizar handlers.. const getpokemonByName = (req, res)....
router.get('/', async (req, res) => {
    try {
        const { name } = req.query;
        
        if (name) {
            const pokemon = await getPokemonByName(name.toLowerCase());
            if (!pokemon){
                throw new Error("Pokemon not founded");
            } return res.status(200).send(pokemon);
        }
        const allPokemons = await getAll();
        return res.status(200).send(allPokemons);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        if (id < 252 ) {
            const response = await getPokemonById(id);
            return res.status(200).send(response);
        } else {
            const fromDb = await getPokemonByIdFromDb(id);
            return res.status(200).send(fromDb);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Crear pokemon
router.post('/', async (req, res) => {
    try {
        let { name, hp, attack, defense, speed, height, weight, imgUrl, types, custom } = req.body;
        const pokemonDb = await Pokemon.findAll();
        let id = 251 + pokemonDb.length;
        const find = await Pokemon.findOne({ where: {name: name}})

        
        if (!name || !hp || !attack || !defense || !speed || !height || !weight || !types) throw new Error ("Missing parameters");
        if (find) throw new Error ("Pokemon already exists");
        if (!imgUrl) imgUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Pokebola-pokeball-png-0.png/800px-Pokebola-pokeball-png-0.png";

        const newPokemon = { id: ++id, name, hp, attack, defense, speed, height, weight, imgUrl, custom }
        const create = await Pokemon.create(newPokemon);

        let pokemonType = await Type.findAll({where: {name: types}});
        await create.addType(pokemonType);

        res.status(200).send("Pokemon successfully Created");
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const pokemon = await Pokemon.findByPk(id);
        if (pokemon){
            await pokemon.destroy();
            res.status(200).send("Pokemon deleted successfully");
        } else {
            throw new Error ("Cannot delete pokemon");
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
})

module.exports = router;