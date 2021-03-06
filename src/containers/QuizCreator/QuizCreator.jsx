import React, { Component } from 'react';
import classes from './QuizCreator.module.css';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import {
	createControl,
	validate,
	validateForm
} from '../../form/formFrameword';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Select from '../../components/UI/Select/Select';
import { connect } from 'react-redux';
import {
	createQuizQuistion,
	finishCreateQuiz,
	resetQuizCreation
} from '../../store/actions/quizCreator';

function createOptionControl(number) {
	return createControl(
		{
			label: `Вариант ${number}`,
			errorMessage: 'Значение не может быть пустым',
			id: number
		},
		{ required: true }
	);
}

function createFormControl(params) {
	return {
		question: createControl(
			{
				label: 'Введите вопрос',
				errorMessage: 'Вопрос не может быть пустым'
			},
			{ required: true }
		),
		option1: createOptionControl(1),
		option2: createOptionControl(2),
		option3: createOptionControl(3),
		option4: createOptionControl(4)
	};
}

class QuizCreator extends Component {
	state = {
		isFormValid: false,
		rightAnswerId: 1,
		formControls: createFormControl()
	};

	submitHandler = event => {
		event.preventDefault();
	};

	createQuizHandler = event => {
		event.preventDefault();		
		this.setState({
			rightAnswerId: 1,
			isFormValid: false,
			formControls: createFormControl()
		});

		this.props.finishCreateQuiz();
	};

	addQuestionHandler = event => {
		event.preventDefault();

		const {
			question,
			option1,
			option2,
			option3,
			option4
		} = this.state.formControls;

		const questionItem = {
			question: question.value,
			id: this.props.quiz.length + 1,
			rightAnswerId: this.state.rightAnswerId,
			answers: [
				{ text: option1.value, id: option1.id },
				{ text: option2.value, id: option2.id },
				{ text: option3.value, id: option3.id },
				{ text: option4.value, id: option4.id }
			]
		};

		this.props.createQuizQuistion(questionItem);

		this.setState({
			rightAnswerId: 1,
			isFormValid: false,
			formControls: createFormControl()
		});
	};

	onChangeHandler = (value, controlName) => {
		const formControls = { ...this.state.formControls };
		const control = { ...formControls[controlName] };

		control.touched = true;
		control.value = value;
		control.valid = validate(control.value, control.validation);

		formControls[controlName] = control;

		this.setState({
			formControls,
			isFormValid: validateForm(formControls)
		});
	};

	renderInputs(value, controlName) {
		return Object.keys(this.state.formControls).map((controlName, index) => {
			const control = this.state.formControls[controlName];
			return (
				<Auxiliary key={controlName + index}>
					<Input
						label={control.label}
						value={control.value}
						valid={control.valid}
						shoudValidate={!!control.validation}
						touched={control.touched}
						errorMessage={control.errorMessage}
						onChange={event => this.onChangeHandler(event.target.value, controlName)}
					/>
					{index === 0 ? <hr /> : null}
				</Auxiliary>
			);
		});
	}

	selectChangeHandler = event => {
		this.setState({
			rightAnswerId: +event.target.value
		});
	};

	componentWillUnmount(){
		this.props.resetQuizCreation()
	}
	render() {
		const select = (
			<Select
				label='Выберите правильный ответ'
				value={this.state.rightAnswerId}
				onChange={this.selectChangeHandler}
				options={[
					{ text: 1, value: 1 },
					{ text: 2, value: 2 },
					{ text: 3, value: 3 },
					{ text: 4, value: 4 }
				]}
			/>
		);
		return (
			<div className={classes.QuizCreator}>
				<div>
					<h1>Создание теста</h1>

					<form onSubmit={this.submitHandler}>
						{this.renderInputs()}

						{select}
						<Button
							type='primary'
							disabled={!this.state.isFormValid}
							onClick={this.addQuestionHandler}
						>
							Добавить вопрос
						</Button>
						<Button
							type='success'
							disabled={this.props.quiz.length === 0}
							onClick={this.createQuizHandler}
						>
							Создать тест
						</Button>
					</form>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		quiz: state.createQuiz.quiz
	};
}

function mapDispatchToProps(dispatch) {
	return {
		createQuizQuistion: item => dispatch(createQuizQuistion(item)),
		finishCreateQuiz: () => dispatch(finishCreateQuiz()),
		resetQuizCreation: () => dispatch(resetQuizCreation())
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator);
