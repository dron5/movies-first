import React from 'react';
import PropTypes from 'prop-types';

import Footer from '../Footer';
import Card from '../Card';

const Rated = ({ data, totalPages }) => {
  const elements = data.map((item) => {
    const { id, title, overview, date, img, genre, vote, rating } = item;
    return (
      <Card
					key={id}
          flag={1}
          vote={vote}
          rating={rating}
					title={title}
					genre={genre}
					overview={overview}
					date={date}
					posterUrl={img || ''}
				/>
    );
  });
  return (
    <div className="main">
      {elements}
      {totalPages > 2 && <Footer
        // setPage
        totalPages={totalPages}
        showSizeChanger={false}
      />}
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