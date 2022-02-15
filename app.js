import 'regenerator-runtime/runtime';
import axios from 'axios';


document.addEventListener("DOMContentLoaded", function () {

    axios.get('https://pokeapi.co/api/v2/pokemon')
        .then(function (response) {
            let pokemons = response.data.results;
            console.log(pokemons);
            let rowElement = document.querySelector('#pokemonList');
            pokemons.forEach(pokemon => {
                axios.get(pokemon.url)
                    .then(function (response) {
                        let pokemonData = response.data
                        axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonData.id}`)
                            .then(function (response) {
                                let speciesData = response.data;
                                let frenchData = speciesData.names.filter(el => el.language.name == 'fr');
                                let frenchName = frenchData[0].name;

                                // console.log(speciesData)

                                let colElement = document.createElement("div");
                                colElement.className = 'div';

                                let cardElement = document.createElement("div");
                                cardElement.className = 'contents';

                                let cardContentElement = document.createElement("div");
                                cardContentElement.className = 'card-content';

                                let titleElement = document.createElement("span");
                                titleElement.className = "card-title";
                                titleElement.innerHTML = pokemonData.name + '(' + frenchName + ')'

                                let imgElement = document.createElement("img");
                                imgElement.className = "resonsive-img";
                                imgElement.src = pokemonData.sprites.other['official-artwork'].front_default

                                cardContentElement.appendChild(titleElement);
                                cardContentElement.appendChild(imgElement);

                                cardElement.appendChild(cardContentElement);
                                colElement.appendChild(cardElement);
                                rowElement.appendChild(colElement);

                            })
                    })
            })
        })
        .catch(function (error) {
            console.log(error);
        })
});


