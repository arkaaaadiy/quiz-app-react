import {
    CREATE_QUIZ_QUISTION,
    RESET_QUIZ_CREATION
} from "./actionType"
import axios from "../../axios-quiz/axios-quiz";

export function createQuizQuistion(item) {
    return {
        type: CREATE_QUIZ_QUISTION,
        item
    }
}
export function resetQuizCreation() {
    return {
        type: RESET_QUIZ_CREATION
    }
}
export function finishCreateQuiz() {
    return async (dispatch, getState) => {
        console.log(getState());
        await axios.post('/quizes.json', getState().createQuiz.quiz);
        dispatch(resetQuizCreation())
    }
}