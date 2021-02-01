/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-prop-types */
// /* eslint-disable no-debugger */
import React from "react";
import PropTypes from "prop-types";

import Footer from "../Footer";
import Card from "../Card";

const Rated = ({ data, totalPages, guestId }) => {
  console.log(data);
  const elements = data.map((item) => {
    const { id, title, overview, date, img,
      genre, vote, rating } = item;
    return (
      <Card
        key={id}
        id={id}
        flag={1}
        vote={vote}
        rating={rating}
        title={title}
        genre={genre}
        overview={overview}
        guestId={guestId}
        date={date === undefined ? "" : date}
        posterUrl={img || ""}
      />
    );
  });
  return (
    <div className="main">
      {elements}
      {totalPages > 2 && (
        <Footer totalPages={totalPages} showSizeChanger={false} />
      )}
    </div>
  );
};

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

Rated.defaultProps = {
  data: [0],
  totalPages: 0,
};

Rated.propTypes = {
  data: PropTypes.arrayOf(PropTypes.arrayOf),
  totalPages: PropTypes.number,
  guestId: PropTypes.string.isRequired,
};

export default Rated;
