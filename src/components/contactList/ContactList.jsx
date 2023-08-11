import React from 'react';
import PropTypes from 'prop-types';
import ElementList from '../elementList';
import css from './ContactList.module.css';

const ContactList = ({ items, onDeleteContact }) => {
  return (
    <div>
      <ul className={css.ul}>
        {items.map(item => (
          <ElementList
            item={item}
            key={item.id}
            onDeleteContact={onDeleteContact}
          />
        ))}
      </ul>
    </div>
  );
};

ContactList.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }),
  onDeleteContact: PropTypes.func.isRequired,
};
export default ContactList;
