import React from 'react';
import PropTypes from 'prop-types';

import Genres from '../Genres';

import './Card.css';

const Card  = ({title, overview, date, posterUrl, genre})  => (

	<div className="card">
		<div className="img">
			<img src={`http://image.tmdb.org/t/p/w185${posterUrl}`}
						alt="poster"
			/>
		</div>
		<div className="content">
			<div className="title">{ title }</div>
			<div>{ date }</div>
			<Genres genre={genre}/>
			<p>{ overview }</p>
		</div>
	</div>

    );

Card.defaultProps = {
	genre: [10770],
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
	posterUrl: PropTypes.string.isRequired,
	genre: PropTypes.arrayOf(PropTypes.number),
  
};

export default Card;