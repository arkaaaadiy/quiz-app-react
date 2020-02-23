import {
    FETCH_QUIZ_START,
    FETCH_QUIZ_SUCCESS,
    FETCH_QUIZ_ERROR,
    RETRY_QUIZ,
    QUIZ_NEXT_QUESTION,
    QUIZ_FINISHED,
    QUIZ_SET_STATE
} from "./actionType";
import axios from "../../axios-quiz/axios-quiz";

export function fetchQuizById(quizId) {
    return async dispatch => {
        dispatch(fetchQuizStart())
        try {
            const response = await axios.get(`/quizes/${quizId}.json`);
            const quiz = response.data;

            dispatch(fetchQuizSuccess(quiz))
        } catch (e) {
            dispatch(fetchQuizError(e))
        }
    }
};

function fetchQuizStart() {
    return {
        type: FETCH_QUIZ_START
    }
}

function fetchQuizSuccess(quiz) {
    return {
        type: FETCH_QUIZ_SUCCESS,
        quiz
    }
}

function fetchQuizError(e) {
    return {
        type: FETCH_QUIZ_ERROR,
        error: e
    }
}

export function quizAnswerClick(answerId) {
    return (dispatch, getState) => {
        const state = getState().quiz

        if (state.answerState) {
            const key = Object.keys(state.answerState)[0];
            if (state.answerState[key] === 'success') {
                return;
            }
        }

        const question = state.quiz[state.activeQuistion];
        const results = state.results;

        if (question.rightAnswerId === answerId) {

            if (!results[question.id]) {
                results[question.id] = 'success';
            }


            dispatch(quizSetState({
                [answerId]: 'success'
            }, results))


            const timeout = window.setTimeout(() => {
                if (isQuizFinished(state)) {
                    dispatch(quizFinished())
                } else {
                    dispatch(quizNextQuistion(state.activeQuistion + 1))
                }
                window.clearTimeout(timeout);
            }, 700);
        } else {
            results[question.id] = 'error';
            dispatch(quizSetState({
                [answerId]: 'error'
            }, results))
        }
    }

}

function quizSetState(answerState, result) {
    return {
        type: QUIZ_SET_STATE,
        answerState,
        result
    }
}

function quizFinished() {
    return {
        type: QUIZ_FINISHED
    }
}

function quizNextQuistion(number) {
    return {
        type: QUIZ_NEXT_QUESTION,
        activeQuistion: number
    }
}

export function retryQuiz() {
    return {
        type: RETRY_QUIZ
    }
}

function isQuizFinished(state) {
    return state.activeQuistion + 1 === state.quiz.length;
}