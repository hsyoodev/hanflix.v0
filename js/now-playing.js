const urlParams = new URL(location.href).searchParams;
const query = urlParams.get("query");

const API_KEY = "a5e43f90a600330cd1cca3a7adb9d067";
const MOVIE_BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const PLACEHOLDER_IMAGE_URL = "https://via.placeholder.com/240x357";
const QUERY_PARAMS = "&language=ko-KR&page=1&region=KR";
const SEARCH_URL = `${MOVIE_BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}${QUERY_PARAMS}`;
const NOW_PLAYING_URL = `${MOVIE_BASE_URL}/movie/now_playing?api_key=${API_KEY}${QUERY_PARAMS}`;

window.onload = () => {
  const movieList = document.querySelector("#movieList");
  movieList.innerHTML = getLoadingHtml();

  setMovieListHtml(query !== null ? SEARCH_URL : NOW_PLAYING_URL);
};

function getMovieListHtml(movies) {
  let movieListHtml = "";

  movies.forEach((movie) => {
    const posterPath = movie.poster_path;
    const id = movie.id;
    const title = movie.title;
    const voteAverage = Math.round(movie.vote_average);
    const popularity = Math.round(movie.popularity);
    const releaseDate = movie.release_date;
    const imgSrc =
      posterPath === null
        ? PLACEHOLDER_IMAGE_URL
        : `${IMAGE_BASE_URL}/${posterPath}`;

    movieListHtml += `<li class="col">
          <div class="card">
            <img src="${imgSrc}" class="card-img-top h-100" alt="Movie Poster" />
            <a href="./details.html?id=${id}" class="stretched-link"></a>
          </div>
          <div class="container mt-3">
            <p class="h6 fw-bold text-nowrap text-truncate">${title}</p>
            <div>
              <span class="small">평점</span>
              <span class="small text-danger">${voteAverage}
              </span>
              <span>/</span>
              <span class="small">인기</span>
              <span class="small text-danger">${popularity}</span>
            </div>
            <div>
              <span class="small">개봉</span>
              <span class="small text-body-tertiary">${releaseDate}</span>
            </div>
          </div>
        </li>`;
  });

  return movieListHtml;
}

function getLoadingHtml() {
  let loadingHtml = "";

  for (let i = 0; i < 20; i++) {
    loadingHtml += `<li class="col placeholder-glow">
                      <div class="card">
                        <img
                          class="card-img-top placeholder h-100"
                          />
                      </div>
                      <div class="container mt-3">
                        <p class="h5 placeholder col-12">영화제목</p>
                        <div class="placeholder col-12">
                          <span class="small">평점</span>
                          <span class="small">0.0 ~ 10.0</span>
                          <span class="small">/</span>
                          <span class="small">인기</span>
                          <span class="small">0.0 ~</span>
                        </div>
                        <div class="placeholder col-12">
                          <span class="small">평점</span>
                          <span class="small">0.0 ~ 10.0</span>
                        </div>
                      </div>
                    </li>`;
  }

  return loadingHtml;
}

function getNotFoundHtml() {
  return `<li class="col text-nowrap">
  <span>검색결과가 없습니다.</span>
  </li>`;
}

function getErrorHtml(message) {
  const errorHtml = `<li class="col text-nowrap text-danger fw-bold">
                          <span>${message}</span>
                        </li>`;
  return errorHtml;
}

function setMovieListHtml(url) {
  axios
    .get(url)
    .then((response) => {
      const movies = response.data.results;
      movieList.innerHTML =
        movies.length === 0 ? getNotFoundHtml() : getMovieListHtml(movies);
    })
    .catch((error) => {
      const message = error.message;
      movieList.innerHTML = getErrorHtml(message);
    });
}
