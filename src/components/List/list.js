import React from 'react';

import ListItem from './listItem/listItem';

import 'parse';

import './list.css';

const list = props => {

    const listItems = props.list.map(e =>
        <ListItem
            key={e.id}
            id={e.id}
            title={e.get('title')}
            startDate={e.get('startDate')}
            endDate={e.get('endDate')}
            verify={props.verify}
            delete={props.delete}
        />
    );

    return (
        <React.Fragment>
            <ul className="list">
                <li className="list-item">Título</li>
                <li className="list-item">Data de Início</li>
                <li className="list-item">Data de Vencimento</li>
                <li className="list-item">&emsp;</li>
            </ul>
            <ol>
                {listItems}
            </ol>
        </React.Fragment>
    );
}

export default list;