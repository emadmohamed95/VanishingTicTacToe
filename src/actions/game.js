import { numOfMoves, isEven, p1IsNext, allSquaresSet, setSquare, getWinner, squareCanBeSet } from "../helper/tictactoe";
import { INIT_GAME, MAKE_MOVE, PLAY_AGAIN, RESET_GAME, VANISH_MOVE } from "./types";
var ticTacToeAiEngine = require("tic-tac-toe-ai-engine");


export const initGame = (mode) => (dispatch, getState) => {
    dispatch({
        type: INIT_GAME,
        payload: mode
    });
};

export const makeNextMove = (index) => (dispatch, getState) => {
    const game = getState().game;

    // console.log('hi', game.board)

    if (squareCanBeSet(game.board, index) && !allSquaresSet(game.board)) {
        game.board = setSquare(game.board, index,game.p1Turn)

        // console.log(game.board)
        // console.log(allSquaresSet(game.board))

        let winner = getWinner(game.board)

        console.log(winner)

        if (winner) {
            if (winner === game.players[0]) {
                game.status = 'P1WON'
                game.score[0]++
            } else {
                game.status = 'P2WON'
                game.score[1]++
            }

        } else {

            if (allSquaresSet(game.board)) {

                game.status = 'DRAW'
            }

        }
        // game.p1Turn = !game.p1Turn
        game.index = index

        dispatch({
            type: MAKE_MOVE,
            payload: game,
        });
    }

};


export const makeAiNextMove = () => (dispatch, getState) => {

    const game = getState().game;

    let modifiedBoard = game.board.map(cell=>cell===null?'':cell)

    // var gameState = ['X', '', '', 'O', '', '', 'X', 'O', ''];
    let aires= ticTacToeAiEngine.computeMove(modifiedBoard);

    let aiBoard = aires.nextBestGameState.map(cell=>cell===''?null:cell)
    let index = 0;

    for (let i = 0; i < aiBoard.length; i++) {

        if(aiBoard[i]!==game.board[i]){
            index=i
            break;
        }

    }

    if (squareCanBeSet(game.board, index) && !allSquaresSet(game.board)) {
        game.board = setSquare(game.board, index,game.p1Turn)

        // console.log(game.board)
        // console.log(allSquaresSet(game.board))

        let winner = getWinner(game.board)

        console.log(winner)

        if (winner) {
            if (winner === game.players[0]) {
                game.status = 'P1WON'
                game.score[0]++
            } else {
                game.status = 'P2WON'
                game.score[1]++
            }
        } else {

            if (allSquaresSet(game.board)) {

                game.status = 'DRAW'
            }

        }
        // game.p1Turn = !game.p1Turn
        game.index = index

        dispatch({
            type: MAKE_MOVE,
            payload: game,
        });
    }

};

export const vanishMove = () => (dispatch, getState) => {
    const game = getState().game;

    if (game.history.length > 0) {
        dispatch({
            type: VANISH_MOVE,
            payload: game.history[0],
        });
    }

};

export const playAgain = () => (dispatch, getState) => {
    dispatch({
        type: PLAY_AGAIN,
    });
};

export const resetGame = () => (dispatch, getState) => {
    dispatch({
        type: RESET_GAME,
    });
};