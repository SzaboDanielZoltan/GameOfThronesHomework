const GameOfThrones = {
  characters: [],
  houseOrOrganizationValidator(charObj) {
    if (charObj.house !== undefined) {
      return `<img class="bio__house" src="../assets/houses/${charObj.house}.png" alt="${charObj.house}">`;
    } if (charObj.organization !== undefined) {
      return `<img class="bio__house" src="../assets/houses/${charObj.organization}.png" alt="${charObj.organization}">`;
    }
    return '';
  },
  getCharacterByName(name) {
    return this.characters.filter(char => char.name === name)[0];
  },
  showInfo(name) {
    const characterObj = this.getCharacterByName(name);
    const bio = document.querySelector('.bio');
    bio.innerHTML = `
    <img class="bio__picture" src="/${characterObj.picture}" alt="${characterObj.name}">
    <h2>${characterObj.name}</h2>
    ${this.houseOrOrganizationValidator(characterObj)}
    <p>${characterObj.bio}</p>
    `;
  },
  makeCharacterDivs() {
    const main = document.querySelector('main');
    for (let i = 0; i < this.characters.length; i += 1) {
      if (!this.characters[i].dead) {
        main.innerHTML += `
      <div class="character">
        <img class="character__portrait" src="/${this.characters[i].portrait}" alt="${this.characters[i].name}">
        <div class="character__name">
          <span id="${this.characters[i].name}" onclick="GameOfThrones.showInfo(this.id)">
            ${this.characters[i].name}
          <span>
        </div>
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
