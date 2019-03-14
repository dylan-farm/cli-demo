/*
 在ActionCreator里面完成数据的获取与处理的工作。并且通过向store发送各个组合的action，从而达到控制界面展示的内容实现交互。
 */
import {
    LOGIN_LOADING,
    LOGIN_SUCCESS,
    LOGIN_FAILURE
} from './actionTypes';
const loginLoading = loading=> ({
    type: LOGIN_LOADING,
    payload: loading
})
const loginSuccess = data=> ({
    type: LOGIN_SUCCESS,
    payload: data
})

const loginFailure = error=>({
    type: LOGIN_FAILURE,
    payload: error
})
//action中调用其他action
const login = response=>dispatch=> {
    new Promise(function (resolve) {
        dispatch(loginLoading(true));
        setTimeout(()=>resolve(response), 1500)
    }).then(function (data) {
            dispatch(loginLoading(false));
            dispatch(loginSuccess(data))
        }
    )
}


export default {
    loginLoading,
    loginSuccess,
    loginFailure,
    login
}