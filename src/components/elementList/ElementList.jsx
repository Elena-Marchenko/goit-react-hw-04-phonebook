import React from 'react';
import PropTypes from 'prop-types';
import css from './ElenentList.module.css';

const ElementList = ({ item, onDeleteContact }) => (
  <li className={css.li}>
    <p>
      {item.name}:{item.number}
    </p>
    <button onClick={() => onDeleteContact(item.id)} className={css.button}>
      Delete
    </button>
  </li>
);

ElementList.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }),
  onDeleteContact: PropTypes.func.isRequired,
};

export default ElementList;
