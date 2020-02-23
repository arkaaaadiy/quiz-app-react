import {combineReducers} from 'redux';

import quizReducer from './quiz';
import quizListReducer from './quizLits';
import createQuizReducer from './quizCreator';
import authReducer from './auth';


export default combineReducers({
    quiz: quizReducer,
    quizList: quizListReducer,
    createQuiz: createQuizReducer,
    auth: authReducer
})