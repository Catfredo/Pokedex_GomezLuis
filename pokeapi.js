
const pokeContent = document.getElementById("pokemonContent");
const modalSearch = document.getElementById("pokemonContent");
const divGeneration = document.getElementById("textGen");
let pokeForm = document.getElementById("searchPokemon");
let generationShow = 1;


function showPokemonGen(gen) {
  const pokemonGen = {
    1: [1, 151],
    2: [152, 251],
    3: [252, 386],
  };

  const pokemonGenDefault = [1, 151];
  const generacion = pokemonGen[gen] || pokemonGenDefault;
  return generacion;
}

let pokemonGeneration = showPokemonGen(generationShow);


let arrowRight = document
  .getElementById("arrow-right")
  .addEventListener("click", (e) => {
    if (generationShow < 4) {
      modalSearch.innerHTML = "";
      generationShow += 1;
      pokemonGeneration = showPokemonGen(generationShow);
      divGeneration.innerHTML = "Gen " + generationShow;
      drawPokemon();
      console.log(generationShow);
    }
  });

let arrowLeft = document
  .getElementById("arrow-left")
  .addEventListener("click", (e) => {
    if (generationShow > 0) {
      modalSearch.innerHTML = "";
      generationShow -= 1; 
      pokemonGeneration = showPokemonGen(generationShow);
      divGeneration.innerHTML = "Gen " + generationShow;
      drawPokemon();
      console.log(generationShow);
    }
  });

const drawPokemon = async () => {
  for (let i = pokemonGeneration[0]; i <= pokemonGeneration[1]; i++) {
    await getPokemons(i);
  }
};



const getPokemons = async (id, modal) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

  try {
    const rest = await fetch(url);

    if (!rest.ok) {
      alert("POKEMON NOT FOUND, PLEASE TRY AGAIN");
  
    }
    const pokemon = await rest.json();
    createPokemon(pokemon, modal);
  } catch (error) {
    console.error("Error", error.message);

    if (modal) {

      showModal("POKEMON NOT FOUND, PLEASE TRY AGAIN");
    } else {

      console.log("POKEMON NOT FOUND, PLEASE TRY AGAIN");
    }
  }
};



const colors = {
  fire: "#FFA05D",
  grass: "#8FD594",
  electric: "#FFE43B",
  water: "#7E97C0",
  ground: "#CAAC4D",
  rock: "#90642D",
  poison: "#9D5B9B",
  bug: "#EAFD71",
  dragon: "#97b3e6",
  psychic: "#FF96B5",
  flying: "#CDCDCD",
  fighting: "#FF5D5D",
  normal: "#FFFFFF",
};

const main_types = Object.keys(colors);

function createPokemon(pokemon, modal) {
  const pokemonEL = document.createElement("div");
  pokemonEL.classList.add("pokemon");

  const poke_types = pokemon.types.map((type) => type.type.name);
  const type = main_types.find((type) => poke_types.indexOf(type) > -1);
  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  const color = colors[type];
  pokemonEL.style.backgroundColor = color;

  if (modal !== true) {
  
    const pokeInnerHTML = `
            <div class="img-container">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
              pokemon.id
            }.png" alt="${name}">
            </div>

            <div class="info">
                <span class="number">#${pokemon.id
                  .toString()
                  .padStart(3, "0")} </span>
                <h3 class="name">${name}</h3>
                <small class="type">Tipo: <span>${type}</span></small>
                  </div>
        `;
    pokemonEL.innerHTML = pokeInnerHTML;
    pokeContent.appendChild(pokemonEL);
  } else {
    const pokeInnerHTML = `
        <div id="modalPokemon" class="modal">
            <div class="pokemon">

                <div class="img-container">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                  pokemon.id
                }.png" alt="${name}">
                </div>

                <div class="info">
                    <span class="number">#${pokemon.id
                      .toString()
                      .padStart(3, "0")} </span>
                    <h3 class="name">${name}</h3>
                    <small class="type">Tipo: <span>${type}</span></small>
                </div>

            </div>
        </div> 
    `;
    modalSearch.innerHTML = pokeInnerHTML;
  }
}
drawPokemon();



pokeForm.addEventListener("submit", (e) => {

  e.preventDefault();
  let searchPokemon = document.getElementById("pokemon").value;
  getPokemons(searchPokemon, true);
});

function exitModal() {
  const modalPokemon = document.getElementById("modalPokemon");
  modalPokemon.style.display = "none";
  drawPokemon();
}
