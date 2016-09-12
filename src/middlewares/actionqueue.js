const actionQueue = store => next => action => {
    let queue = [];
    let result = next({...action, QueueAction: (action) => queue.push(action)});
    queue.forEach(store.dispatch);

    return result;
};

export default actionQueue;
