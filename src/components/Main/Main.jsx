/* eslint-disable react/jsx-fragments */
import React, { Component, Fragment } from 'react';

import MovieService from '../../services/MovieService';

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
		const value = name.trim();
		if (!value) return;
		this.setState({
			word: value,
		});
		const { word } = this.state;
		this.searchMovie(word);
	}

	setPage = (page) => {
		const { word } = this.state;
		this.searchMovie(word, page);
	}

	onError = () => {
		this.setState({
			error: true,
			loading: false
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
				if (body.length === 0) {
					throw new Error("Ошибка!!!");
				}
				this.setState({
					data: body.results,
					loading: false,
					error: false,
					totalPages: body.total_pages,
				});
			})
			.catch(this.onError);
	}
	
	render () {
		const { data, loading, error, totalPages } = this.state;
		const elements = data.map((item) => {
			const { id, title, overview, date, img, genre } = item;
			let posterUrl = '';
			if (img) posterUrl = img;
			return(
				<Card
					key={id}
					title={title}
					genre={genre}
					overview={overview}
					date={date}
					posterUrl={posterUrl}
				/>
			);
		});
		const movies = <Fragment>{elements}</Fragment>;
		const hasData = !(loading || error);

		const errorMessage = error ? <AlertMessage /> : null;
		const spinner = loading ? <Spinner /> : null;
		const cards = hasData ? movies : null;

		return (
			<div className="main">
				<Header setWord={this.setWord}/>
				{spinner}
				{cards}
				{errorMessage}
				<Footer setPage={this.setPage} totalPages={totalPages}/>
			</div>
		);
	};
}
