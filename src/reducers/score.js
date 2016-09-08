const score = (state = 0, action) => (action.type == 'add-score')
    ? state + action.score
    : state;

export default score;
