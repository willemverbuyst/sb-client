const getScoresContants = (score) => {
  switch (score) {
    case 'fullScore':
      return 1;
    case 'goalBonus':
      return 2;
    case 'totoScore':
      return 5;
    default:
      return 0;
  }
};

module.exports = getScoresContants;
