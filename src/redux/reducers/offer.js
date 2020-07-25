import { SHOW_ACTIVE_OFFERS } from "../actions/offers";

const initialState = null;

export default (state = initialState, action) => {
    switch (action.type) {
        case SHOW_ACTIVE_OFFERS:
            return {
                offers: action.offers,
            };
        default:
            return state;
    }
};