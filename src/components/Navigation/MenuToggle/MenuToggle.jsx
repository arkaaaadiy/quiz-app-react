import React from 'react';
import classes from './MenuToggle.module.css';


const MenuToggle = props => {
	const cls = [classes.MenuToggle];

	if (props.isOpen) {
		cls.push(classes.open);
	} else {
		cls.push('');
	}

	return (
        <div onClick={props.onToggle} className={cls.join(' ')} >
            <div></div>
            <div></div>
            <div></div>
        </div>		
	);
};

export default MenuToggle;
