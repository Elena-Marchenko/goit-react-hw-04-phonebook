import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import Form from './form';
import Filter from './filter';
import ContactList from './contactList';
import './App.module.css';
import css from './App.module.css';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  formSubmitHandler = data => {
    const item = {
      id: nanoid(),
      ...data,
    };

    const { contacts } = this.state;
    const contactForDelete = contacts.find(
      contact => contact.name === item.name
    );

    if (contactForDelete) {
      alert(`${item.name} is already in contacts.`);

      return;
    } else {
      this.setState(prevState => ({
        contacts: [...prevState.contacts, item],
      }));
    }
  };

  onChangeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalaizFilter = filter.toLowerCase();

    return contacts.filter(
      contact =>
        contact.name.toLowerCase().includes(normalaizFilter) ||
        contact.number.includes(normalaizFilter)
    );
  };

  componentDidMount() {
    const savedState = localStorage.getItem('contacts');
    const parcedContacts = JSON.parse(savedState);

    if (parcedContacts) {
      this.setState({ contacts: parcedContacts });
    }
  }

  componentDidUpdate(_, prevState) {
    const { contacts } = this.state;
    // console.log(contacts);
    // console.log(prevState.contacts);

    if (contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();

    return (
      <div className={css.section}>
        <h1>Phonebook</h1>
        <Form onSubmit={this.formSubmitHandler} />

        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.onChangeFilter} />
        <ContactList
          items={visibleContacts}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
export default App;
