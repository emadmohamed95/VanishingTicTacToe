import { SAVE_SETTINGS } from "./types";


export const saveSettings = (vanishMode, vanishDuration) => (dispatch, getState) => {
    dispatch({
        type: SAVE_SETTINGS,
        payload: {
            vanishMode: vanishMode,
            vanishDuration: vanishDuration
        }
    });
};

