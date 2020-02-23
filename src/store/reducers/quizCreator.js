import { CREATE_QUIZ_QUISTION, RESET_QUIZ_CREATION } from "../actions/actionType"


const initialState = {
    quiz: []    
}

export default function quizCreator(state = initialState, action) {
    switch (action.type) {
        case CREATE_QUIZ_QUISTION:            
            return {
                ...state,
                quiz: [...state.quiz, action.item]
            }
        case RESET_QUIZ_CREATION:            
            return {
                ...state,
                quiz: []
            }
    
        default:
            return state
    }
}