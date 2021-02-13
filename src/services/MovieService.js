/* eslint-disable consistent-return */
/* eslint-disable no-return-await */
/* eslint-disable no-underscore-dangle */
export default class MovieService {
  _apiBase = "https://api.themoviedb.org/3/";

  _apiKey = "api_key=28b85740a1eab5e0a5b2afffc6bc4915";

  _apiSearch = "search/movie?";

  _posterBaseUrl = "http://image.tmdb.org/t/p/w185";

  _getGuestSessionId = "authentication/guest_session/new?";

  rateMovie = async (args) => {
    const { num, id, guestId } = args;
    let body = { value: num };
    body = JSON.stringify(body);
    await this.baseRequest(
      `${this._apiBase}movie/${id}/rating?${this._apiKey}&guest_session_id=${guestId}`,
      'POST',
      body);
  };

  async getSessionId() {
    const answer = await this.baseRequest(
      `${this._apiBase}${this._getGuestSessionId}${this._apiKey}`
    ).catch(() => {
      throw new Error("Not sessionId cos Fucking error");
    });
    return answer;
  }

   async baseRequest(url, method="GET", body) {
     const answer = await fetch(url, {
       method,
       headers: {
         "Content-Type": "application/json;charset=utf-8"
       },
       body
     }      
    );
    if (!answer.ok) {
      throw new Error(
        `Could not fetch... ${url}, received ${answer.status}`
      );
    }
    return answer.json();
  }

  getMovieParam(movies) {
    const moviesData = [];
    if (movies.results) {
      movies.results.forEach((el) => {
        moviesData.push({
          id: el.id,
          title: el.title,
          img: el.poster_path,
          overview: el.overview,
          genre: el.genre_ids,
          date: el.release_date,
          vote: el.vote_average,
          rating: el.rating,
        });
      });
    }
    const data = {
      results: moviesData,
      total_pages: movies.total_pages,
      page: movies.page,
    };
    return data;
  }

  async getGenres() {
    const genres = await this.baseRequest(
      // "https://api.themoviedb.org/3/genre/movie/list?api_key=28b85740a1eab5e0a5b2afffc6bc4915"
      `${this._apiBase}genre/movie/list?${this._apiKey}`
    );
    return genres;
  }
  
  async getRatedMovies() {
    if (!("guestId" in sessionStorage)) {
      await this.getSessionId();
    }
    const guestId = JSON.parse(sessionStorage.getItem('guestId')); 
    const ratedsMovies = await this.baseRequest(
      `${this._apiBase}guest_session/${guestId}/rated/movies?${this._apiKey}`
    );
    return this.getMovieParam(ratedsMovies);
  }

  async getMoviesList(args) {
    const { param, page } = args;
    const movies = await this.baseRequest(
      `${this._apiBase}${this._apiSearch}${this._apiKey}&query=${param}&page=${page}`
    );
    return this.getMovieParam(movies);
  }
}
