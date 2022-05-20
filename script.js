
//link type to colors
const colors = {
	fire: '#FDDFDF',
	grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
};


const poke_container = document.getElementById('poke_container');

// max number of Pokemons avaialbe in the poke api with valid links
const NUM_POKEMONS = 898;


const allTypesOfPokemon = Object.keys(colors);

const fetchPokemons = async () => {
	for (let i = 1; i <= NUM_POKEMONS; i++) {
		await getPokemon(i);
	}
};

const getPokemon = async id => {
	const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
	const results = await fetch(url);
	const pokemon = await results.json();
	createPokemonCard(pokemon);
};

function padPokemonID(number, length) {
    let str = '' + number;
    while (str.length < length) {
      str = '0' + str;
    }
    return str
  };

function createPokemonCard(pokemon) {
	const pokemonElement = document.createElement('div');
	pokemonElement.classList.add('pokemon');

	const poke_types = pokemon.types.map(type => type.type.name);
	const type = allTypesOfPokemon.find(type => poke_types.indexOf(type) > -1);
	// Uppercase the first letter
	const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
	const pokemonColor = colors[type];
	
	pokemonElement.style.backgroundColor = pokemonColor;

	const pokeInnerHTML = `
        <div class="img-container">
            <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${
							padPokemonID(pokemon.id,3)
						}.png" alt="${name}" />
        </div>
        <div class="info">
            <span class="number">#${pokemon.id
							.toString()
							.padStart(3, '0')}</span>
            <h3 class="name">${name}</h3>
            <small class="type">Type: <span>${type}</span></small>
        </div>
    `;

	pokemonElement.innerHTML = pokeInnerHTML;

	poke_container.appendChild(pokemonElement);
}

fetchPokemons();


//Contact me containers
const floating_btn = document.querySelector('.floating-btn');
const close_btn = document.querySelector('.close-btn');
const social_panel_container = document.querySelector('.social-panel-container');

floating_btn.addEventListener('click', () => {
	social_panel_container.classList.toggle('visible')
});

close_btn.addEventListener('click', () => {
	social_panel_container.classList.remove('visible')
});