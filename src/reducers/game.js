import { MAKE_MOVE, VANISH_MOVE, INIT_GAME, PLAY_AGAIN, RESET_GAME } from '../actions/types';


const initialState = {
    board: [null, null, null, null, null, null, null, null, null],
    players: ['X', 'O'],
    mode: 'PVP',//could be PVP or PVE,
    score: [0, 0],
    history: [],
    status: 'NOT_STARTED', // could be NOT_STARTED ON_GOING P1WON P2WON DRAW
    p1Turn: true
};

function gameReducer(state = initialState, action) {

    switch (action.type) {
        case INIT_GAME:
            return {
                ...state,
                mode: action.payload,
                status: 'ON_GOING',
                board: [null, null, null, null, null, null, null, null, null],
                players: ['X', 'O'],
                score: [0, 0],
                history: [],
                p1Turn: true
            };
        case MAKE_MOVE:
            return {
                ...state,
                board: action.payload.board,
                p1Turn: !state.p1Turn,
                score: action.payload.score,
                history: [...state.history, action.payload.index],
                status: action.payload.status

            };
        case VANISH_MOVE:
            return {
                ...state,
                board: state.board.map((cell, i) => action.payload === i ? null : cell),
                history: state.history.filter((index,i)=>i!=0),
                // p1Turn: true

            };
        case PLAY_AGAIN:
            return {
                ...state,
                board: [null, null, null, null, null, null, null, null, null],
                history: [],
                status: 'ON_GOING', // could be NOT_STARTED ON_GOING P1WON P2WON DRAW
                p1Turn: true
            };
        case RESET_GAME:
            return {
                ...state,
                board: [null, null, null, null, null, null, null, null, null],
                players: ['X', 'O'],
                mode: 'PVP',//could be PVP or PVE,
                score: [0, 0],
                history: [],
                status: 'NOT_STARTED', // could be NOT_STARTED ON_GOING P1WON P2WON DRAW
                p1Turn: true
            };

        default:
            return state;
    }
}


export default gameReducer;
