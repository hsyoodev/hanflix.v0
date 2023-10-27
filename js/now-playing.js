const API_KEY = "892b79f98eae119619e5682f22a8c043";
const MOVIE_BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const NOW_PLAYING_URL = `${MOVIE_BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=ko-KR&region=KR`;

window.onload = () => {
  const movieList = document.querySelector("#movieList");
  const movieSearch = document.querySelector("#movieSearch");
  axios
    .get(NOW_PLAYING_URL)
    .then((response) => {
      // movieList.innerHTML = getMovieListHtml(response.data.results);
    })
    .catch((error) => {
      console.log(error);
    });
  movieList.innerHTML = getLoadingHtml();
  movieSearch.addEventListener("submit", (event) => {
    event.preventDefault();
    // 검색 기능 개발 예정
  });
};

// function
function getMovieListHtml(movies) {
  let movieListHtml = "";
  movies.forEach((movie) => {
    movieListHtml += `<div class="col">
          <div class="card">
            <img src="${IMAGE_BASE_URL}/${movie.poster_path}" class="card-img-top" alt="Movie Poster" />
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
function getLoadingHtml() {
  let loadingHtml = "";
  for (let i = 0; i < 20; i++) {
    loadingHtml += `<div class="col">
                      <div class="card>
                        <img src="..." class="card-img-top" alt="Movie Poster" height="300px" />
                      </div>
                    </div>`;
  }
  return loadingHtml;
}
