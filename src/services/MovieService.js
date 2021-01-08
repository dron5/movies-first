/* eslint-disable no-return-await */
/* eslint-disable no-underscore-dangle */
export default class  MovieService {

	_apiBase = 'https://api.themoviedb.org/3/';
	
	_apiGenres = 'genre/movie/list?';

	_apiKey = 'api_key=28b85740a1eab5e0a5b2afffc6bc4915';

	_apiSearch = 'search/movie?';
	
	_posterBaseUrl = 'http://image.tmdb.org/t/p/w185';
	
	_getGuestSessionId = 'authentication/guest_session/new?';

	// _getSorted = `guest_session/${guestSessionId}/rated/movies?`;

	async getSessionId() {
		const answer =
			await fetch(`${this._apiBase}${this._getGuestSessionId}${this._apiKey}`)
			.catch(()=>console.log('Not sessionId cos Fucking error'));
		return await answer.json();
	}

	async getRatedMovies(id) {
		const rateds =
			await fetch(`${this._apiBase}guest_session/${id}/rated/movies?${this._apiKey}`)
			.catch(()=>console.log('Not rated movies cos Fucking error'));
		return await rateds.json();
	}

	async getData(url1,url2='') {
		const answer =
			await fetch(`${this._apiBase}${url1}${this._apiKey}${url2}`);
		if (!answer.ok) {
			throw new Error(`Could not fetch... ${url1}` +
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

	async getGenres() {
		const genres =
			await this.getData(this._apiGenres);
		return genres;
	};

	async getMoviesData(param, page=1) {
		const movies =
			await this.getData(this._apiSearch, `&query=${param}&page=${page}`);
		const ids = this.getMovieParam(movies);
		return ids;
	}
}
