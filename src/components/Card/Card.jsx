import React from 'react';
import PropTypes from 'prop-types';

import { Rate } from 'antd';

import MovieService from '../../services/MovieService';

import Genres from '../Genres';

import './Card.css';
import noposter from'./no-poster.jpg';

const movieService = new MovieService();

const { rateMovie } = movieService;

const Card = ({ title, overview, date, posterUrl, genre, id, guestId, vote, flag }) => {
	const basePosterUrl = 'http://image.tmdb.org/t/p/w185';
	let className = "";

	if (vote >= 0 && vote < 3) className = "firstColor";
	if (vote >= 3 && vote < 5) className = "secondColor";
	if (vote >= 5 && vote < 7) className = "thirdColor";
	if (vote >= 7) className = "fourthColor";

	return (
		<div className="card">
			<div className="img">
				<img src={ posterUrl? `${basePosterUrl}${posterUrl}`: noposter}
					alt="poster"
				/>
			</div>
			<div className="content">
				<div className="card_header">
					<div className="title">{title}</div>
					<div className={className}>{vote}</div>
				</div>
				<div>{date}</div>
				<Genres genre={genre} />
				<p>{overview}</p>
				<Rate
					allowHalf
					count={10}
					defaultValue={flag ? vote : 0}
					onChange={(num) => rateMovie(id, num, guestId)}
				/>
			</div>
		</div>

	);
};

Card.defaultProps = {
	genre: [0],
	id: 0,
	guestId: '',
	flag: 0,
};

Card.propTypes = {
	id: PropTypes.number,
  title: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
	posterUrl: PropTypes.string.isRequired,
	genre: PropTypes.arrayOf(PropTypes.number),
	guestId: PropTypes.string,
	vote: PropTypes.number.isRequired,
	flag: PropTypes.number,
};

export default Card;