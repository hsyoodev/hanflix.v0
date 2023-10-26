const API_KEY = "892b79f98eae119619e5682f22a8c043";
const API_URL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`;

axios
  .get(API_URL)
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  });

window.onload = () => {
  const movieList = document.querySelector("#movieList");
};
