import { reset } from '../actions/reducer.js';
import initGame from '../asteredux/initgame.js';

const template_ship = () => ({
    tags: ['ship', 'player', 'player1'],
    size: 20,
    position: {x: 320, y: 320},
    id: -1,
    onCollision: [{
        tags: ['asteroid', 'bullet'],
        cb: (ship, victim, QueueAction) => {
            QueueAction(reset());
            initGame(QueueAction);
        },
    }],
});

export default template_ship;
