import React from 'react';
import {Link} from 'react-router-dom';

import Button from '../../UI/button/button';

import sprite from '../../../assets/icons/sprite.svg'
import './listItem.css';

const listItem = props => (
    <li className="listItem">
        <Link id={props.id} to={`/contract/${props.id}`} className="button button__search">
            <svg className="button__icon">
                <use xlinkHref={`${sprite}#icon-search`}></use>
            </svg> 
            {props.title}
        </Link>
        <p>{props.startDate}</p>
        <p>{props.endDate}</p>
        <Button id={props.id} onClick={props.delete} className="button button__delete">
            <svg className="button__icon">
                <use xlinkHref={`${sprite}#icon-bin`}></use>
            </svg> 
            excluir
        </Button>
    </li>
);

export default listItem;