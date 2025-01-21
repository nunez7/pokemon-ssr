const TOTAL_POKEMONS = 151;
const TOTAL_PAGES = 5;

( async() => {
    //Array de numeros
    const pokemonsIds = Array.from({ length: TOTAL_POKEMONS }, (_, i) => i + 1);
    const pageNumbers = Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1);

    //Rutas de los pokemons
    let fileContent = pokemonsIds.map(id => `/pokemons/${id}`).join('\n');
    let fileContentPages = pageNumbers.map(page => `/pokemons/page/${page}`).join('\n');

    //Por nombre de pokemons (basado en peticiones)
    const pokemonsNames = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${TOTAL_POKEMONS}`)
    .then(res => res.json());

    let fileContentNames = pokemonsNames.results.map(pokemon => `/pokemons/${pokemon.name}`).join('\n');

    let todasPages = fileContent + '\n' + fileContentNames;

    //Crear el archivo
    const fs = require('fs');
    //Escribir el archivo
    fs.writeFileSync('routes.txt', todasPages);

    console.log("routes.txt Generado!");
    
})();