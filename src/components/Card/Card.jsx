import React from 'react';
import PropTypes from 'prop-types';

import Genres from '../Genres';

import './Card.css';

const Card  = ({title, overview, date, posterUrl})  => (

	<div className="card">
		<div className="img">
			<img src={`http://image.tmdb.org/t/p/w185${posterUrl}`}
						alt="poster"
			/>
		</div>
		<div className="content">
			<div className="title">{ title }</div>
			<div>{ date }</div>
			{/* <div className="genre">{ 'button1' } { 'button2' }</div> */}
			<Genres />
			<p>{ overview }</p>
		</div>
	</div>

    );

export default Card;

Card.propTypes = {
  title: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  posterUrl: PropTypes.string.isRequired,
  
};