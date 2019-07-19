const GameOfThrones = {
  characters: [],
  makeCharacterDivs() {
    const main = document.querySelector('main');
    for (let i = 0; i < this.characters.length; i += 1) {
      if (!this.characters[i].dead) {
        main.innerHTML += `
      <div class="character" data-name="${this.characters[i].name}">
        <img class="character__image" src="/${this.characters[i].portrait}" alt="${this.characters[i].name}">
        <div class="character__name">${this.characters[i].name}</div>
      </div>
      `;
      }
    }
  },
  sortCharacters() {
    this.characters.sort((a, b) => (a.name < b.name ? -1 : 1));
  },
  charactersReady(response) {
    this.characters = response;
    this.sortCharacters();
    this.makeCharacterDivs();
  },
  getCharacters() {
    fetch('/json/got.json')
      .then(response => response.json())
      .then((response) => {
        this.charactersReady(response);
      })
      .catch((error) => {
        throw new Error(error);
      });
  },
  init() {
    this.getCharacters();
  },
};

GameOfThrones.init();
