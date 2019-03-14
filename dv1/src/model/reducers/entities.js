/**
 * Created by Administrator on 2018/1/19 0019.
 */

import {
    LOGIN_SUCCESS,
} from '../actions/actionTypes';
export default (state = {}, action)=> {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {...state, loginUser: action.payload};
        default:
            return state;
    }
}