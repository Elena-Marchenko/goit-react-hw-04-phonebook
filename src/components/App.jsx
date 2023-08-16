import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Form from './form';
import Filter from './filter';
import ContactList from './contactList';
import './App.module.css';
import css from './App.module.css';

function App() {
  const [contacts, setContacts] = useState([]);
  const [filterContacts, setFilter] = useState('');

  const formSubmitHandler = data => {
    const item = {
      id: nanoid(),
      ...data,
    };

    const contactForDelete = contacts.find(
      contact => contact.name === item.name
    );

    if (contactForDelete) {
      alert(`${item.name} is already in contacts.`);

      return;
    } else {
      setContacts(prevContacts => [...prevContacts, item]);
    }
  };

  const onChangeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  const getVisibleContacts = () => {
    const normalaizFilter = filterContacts.toLowerCase();

    return contacts.filter(
      contact =>
        contact.name.toLowerCase().includes(normalaizFilter) ||
        contact.number.includes(normalaizFilter)
    );
  };

  useEffect(() => {
    const savedState = localStorage.getItem('contacts');
    const parcedContacts = JSON.parse(savedState);
    if (parcedContacts) setContacts(parcedContacts);
  }, []);

  useEffect(() => {
    contacts.length &&
      localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const visibleContacts = getVisibleContacts();

  return (
    <div className={css.section}>
      <h1>Phonebook</h1>
      <Form onSubmit={formSubmitHandler} />

      <h2>Contacts</h2>
      <Filter value={filterContacts} onChange={onChangeFilter} />
      <ContactList items={visibleContacts} onDeleteContact={deleteContact} />
    </div>
  );
}

export default App;
