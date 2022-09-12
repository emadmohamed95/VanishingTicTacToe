import { SAVE_SETTINGS } from '../actions/types';


const initialState = {
    vanishMode: true,
    vanishDuration: 3
};

function settingsReducer(state = initialState, action) {

    switch (action.type) {
        case SAVE_SETTINGS:
            return {
                ...state,
                vanishMode: action.payload.vanishMode,
                vanishDuration:action.payload.vanishDuration,
            };

        default:
            return state;
    }
}


export default settingsReducer;
