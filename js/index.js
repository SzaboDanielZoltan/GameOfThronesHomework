const GameOfThrones = {
  characters: [],
  searchCharacter() {
    if (this.getCharacterByName(document.querySelector('#search').value) !== undefined) {
      this.showInfo(document.querySelector('#search').value);
    } else {
      const bio = document.querySelector('.bio');
      bio.innerHTML = '<p>Character not found</p>';
    }
  },
  toggleEffectsOnSelect(name) {
    const portraits = Array.from(document.querySelectorAll('.character__portrait'));
    portraits.forEach(img => (name !== img.name
      ? img.classList.add('character__portrait--effectonselect')
      : img.classList.remove('character__portrait--effectonselect')));
    const names = Array.from(document.querySelectorAll('.character__name'));
    names.forEach(div => (name !== div.children[0].id
      ? div.classList.remove('character__name--effectonselect')
      : div.classList.add('character__name--effectonselect')));
  },
  houseOrOrganizationValidator(charObj) {
    if (charObj.house !== undefined) {
      return `<img class="bio__house" src="../assets/houses/${charObj.house}.png" alt="${charObj.house}">`;
    } if (charObj.organization !== undefined) {
      return `<img class="bio__house" src="../assets/houses/${charObj.organization}.png" alt="${charObj.organization}">`;
    }
    return '';
  },
  getCharacterByName(name) {
    return this.characters.filter(char => char.name.toLowerCase() === name.toLowerCase())[0];
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
    this.toggleEffectsOnSelect(name);
  },
  makeCharacterDivs() {
    const main = document.querySelector('main');
    for (let i = 0; i < this.characters.length; i += 1) {
      if (!this.characters[i].dead) {
        main.innerHTML += `
      <div class="character">
        <img class="character__portrait" src="/${this.characters[i].portrait}" alt="${this.characters[i].name}" name="${this.characters[i].name}" onclick="GameOfThrones.showInfo(this.name)">
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
