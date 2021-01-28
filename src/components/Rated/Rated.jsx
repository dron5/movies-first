/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-prop-types */
// import React, { Component } from 'react';
import React from 'react';
import PropTypes from 'prop-types';

import Footer from '../Footer';
import Card from '../Card';

// export default class Rated extends Component{
//   constructor(props) {
//     super(props);
//     this.state = {
//       data: [],
//       totalPages: null,
//     };
//   }

//   static getDerivedStateFromProps(nextProps, prevState) {
//     if (prevState.data !== nextProps.data) {
//       return {
//         data: nextProps.data,
//         totalPages: nextProps.totalPages,
//       };
//     }
//     return null;
//   }

//   render() {
//     const { data, totalPages } = this.state;
//     const elements = data.map((item) => {
//     const { id, title, overview, date, img, genre, vote, rating } = item;
//     return (
//       <Card
// 					key={id}
//           flag={1}
//           vote={vote}
//           rating={rating}
// 					title={title}
// 					genre={genre}
// 					overview={overview}
// 					date={date}
// 					posterUrl={img || ''}
// 				/>
//     );
//   });
//   return (
//     <div className="main">
//       {elements}
//       {totalPages > 2 && <Footer
//         totalPages={totalPages}
//         showSizeChanger={false}
//       />}
//     </div>
//   );
//   };
// }

const Rated = ({ data, totalPages }) => {
  const elements = data.map((item) => {
    const {
      id, title, overview, date, img, genre, vote, rating
    } = item;
    console.log('in Rated title : --', title, 'rating :', rating);
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