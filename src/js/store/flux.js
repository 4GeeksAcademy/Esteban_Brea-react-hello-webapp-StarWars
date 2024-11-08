const getState = ({ getStore, setStore }) => ({
  store: {
    characters: [],
    planets: [],
    starships: [],
    favorites: JSON.parse(localStorage.getItem("favorites")),
  },
  actions: {
    fetchData: async () => {
      const responses = await Promise.all([
        fetch("https://www.swapi.tech/api/people"),
        fetch("https://www.swapi.tech/api/planets"),
        fetch("https://www.swapi.tech/api/starships"),
      ]);
      const [charactersData, planetsData, starshipsData] = await Promise.all(
        responses.map((res) => res.json())
      );
      setStore({
        characters: charactersData.results,
        planets: planetsData.results,
        starships: starshipsData.results,
      });
    },

    addToFavorites: (item) => {
      const store = getStore();
      const updatedFavorites = store.favorites.some(
        (fav) => fav.uid === item.uid && fav.type === item.type
      )
        ? store.favorites
        : [...store.favorites, item];
      setStore({ favorites: updatedFavorites });
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    },

    removeFromFavorites: (uid, type) => {
      const store = getStore();
      const updatedFavorites = store.favorites.filter(
        (fav) => !(fav.uid === uid && fav.type === type)
      );
      setStore({ favorites: updatedFavorites });
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    },
  },
});

export default getState;
