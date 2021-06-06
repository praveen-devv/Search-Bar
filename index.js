const charactersList = document.getElementById('charactersList');
let characters=[];

const searchBar = document.getElementById('searchBar');

searchBar.addEventListener('keyup',(e) => {
    const searchString = e.target.value.toLowerCase();
    const filteredString = characters.filter(character => {
        return character.name.toLowerCase().includes(searchString) || character.house.toLowerCase().includes(searchString);
    })
    displayCharacters(filteredString)
})

const loadCharacters = async() =>{
    try{
        const res = await fetch('http://hp-api.herokuapp.com/api/characters')
        characters = await res.json();
        console.log(characters);
        displayCharacters(characters);
    }catch(err){
        console.log(err);
    }
}

const displayCharacters = (characters) =>{  
    const htmlString = characters
        .map((character) => {
            return `
                <li class="character">
                    <h2>${character.name}</h2>
                    <p>House: ${character.house}</p>
                    <img src="${character.image}"></img>
                </li>
            `
        })
        .join('');
    charactersList.innerHTML = htmlString;
}

loadCharacters();