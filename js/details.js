const urlParams = new URL(location.href).searchParams;
const id = urlParams.get("id");

const API_KEY = "a5e43f90a600330cd1cca3a7adb9d067";
const MOVIE_BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const LANGUAGE = "&language=ko-KR";
const PLACEHOLDER_IMAGE_URL = "https://via.placeholder.com/240x357";
const DETAILS_URL = `${MOVIE_BASE_URL}/movie/${id}?api_key=${API_KEY}${LANGUAGE}`;
const COUNTRIES_URL = `${MOVIE_BASE_URL}/configuration/countries?api_key=${API_KEY}${LANGUAGE}`;

window.onload = () => {
  setMovieDetailsHtml(DETAILS_URL);
};

async function setMovieDetailsHtml(url) {
  const basicInformation = document.querySelector("#basicInformation");
  const keyInformation = document.querySelector("#keyInformation");
  const outlineTitle = document.querySelector("#outlineTitle");

  axios
    .get(url)
    .then(async (response) => {
      const movie = response.data;
      outlineTitle.innerText = movie.title;
      basicInformation.innerHTML = await getBasicInformationHtml(movie);
      basicInformation.classList.add("row");
      keyInformation.innerHTML = getKeyInformationHtml(movie);
    })
    .catch((error) => {
      const message = error.message;
      basicInformation.innerHTML = "";
      keyInformation.innerHTML = getErrorHtml(message);
    });
}

async function getBasicInformationHtml(movie) {
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
  const basicInformationHtml = `<div class="col-xl-3 col-lg-3 col-md-4 col-sm-5 col-12">
                              <img
                                src="${imgSrc}"
                                class="img-fluid rounded w-100"
                                alt="Movie Poster"
                              />
                            </div>
                            <div class="col-xl-9 col-lg-9 col-md-8 col-sm-7 col-12">
                              <div class="card-body p-0 ps-3 pt-3">
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
                                    <dd class="col-lg-10 col-9 p-0">
                                      ${releaseDate || "-"}
                                    </dd>
                                    <dt class="col-lg-2 col-3 text-body-tertiary">평점</dt>
                                    <dd class="col-lg-10 col-9 p-0">
                                      ${voteAverage}
                                    </dd>
                                    <dt class="col-lg-2 col-3 text-body-tertiary">장르</dt>
                                    <dd class="col-lg-10 col-9 p-0">
                                      ${genres}
                                    </dd>
                                    <dt class="col-lg-2 col-3 text-body-tertiary">인기</dt>
                                    <dd class="col-lg-10 col-9 p-0">${popularity}</dd>
                                    <dt class="col-lg-2 col-3 text-body-tertiary">국가</dt>
                                    <dd class="col-lg-10 col-9 p-0">${country}</dd>
                                    <dt class="col-lg-2 col-3 text-body-tertiary">
                                      러닝타임
                                    </dt>
                                    <dd class="col-lg-10 col-8 p-0">${runtime}분</dd>
                                  </dl>
                                </div>
                              </div>
                            </div>`;

  return basicInformationHtml;
}

function getKeyInformationHtml(movie) {
  const overview = movie.overview;
  const keyInformationHtml = `<p>${overview || "-"}</p>`;
  return keyInformationHtml;
}

async function getCountry(movie) {
  const keyInformation = document.querySelector("#keyInformation");

  try {
    const productionCountries = movie.production_countries;
    const countries = await axios.get(COUNTRIES_URL);

    let nativeNames = [];
    for (let i = 0; i < productionCountries.length; i++) {
      nativeNames.push(
        countries.data.filter(
          (country) => country.iso_3166_1 === productionCountries[i].iso_3166_1
        )[0].native_name
      );
    }
    const country = nativeNames.join("/");
    return country;
  } catch (error) {
    throw new Error(error);
  }
}

function getErrorHtml(message) {
  const errorHtml = `<div class="col text-nowrap text-danger fw-bold">
                          <span>${message}</span>
                        </div>`;
  return errorHtml;
}
