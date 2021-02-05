import React from "react";
import PropTypes from "prop-types";

import { MovieServiceConsumer } from "../MovieServiceContext";

import AlertMessage from "../AlertMessage";
import Card from "../Card";
import Spinner from "../Spinner";
import Header from "../Header";
import Footer from "../Footer";

import "./CardList.css";
  
const CardList = ({
  data, loading, errMessage, activeTab,
  totalPages, setPage, setWord, error
}) => {
  const elements = data.map((item) => {
    const { id, title, overview, date, img, genre, vote, rating } = item;
    let posterUrl = "";
    if (img) posterUrl = img;
    
    return (
      <MovieServiceConsumer key={id}>
        {(guestId) => (
          <Card
            id={id}
            vote={vote}
            rating={rating}
            guestId={guestId}
            title={title}
            genre={genre}
            overview={overview}
            date={date === undefined ? "" : date}
            posterUrl={posterUrl}
            activeTab={activeTab}
          />
        )}
      </MovieServiceConsumer>
    );
  });

  return (
    <div className="card-list">
      {activeTab === "Search" && <Header setWord={setWord} />}
      {loading && <Spinner />}
      {error && <AlertMessage message={errMessage} />}
      {!(loading || error) && elements}
      {totalPages > 2 && (
        <Footer setPage={setPage} totalPages={totalPages} />
      )}
    </div>
  );
};

CardList.defaultProps = {
  totalPages: 0,
  loading: false,
  data: [],
  setPage: () => {},
  setWord: () => { },
  errMessage: '',
};

CardList.propTypes = {
  activeTab: PropTypes.string.isRequired,
  errMessage: PropTypes.string,
  totalPages: PropTypes.number,
  loading: PropTypes.bool,
  setPage: PropTypes.func,
  setWord: PropTypes.func,
  data: PropTypes.arrayOf(PropTypes.object),
  error: PropTypes.bool.isRequired,
};
export default CardList;
