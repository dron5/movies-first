/* eslint-disable import/prefer-default-export */
const voteClassSetter = (voteNum) => {
  let className = '';
  if (voteNum >= 0 && voteNum < 3) className = "firstColor";
  if (voteNum >= 3 && voteNum < 5) className = "secondColor";
  if (voteNum >= 5 && voteNum < 7) className = "thirdColor";
  if (voteNum >= 7) className = "fourthColor";
  return className;
};

export { voteClassSetter };
