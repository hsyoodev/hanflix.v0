// variable
const API_KEY = "892b79f98eae119619e5682f22a8c043";
const MOVIE_BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const NOW_PLAYING_URL = `${MOVIE_BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=ko-KR&region=KR`;
let movies = null;
let isLoading = true;

// tmdb api
axios
  .get(NOW_PLAYING_URL)
  .then((response) => {
    movies = response.data.results;
    isLoading = false;
    // view
    window.onload = () => {
      const movieList = document.querySelector("#movieList");
      const movieSearch = document.querySelector("#movieSearch");
      movieSearch.addEventListener("submit", (event) => {
        event.preventDefault();
        // 검색 기능 개발 예정
      });
      if (isLoading) {
        // 로딩 화면 개발 예정
      } else {
        movieList.innerHTML = getMovieListHtml();
      }
    };
  })
  .catch((error) => {
    console.log(error);
  });

// function
function getMovieListHtml() {
  let movieListHtml = "";
  movies.forEach((movie) => {
    movieListHtml += `<div class="col">
                        <div class="card">
                          <img src="${IMAGE_BASE_URL}/${movie.poster_path}" class="card-img-top h-100" alt="Movie Poster" />
                          <a href="./movie.html?id=${movie.id}" class="stretched-link"></a>
                        </div>
                        <div class="container mt-3">
                          <dl class="row">
                            <dt>${movie.title}</dt>
                            <dd>
                              평점, 개봉일 제공 기능
                            </dd>
                            <dd>
                              개발 예정
                            </dd>
                          </dl>
                        </div>
                      </div>`;
  });
  return movieListHtml;
}
