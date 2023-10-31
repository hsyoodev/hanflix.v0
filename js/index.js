const API_KEY = "a5e43f90a600330cd1cca3a7adb9d067";
const MOVIE_BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const PLACEHOLDER_IMAGE_URL = "https://via.placeholder.com/240x357";
const QUERY_PARAMS = "&language=ko-KR&page=1&region=KR";
const POPULAR_URL = `${MOVIE_BASE_URL}/movie/popular?api_key=${API_KEY}${QUERY_PARAMS}`;
const NOW_PLAYING_URL = `${MOVIE_BASE_URL}/movie/now_playing?api_key=${API_KEY}${QUERY_PARAMS}`;
const UPCOMING_URL = `${MOVIE_BASE_URL}/movie/upcoming?api_key=${API_KEY}${QUERY_PARAMS}`;

let count1 = 0;

window.onload = () => {
  setMovieLis1And2tHtml(POPULAR_URL);
  setMovieLis3tHtml(NOW_PLAYING_URL);
  setMovieLis4tHtml(UPCOMING_URL);
};

function setMovieLis1And2tHtml(url) {
  const movieList11 = document.querySelector("#movieList11");
  const movieList12 = document.querySelector("#movieList12");
  const movieList13 = document.querySelector("#movieList13");
  const movieList21 = document.querySelector("#movieList21");
  const movieList22 = document.querySelector("#movieList22");
  const movieList23 = document.querySelector("#movieList23");

  axios
    .get(url)
    .then((response) => {
      const movies = response.data.results;

      for (let i = 0; i < 5; i++) {
        const movie = movies[i];
        const id = movie.id;
        const posterPath = movie.poster_path;
        const imgSrc =
          posterPath === null
            ? PLACEHOLDER_IMAGE_URL
            : `${IMAGE_BASE_URL}/${posterPath}`;
        movieList11.innerHTML += `<a class="card" style="width: 18rem" href="./movies/details.html?id=${id}">
                                    <img
                                      src="${imgSrc}"
                                      class="card-img-top"
                                      alt="Movie Poster"
                                    />
                                  </a>`;
        movieList21.innerHTML += `<a class="card" style="width: 18rem" href="./movies/details.html?id=${id}">
                                    <img
                                      src="${imgSrc}"
                                      class="card-img-top"
                                      alt="Movie Poster"
                                    />
                                  </a>`;
      }
      for (let i = 5; i < 10; i++) {
        const movie = movies[i];
        const id = movie.id;
        const posterPath = movie.poster_path;
        const imgSrc =
          posterPath === null
            ? PLACEHOLDER_IMAGE_URL
            : `${IMAGE_BASE_URL}/${posterPath}`;
        movieList12.innerHTML += `<a class="card" style="width: 18rem" href="./movies/details.html?id=${id}">
        <img
          src="${imgSrc}"
          class="card-img-top"
          alt="Movie Poster"
        />
      </a>`;
        movieList22.innerHTML += `<a class="card" style="width: 18rem" href="./movies/details.html?id=${id}">
                                    <img
                                      src="${imgSrc}"
                                      class="card-img-top"
                                      alt="Movie Poster"
                                    />
                                  </a>`;
      }
      for (let i = 10; i < 15; i++) {
        const movie = movies[i];
        const id = movie.id;
        const posterPath = movie.poster_path;
        const imgSrc =
          posterPath === null
            ? PLACEHOLDER_IMAGE_URL
            : `${IMAGE_BASE_URL}/${posterPath}`;
        movieList13.innerHTML += `<a class="card" style="width: 18rem" href="./movies/details.html?id=${id}">
        <img
          src="${imgSrc}"
          class="card-img-top"
          alt="Movie Poster"
        />
      </a>`;
        movieList23.innerHTML += `<a class="card" style="width: 18rem" href="./movies/details.html?id=${id}">
                                    <img
                                      src="${imgSrc}"
                                      class="card-img-top"
                                      alt="Movie Poster"
                                    />
                                  </a>`;
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function setMovieLis3tHtml(url) {
  const movieList31 = document.querySelector("#movieList31");
  const movieList32 = document.querySelector("#movieList32");
  const movieList33 = document.querySelector("#movieList33");

  axios
    .get(url)
    .then((response) => {
      const movies = response.data.results;

      for (let i = 0; i < 5; i++) {
        const movie = movies[i];
        const id = movie.id;
        const posterPath = movie.poster_path;
        const imgSrc =
          posterPath === null
            ? PLACEHOLDER_IMAGE_URL
            : `${IMAGE_BASE_URL}/${posterPath}`;
        movieList31.innerHTML += `<a class="card" style="width: 18rem" href="./movies/details.html?id=${id}">
                                    <img
                                      src="${imgSrc}"
                                      class="card-img-top"
                                      alt="Movie Poster"
                                    />
                                  </a>`;
      }
      for (let i = 5; i < 10; i++) {
        const movie = movies[i];
        const id = movie.id;
        const posterPath = movie.poster_path;
        const imgSrc =
          posterPath === null
            ? PLACEHOLDER_IMAGE_URL
            : `${IMAGE_BASE_URL}/${posterPath}`;
        movieList32.innerHTML += `<a class="card" style="width: 18rem" href="./movies/details.html?id=${id}">
        <img
          src="${imgSrc}"
          class="card-img-top"
          alt="Movie Poster"
        />
      </a>`;
      }
      for (let i = 10; i < 15; i++) {
        const movie = movies[i];
        const id = movie.id;
        const posterPath = movie.poster_path;
        const imgSrc =
          posterPath === null
            ? PLACEHOLDER_IMAGE_URL
            : `${IMAGE_BASE_URL}/${posterPath}`;
        movieList33.innerHTML += `<a class="card" style="width: 18rem" href="./movies/details.html?id=${id}">
        <img
          src="${imgSrc}"
          class="card-img-top"
          alt="Movie Poster"
        />
      </a>`;
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function setMovieLis4tHtml(url) {
  const movieList41 = document.querySelector("#movieList41");
  const movieList42 = document.querySelector("#movieList42");
  const movieList43 = document.querySelector("#movieList43");

  axios
    .get(url)
    .then((response) => {
      const movies = response.data.results;

      for (let i = 0; i < 5; i++) {
        const movie = movies[i];
        const id = movie.id;
        const posterPath = movie.poster_path;
        const imgSrc =
          posterPath === null
            ? PLACEHOLDER_IMAGE_URL
            : `${IMAGE_BASE_URL}/${posterPath}`;
        movieList41.innerHTML += `<a class="card" style="width: 18rem" href="./movies/details.html?id=${id}">
                                    <img
                                      src="${imgSrc}"
                                      class="card-img-top"
                                      alt="Movie Poster"
                                    />
                                  </a>`;
      }
      for (let i = 5; i < 10; i++) {
        const movie = movies[i];
        const id = movie.id;
        const posterPath = movie.poster_path;
        const imgSrc =
          posterPath === null
            ? PLACEHOLDER_IMAGE_URL
            : `${IMAGE_BASE_URL}/${posterPath}`;
        movieList42.innerHTML += `<a class="card" style="width: 18rem" href="./movies/details.html?id=${id}">
        <img
          src="${imgSrc}"
          class="card-img-top"
          alt="Movie Poster"
        />
      </a>`;
      }
      for (let i = 10; i < 15; i++) {
        const movie = movies[i];
        const id = movie.id;
        const posterPath = movie.poster_path;
        const imgSrc =
          posterPath === null
            ? PLACEHOLDER_IMAGE_URL
            : `${IMAGE_BASE_URL}/${posterPath}`;
        movieList43.innerHTML += `<a class="card" style="width: 18rem" href="./movies/details.html?id=${id}">
        <img
          src="${imgSrc}"
          class="card-img-top"
          alt="Movie Poster"
        />
      </a>`;
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function onYouTubePlayerAPIReady() {
  new YT.Player("player", {
    videoId: "YZTpiZS91BM",
    playerVars: {
      autoplay: true,
      loop: true,
      playlist: "YZTpiZS91BM",
      controls: 0,
    },
    events: {
      onReady: function (event) {
        const player = document.querySelector("#player");
        player.classList.remove("placeholder");
        event.target.mute();
        event.target.setPlaybackQuality("highres");
      },
      onStateChange: function (event) {
        if (event.data === YT.PlayerState.PLAYING) {
          const player = document.querySelector("#player");
          // const title = document.querySelector(".ytp-title");
          // const topButtons = document.querySelector(".ytp-chrome-top-buttons");
          // const sesstionLink = document.querySelector(".yt-uix-sessionlink");
          // console.log(title);
        }
      },
    },
  });
}
