/* eslint-disable no-return-await */
/* eslint-disable no-underscore-dangle */
export default class  MovieService {

	_apiBase = 'https://api.themoviedb.org/3/';
	
	_apiGenres = 'genre/movie/list?';

	_apiKey = 'api_key=28b85740a1eab5e0a5b2afffc6bc4915';

	_apiSearch = 'search/movie?';
	
	_posterBaseUrl = 'http://image.tmdb.org/t/p/w185';

	async getMovies(url) {
		const answer =
			await fetch(`${this._apiBase}${this._apiSearch}${this._apiKey}${url}`);

		if (!answer.ok) {
			throw new Error(`Could not fetch... ${url}` +
			`, received ${answer.status}`);
		}
		return await answer.json();
	}

	getMovieParam (movies) {
		const moviesData = [];
		movies.results.forEach((el) => {
			moviesData.push({id: el.id, title: el.title,
				img: el.poster_path, overview: el.overview,
				genre: el.genre_ids, date: el.release_date,
				vote: el.vote_average});
		});
		const data = {
			results: moviesData,
			total_pages: movies.total_pages,
			page: movies.page,
		};
		return data;
	}

	async getMoviesData(param, page=1) {
		const movies = await this.getMovies(`&query=${param}&page=${page}`);
		const ids = this.getMovieParam(movies);
		return ids;
	}
}
