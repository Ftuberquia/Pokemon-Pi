import { CREATE_POKEMON, DELETE_POKEMON, FILTER_BY_CREATED, FILTER_BY_TYPE, GET_ALL_POKEMONS, GET_POKEMON_BYNAME, GET_POKEMON_DETAIL, GET_TYPES, ORDER_BY_ATTACK, ORDER_BY_NAME, CLEAR_DETAIL } from "../actions";

const initialState = {
    pokemons: [],
    filtered: [],
    pokemonDetail: {},
    types: [],
    loader: false,
    error: {},
}

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ALL_POKEMONS:
            return {
                ...state,
                pokemons: action.payload,
                filtered: action.payload,
                loader: true
            };
        case GET_POKEMON_BYNAME:
            return {
                ...state,
                pokemons: state.pokemons.filter((pokemon) => pokemon.name === action.payload.name),
                loader: true
            };
        case GET_POKEMON_DETAIL:
            return {
                ...state,
                pokemonDetail: action.payload
            };
        case GET_TYPES:
            return {
                ...state,
                types: action.payload
            };
        case CREATE_POKEMON:
            if (action.payload.status === 200) { return {
                ...state,
                } 
            } else { return {
                ...state,
                error: action.payload.send
            }
                
            }
        case DELETE_POKEMON:
            return {
                ...state,
                pokemonDetail: {},
            }
        case FILTER_BY_TYPE:
            // state.pokemons.types.map(type => type.name)
            // let byType = state.pokemons?.filter((pokemon) => pokemon.types.map((type) => type.name)?.includes(action.payload) || pokemon.types.includes(action.payload));
            
            let filtered = state.filtered;
            let byType = filtered?.filter((pokemon) => pokemon.types.includes(action.payload))
            if (action.payload === 'All') byType = filtered;
            return {
                ...state,
                pokemons: byType
            };
        case FILTER_BY_CREATED:
            let filtered2 = state.filtered;
            let byCreated = action.payload === 'created' ? filtered2.filter(pokemon => pokemon.custom === true) : filtered2.filter(pokemon => !pokemon.custom);
            if (action.payload === 'All') byCreated = filtered2;
            // if (!byCreated.length) return alert ('Pokemons not founded');
            return {
                ...state,
                pokemons: byCreated
            };
        case ORDER_BY_NAME:
            const byName = action.payload === 'A-Z' ? state.pokemons.sort((a,b) => {
                if(a.name > b.name) return 1
                if(a.name < b.name) return -1
                return 0
            }) : state.pokemons.sort((a,b) => {
                if(a.name < b.name) return 1
                if(a.name > b.name) return -1
                return 0
            });
            return {
                ...state,
                pokemons: byName
            };
        case ORDER_BY_ATTACK:
            const byAttack = action.payload === 'min' ? state.pokemons.sort((a,b) => {
                return a.attack - b.attack
            }) : state.pokemons.sort((a,b) => {
                return b.attack - a.attack
            });
            return {
                ...state,
                pokemons: byAttack
            }
        case CLEAR_DETAIL:
            return {
                ...state,
                pokemonDetail: {}
            }
            default:
            return {...state};
    }
}

export default rootReducer;