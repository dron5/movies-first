import React from 'react';

import Footer from '../Footer';

const setPage = (key) => console.log(key);
const totalPages = 3;

const Rated = () => (
  <div className="main">
    Rated content
    <Footer
      setPage={setPage}
      totalPages={totalPages}
    />
  </div>
);

export default Rated;