const voteClassSetter = (voteNum) => {
  let className = '';
  if (voteNum >= 0 && voteNum < 3) className = "firstColor";
  if (voteNum >= 3 && voteNum < 5) className = "secondColor";
  if (voteNum >= 5 && voteNum < 7) className = "thirdColor";
  if (voteNum >= 7) className = "fourthColor";
  return className;
};

const setToStorage = (paramName, paramValue) => {
  sessionStorage.setItem(paramName, JSON.stringify(paramValue));
};

const getFromStorage = (paramName) =>
  JSON.parse(sessionStorage.getItem(paramName));

export {
  voteClassSetter,
  setToStorage, getFromStorage
};
