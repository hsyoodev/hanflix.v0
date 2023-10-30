const urlParams = new URL(location.href).searchParams;
const id = urlParams.get("id");

const API_KEY = "892b79f98eae119619e5682f22a8c043";
const MOVIE_BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const LANGUAGE = "&language=ko-KR";
const PLACEHOLDER_IMAGE_URL = "https://via.placeholder.com/240x357";
const DETAILS_URL = `${MOVIE_BASE_URL}/movie/${id}?api_key=${API_KEY}${LANGUAGE}`;
const COUNTRIES_URL = `${MOVIE_BASE_URL}/configuration/countries?api_key=${API_KEY}${LANGUAGE}`;

window.onload = () => {
  setMovieDetailsHtml(DETAILS_URL);
};

async function getMovieDetailsHtml(movie) {
  const posterPath = movie.poster_path;
  const title = movie.title;
  const originalTitle = movie.original_title;
  const voteAverage = Math.round(movie.vote_average);
  const genres = movie.genres.map((genre) => genre.name).join("/");
  const popularity = Math.round(movie.popularity);
  const country = await getCountry(movie);
  const releaseDate = movie.release_date;
  const runtime = movie.runtime;
  const imgSrc =
    posterPath === null
      ? PLACEHOLDER_IMAGE_URL
      : `${IMAGE_BASE_URL}/${posterPath}`;
  const movieBasicsHtml = `<div class="col-xl-3 col-lg-3 col-md-4 col-sm-5 col-12">
                              <img
                                src="${imgSrc}"
                                class="img-fluid rounded"
                                alt="Movie Poster"
                              />
                            </div>
                            <div class="col-xl-9 col-lg-9 col-md-8 col-sm-7 col-12">
                              <div class="card-body p-0 ps-3">
                                <div>
                                  <p class="card-title fw-bold fs-2 m-0">
                                    ${title}
                                  </p>
                                  <p class="card-text fw-bold fs-6">
                                    ${originalTitle}
                                  </p>
                                </div>
                                <div>
                                  <dl class="row pt-4">
                                    <dt class="col-lg-2 col-3 text-body-tertiary">개봉</dt>
                                    <dd id="releaseDate" class="col-lg-10 col-9 p-0">
                                      ${releaseDate}
                                    </dd>
                                    <dt class="col-lg-2 col-3 text-body-tertiary">평점</dt>
                                    <dd id="voteAverage" class="col-lg-10 col-9 p-0">
                                      ${voteAverage}
                                    </dd>
                                    <dt class="col-lg-2 col-3 text-body-tertiary">장르</dt>
                                    <dd id="genres" class="col-lg-10 col-9 p-0">
                                      ${genres}
                                    </dd>
                                    <dt class="col-lg-2 col-3 text-body-tertiary">인기</dt>
                                    <dd id="popularity" class="col-lg-10 col-9 p-0">${popularity}</dd>
                                    <dt class="col-lg-2 col-3 text-body-tertiary">국가</dt>
                                    <dd id="country" class="col-lg-10 col-9 p-0">${country}</dd>
                                    <dt class="col-lg-2 col-3 text-body-tertiary">
                                      러닝타임
                                    </dt>
                                    <dd id="runtime" class="col-lg-10 col-8 p-0">${runtime}분</dd>
                                  </dl>
                                </div>
                              </div>
                            </div>`;

  return movieBasicsHtml;
}

function setMovieDetailsHtml(url) {
  axios
    .get(url)
    .then(async (response) => {
      const movie = response.data;
      const overview = movie.overview;
      console.log(movie);
      const movieBasics = document.querySelector("#movieBasics");
      const basicInfo = document.querySelector("#basicInfo");
      movieBasics.innerHTML = await getMovieDetailsHtml(movie);
      basicInfo.innerText = overview;
    })
    .catch((error) => {
      console.log(error);
    });
}

async function getCountry(movie) {
  try {
    const countriesCode = movie.production_countries.map(
      (country) => country.iso_3166_1
    );
    const countries = await axios.get(COUNTRIES_URL);
    let country = "";
    for (let i = 0; i < countriesCode.length; i++) {
      country += countries.data.filter(
        (country) => country.iso_3166_1 === countriesCode[i]
      )[0].native_name;
    }
    return country;
  } catch (error) {
    console.error(error);
  }
  // const countries = await getCountries();
}

function onYouTubeIframeAPIReady() {
  const player = new YT.Player("player", {
    height: "360",
    width: "640",
    videoId: "M7lc1UVf-VE",
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
}

function onPlayerReady(event) {
  event.target.playVideo();
}

function onPlayerStateChange(event) {
  let don = false;
  if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(stopVideo, 6000);
    done = true;
  }
}

function stopVideo() {
  player.stopVideo();
}
