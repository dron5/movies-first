/* eslint-disable no-return-await */
/* eslint-disable no-underscore-dangle */
export default class MovieService {
  _apiBase = "https://api.themoviedb.org/3/";

  _apiGenres = "genre/movie/list?";

  _apiKey = "api_key=28b85740a1eab5e0a5b2afffc6bc4915";

  _apiSearch = "search/movie?";

  _posterBaseUrl = "http://image.tmdb.org/t/p/w185";

  _getGuestSessionId = "authentication/guest_session/new?";

  rateMovie = async (voteNum, movieId, GSId) => {
    let json = { value: voteNum };
    json = JSON.stringify(json);
    await fetch(
      `${this._apiBase}movie/${movieId}/rating?${this._apiKey}&guest_session_id=${GSId}`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: json,
      }
    );
  };

  async getSessionId() {
    const answer = await fetch(
      `${this._apiBase}${this._getGuestSessionId}${this._apiKey}`
    ).catch(() => {
      throw new Error("Not sessionId cos Fucking error");
    });
    return await answer.json();
  }

  async getRatedMovies(id) {
    const rateds = await fetch(
      `${this._apiBase}guest_session/${id}/rated/movies?${this._apiKey}`
    );
    return await rateds.json();
  }

  async baseRequest(apiName, params = "") {
    const answer = await fetch(
      `${this._apiBase}${apiName}${this._apiKey}${params}`
    );
    if (!answer.ok) {
      throw new Error(
        `Could not fetch... ${apiName}, received ${answer.status}`
      );
    }
    return await answer.json();
  }

  getMovieParam(movies) {
    const moviesData = [];
    movies.results.forEach((el) => {
      moviesData.push({
        id: el.id,
        title: el.title,
        img: el.poster_path,
        overview: el.overview,
        genre: el.genre_ids,
        date: el.release_date,
        vote: el.vote_average,
      });
    });
    const data = {
      results: moviesData,
      total_pages: movies.total_pages,
      page: movies.page,
    };
    return data;
  }

  async getGenres() {
    const genres = await this.baseRequest(this._apiGenres);
    return genres;
  }

  async getMoviesList(param, page = 1) {
    const movies = await this.baseRequest(
      this._apiSearch,
      `&query=${param}&page=${page}`
    );
    const ids = this.getMovieParam(movies);
    return ids;
  }
}
