import { FETCH_QUIZ_START, FETCH_QUIZ_SUCCESS, FETCH_QUIZ_ERROR, QUIZ_SET_STATE, QUIZ_FINISHED, QUIZ_NEXT_QUESTION, RETRY_QUIZ } from "../actions/actionType"

const initialState = {
    results: {},
    isFinished: false,
    activeQuistion: 0,
    answerState: null,
    quiz: null,
    loading: false,
    error: null
}

export default function quiz(state = initialState, action) {
    switch (action.type) {
        case FETCH_QUIZ_START:
            return {
                ...state,
                loading: true
            }
        case FETCH_QUIZ_SUCCESS:
            return {
                ...state,
                loading: false,
                quiz: action.quiz
            }
        case FETCH_QUIZ_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case QUIZ_SET_STATE:
            return {
                ...state,
                answerState: action.answerState,
                results: action.result
            }
        case QUIZ_FINISHED:
            return {
                ...state,
                isFinished: true
            }
        case QUIZ_NEXT_QUESTION:
            return {
                ...state,
                answerState: null,
                activeQuistion: action.activeQuistion,
            }
        case RETRY_QUIZ:
            return {
                ...state,
                activeQuistion: 0,
                answerState: null,
                isFinished: false,
                results: {}
            }
        default:
            return state
    }

}