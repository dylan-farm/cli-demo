/**
 * Created by Administrator on 2018/1/19 0019.
 */

import {
    LOGIN_LOADING,
    LOGIN_SUCCESS,
    LOGIN_FAILURE
} from '../actions/actionTypes';


export default (state = {}, action) => {
    switch (action.type) {
        case LOGIN_LOADING:
            return {...state, loading: action.payload};
        case LOGIN_FAILURE:
            return {...state, error: action.payload};
        case LOGIN_SUCCESS:
            return {...state, error: null};
        default:
            return state;
    }
}