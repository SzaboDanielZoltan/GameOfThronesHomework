const GameOfThrones = {
  characters: [],
  sortCharacters() {
    this.characters.sort((a, b) => (a.name < b.name ? -1 : 1));
  },
  charactersReady(response) {
    this.characters = response;
    this.sortCharacters();
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
