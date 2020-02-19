import React from 'react';
import classes from './FinishedQuiz.module.css';
import Button from '../UI/Button/Button';
import { Link } from 'react-router-dom';

const FinishedQuiz = props => {
    const succesCount = Object.keys(props.results).reduce((total, key) => {
        if (props.results[key] === 'success'){
            total++
        }
        return total
    }, 0)

	return (
		<div className={classes.FinishedQuiz}>
			<ul>
				{props.quiz.map((quizItem, index) => {
					return (
						<li key={index}>
							<strong>{index + 1}</strong>. &nbsp;
							{quizItem.question}
							<span className={classes[props.results[quizItem.id]]}>
								{props.results[quizItem.id] === 'success' ? 'Верно' : 'Не верно'}
							</span>
						</li>
					);
				})}
			</ul>

			<p>
				Right answers {succesCount} of {props.quiz.length}
			</p>

			<div>
				<Button onClick={props.onRetry} type='primary'>
					Повторить
				</Button>
				<Link to='/'>
					<Button onClick={props.onRetry} type='success'>
						Перейти в список тестов
					</Button>
				</Link>
			</div>
		</div>
	);
};

export default FinishedQuiz;
