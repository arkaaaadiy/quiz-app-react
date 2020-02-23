import axios from 'axios';

export default axios.create({
    baseURL: 'https://quiz-app-f88ee.firebaseio.com/'
}) 