const voteClassSetter = (voteNum) => {
  let className = "";
  if (voteNum >= 0 && voteNum < 3) className = "red";
  if (voteNum >= 3 && voteNum < 5) className = "orange";
  if (voteNum >= 5 && voteNum < 7) className = "yellow";
  if (voteNum >= 7) className = "green";
  return className;
};

const setToStorage = (paramName, paramValue) => {
  sessionStorage.setItem(paramName, JSON.stringify(paramValue));
};

const getFromStorage = (paramName) =>
  JSON.parse(sessionStorage.getItem(paramName));

function setSessionStorage(genreList) {
    if ("genres" in sessionStorage) return;
    const genres = { 0: "No genre" };
    genreList.forEach((el) => {
      genres[el.id.toString()] = el.name;
    });
    setToStorage("genres", genres);
  };

function searchGenres() {
    this.movie.getGenres().then((body) => {
      this.setSessionStorage(body.genres);
    });
  };

function onChangeTab(activeTab) {
    this.setState({ activeTab });
    if (activeTab === 'Search') {
      setToStorage('currentTab', 'Search');
    }else setToStorage('currentTab', 'Rated');
  };

function setWord (name) {
    const word = name.trim();
    if (!word) return;
    this.setState({
      word,
    });
    this.searchMovie(word);
  };

function setPage(page) {
    const { word } = this.state;
    this.searchMovie(word, page);
  };

function onError(message) {
    this.setState({
      error: true,
      errMessage: message,
      loading: false,
      totalPages: 0,
    });
  }; 

function setGuestId() {
    if (getFromStorage("guestId") === null) {
      this.movie.getSessionId().then((body) => {
        this.setState({
          guestId: body.guest_session_id,
        });
        setToStorage("guestId", body.guest_session_id);
      });
    } else {
      this.setState({
        guestId: getFromStorage("guestId"),
      });
    }
  };

function getRated() {
    const guestId = getFromStorage("guestId");
    this.movie.getRatedMovies(guestId)
      .then(result => {
      this.setState({
            data: result.results,
            totalPages: result.totalPages,
            loading: false,
            error: false,
          });
        });
  };


function searchMovie(param = 'return', page = 1) {
    const guestId = getFromStorage("guestId");
    this.movie.getMoviesList(param, page).then((movies) => {
      if (movies.results.length === 0) {
        throw new Error("По вашему запросу ничего не найдено!!!");
      };
      return movies;
    })
      .then(movies => {
        this.movie.getRatedMovies(guestId)
          .then(rated => {
            const dataMovies = movies.results.reduce((acc, elem) => {
              let movie = elem;
              rated.results.forEach((el)=>{
                if (el.id === movie.id){
                  movie = el;
                }
              });
              acc.push(movie);
              return acc;
            }, []);
            this.setState({
              data: dataMovies,
              loading: false,
              error: false,
              totalPages: movies.total_pages,
            });
          });
      })
      .catch (error=> this.onError(error.message));
  };

export {
  voteClassSetter,  setToStorage, searchGenres,
  getFromStorage, setWord, setPage, searchMovie,
  onChangeTab, setGuestId, onError, getRated, setSessionStorage
};
