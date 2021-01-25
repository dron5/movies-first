import React, { Component } from 'react';

import MovieService from '../../services/MovieService';
import { MovieServiceConsumer } from '../MovieServiceContext';

import AlertMessage from '../AlertMessage';
import Card from '../Card';
import Spinner from '../Spinner';
import Header from '../Header';
import Footer from '../Footer';

import 'antd/dist/antd.css';

import './Main.css';

export default class Main extends Component{

	movie = new MovieService();

	state = {
		data: [],
		loading: true,
		error: false,
		errMessage: '',
		totalPages: 0,
		word: 'return',
	}

	componentDidMount() {
		const { word } = this.state;
		this.searchGenres();
		this.searchMovie(word);
	}

	componentDidUpdate(prevProps, prevState) {
		const { word } = this.state;
		if (word !== prevState.word) this.searchMovie(word);
	}
	
	setWord = (name) => {
		const word = name.trim();
		if (!word) return;
		this.setState({
			word,
		});
		this.searchMovie(word);
	}

	setPage = (page) => {
		const { word } = this.state;
		this.searchMovie(word, page);
	}

	onError = (message) => {
		this.setState({
			error: true,
			errMessage: message,
			loading: false,
			totalPages: 0,
		});
	}

	setSessionStorage = (genreList) => {
		if ('genres' in sessionStorage) return;
		const genres = {'0': 'No genre'};
		genreList.forEach((el) => {
			genres[el.id.toString()] = el.name;
		});
		sessionStorage.setItem('genres', JSON.stringify(genres));
	}

	searchGenres = () => {
		this.movie
			.getGenres()
			.then((body) => {
				this.setSessionStorage(body.genres);
			});
	}

	searchMovie = (param,page=1) => {
		this.movie
			.getMoviesData(param, page)
			.then((body) => {
				if (body.results.length === 0) {
					throw new Error("По вашему запросу ничего не найдено!!!");
				}
				this.setState({
					data: body.results,
					loading: false,
					error: false,
					totalPages: body.total_pages,
				});
			})
			.catch((err) => this.onError(err.message));
	}
	
	render () {
		const { data, loading, error, totalPages, errMessage } = this.state;
		const elements = data.map((item) => {
			const { id, title, overview, date, img, genre, vote } = item;
			let posterUrl = '';
			if (img) posterUrl = img;
			return (
				<MovieServiceConsumer key={id}>
					{(guestId) =>  (
						<Card
							id={id}
							vote={vote}
							guestId={guestId}
							title={title}
							genre={genre}
							overview={overview}
							date={date === undefined ? '' : date}
							posterUrl={posterUrl}
						/>
					)	}
				</MovieServiceConsumer>	
			);
		});

		return (
			<div className="main">
				<Header setWord={this.setWord}/>
				{loading && <Spinner />}
				{error && <AlertMessage message={errMessage} />}
				{!(loading || error) && elements}
				{totalPages > 2 && <Footer setPage={this.setPage} totalPages={totalPages} />}
			</div>
		);	
	};
}
