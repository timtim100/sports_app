import update from 'immutability-helper';
import initialState from './initialState';
import { FETCH_SEASONS_BEGIN, FETCH_SEASONS_SUCCESS, FETCH_SEASONS_ERROR, SELECT_SEASON } from '../actions/allActions';

export default function seasons(state = initialState.seasons, action) {
    switch (action.type) {
        case FETCH_SEASONS_BEGIN:
            return update(state, { fetchingData: { $set: true } });
        case FETCH_SEASONS_SUCCESS:
            return update(state, { fetchingData: { $set: false }, list: { $set: action.payload } });
        case FETCH_SEASONS_ERROR:
            return update(state, { fetchingData: { $set: false }, list: { $set: [] } });
        case SELECT_SEASON:
            return update(state, { selectedSeason: { $set: action.payload } });
        default:
            return state;
    }
}