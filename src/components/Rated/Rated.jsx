import React from 'react';
import PropTypes from 'prop-types';

import Footer from '../Footer';
import Card from '../Card';

const setPage = (key) => key;

const Rated = ({ data, totalPages }) => {
  const elements = data.map((item) => {
    const { id, title, overview, date, img, genre, vote } = item;
		let posterUrl = '';
    if (img) posterUrl = img;
    return (
      <Card
					key={id}
          flag={1}
          vote={vote}
					title={title}
					genre={genre}
					overview={overview}
					date={date}
					posterUrl={posterUrl}
				/>
    );
  });
  return (
    <div className="main">
      {elements}
      <Footer
        setPage={setPage}
        totalPages={totalPages}
      />
    </div>
  );
};

Rated.defaultProps = {
  data: [0],
  totalPages: 0,
};

Rated.propTypes = {
  data: PropTypes.arrayOf(PropTypes.arrayOf),
  totalPages: PropTypes.number,
};

export default Rated;