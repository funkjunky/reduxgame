const template_ship = () => ({
    tags: ['ship', 'player', 'player1'],
    size: 20,
    position: {x: 320, y: 320},
    id: -1,
    onCollision: [{
        tags: ['asteroid', 'bullet'],
        cb: () => {
            store.dispatch(reset());
        },
    }],
});

export default template_ship;
