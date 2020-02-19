import React, { Component } from 'react';
import classes from './Drawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import { NavLink } from 'react-router-dom';

const links = [
	{ to: '/', label: 'Список', exact: true },
	{ to: '/auth', label: 'Авторизация', exact: true },
	{ to: '/quiz-creator', label: 'Создать тест', exact: true }
];

class Drawer extends Component {
	clickHandler = () => {
		this.props.onClose();
	};

	renderLinks() {
		return links.map((link, index) => {
			return (
				<li key={index}>
					<NavLink
						to={link.to}
						onClick={this.clickHandler}
						activeClassName={classes.active}
						exact={link.exact}
					>
						{link.label}
					</NavLink>
				</li>
			);
		});
	}

	render() {
		const cls = [classes.Drawer];
		if (!this.props.isOpen) {
			cls.push(classes.close);
		}
		return (
			<React.Fragment>
				<nav className={cls.join(' ')}>
					<ul>{this.renderLinks()}</ul>
				</nav>
				{this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : ''}
			</React.Fragment>
		);
	}
}

export default Drawer;
