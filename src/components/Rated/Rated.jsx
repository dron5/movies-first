import React from 'react';
import PropTypes from 'prop-types';

import Footer from '../Footer';
import Card from '../Card';

const setPage = (key) => console.log(key);
const totalPages = 1;

const Rated = ({ data }) => {
  const elements = data.map((item) => {
    const { id, title, overview, date, img, genre } = item;
		let posterUrl = '';
    if (img) posterUrl = img;
    return (
      <Card
					key={id}
          id={id}
					title={title}
          guestId={" "}
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
};

Rated.propTypes = {
	data: PropTypes.arrayOf(PropTypes.arrayOf),
};

export default Rated;