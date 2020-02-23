import axios from "axios";
import {
    AUTH_SUCCESS,
    AUTH_LOGOUT
} from "./actionType";

export function auth(email, password, isLogin) {
    return async dispatch => {
        const authData = {
            email,
            password,
            returnSectureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAtBft4xtBqeXkKe1hscF2IIFLeMcXKRtM'

        if (isLogin) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAtBft4xtBqeXkKe1hscF2IIFLeMcXKRtM'
        }

        const response = await axios.post(url, authData);
        const data = response.data

        const expirationDate = new Date(new Date().getTime() + 3600 * 1000)
        
        localStorage.setItem('token', data.idToken)
        localStorage.setItem('userId', data.localId)
        localStorage.setItem('expirationDate', expirationDate)

        dispatch(authSuccess(data.idToken))
        dispatch(autoLogout(3600))
    }
}

export function authSuccess(token) {
    return {
        type: AUTH_SUCCESS,
        token
    }
}

export function autoLogout(time) {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, time * 1000);
    }
}

export function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('expirationDate')
    return {
        type: AUTH_LOGOUT
    }
}
export function autoLogin() {
    return dispatch => {
        const token = localStorage.getItem('token')
        if (!token) {
            dispatch(logout())
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            if (expirationDate <= new Date()) {
                dispatch(logout())
            }else {
                dispatch(authSuccess(token))
                dispatch(autoLogout((expirationDate.getTime()- new Date().getTime())/1000)) 
            }
        }
    }
}