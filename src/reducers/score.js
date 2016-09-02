const score = (state = 0, action) => (action.type == 'add_score')
    ? state + action.score
    : state;

export default score;
