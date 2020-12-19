import { SHOW_ACTIVE_OFFERS, REALIZE_OFFER, OFFER_SELECTED } from "../actions/offers";

const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_ACTIVE_OFFERS:
      return {
        offers: action.offers,
        index: 0,
      };
    case REALIZE_OFFER:
      const newOffers = [];
      state.offers.forEach(offer => {
        if (offer.offerId === action.offerId) {
          newOffers.push({
            ...offer,
            offerValue: action.offerValue,
            response: action.response,
          });
        } else {
          newOffers.push(offer);
        }
      });
      return {
        offers: newOffers,
        index: action.index,
      };
    case OFFER_SELECTED:
      return {
        offerSelected: action.offerSelected,
      };
    default:
      return state;
  }
};