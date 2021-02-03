const voteClassSetter = (voteNum) => {
  let className = "";
  if (voteNum >= 0 && voteNum < 3) className = "red";
  if (voteNum >= 3 && voteNum < 5) className = "orange";
  if (voteNum >= 5 && voteNum < 7) className = "yellow";
  if (voteNum >= 7) className = "green";
  return className;
};

const setToStorage = (paramName, paramValue) => {
  sessionStorage.setItem(paramName, JSON.stringify(paramValue));
};

const getFromStorage = (paramName) =>
  JSON.parse(sessionStorage.getItem(paramName));

export { voteClassSetter, setToStorage, getFromStorage };
