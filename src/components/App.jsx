import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Form from './form';
import Filter from './filter';
import ContactList from './contactList';
import './App.module.css';
import css from './App.module.css';

function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

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
      setContacts([...contacts, item]);
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
    const normalaizFilter = filter.toLowerCase();

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

  console.log('getVisibleContacts:', getVisibleContacts());
  const visibleContacts = getVisibleContacts();
  return (
    <div className={css.section}>
      <h1>Phonebook</h1>
      <Form onSubmit={formSubmitHandler} />

      <h2>Contacts</h2>
      <Filter value={filter} onChange={onChangeFilter} />
      <ContactList items={visibleContacts} onDeleteContact={deleteContact} />
    </div>
  );
}

// state = {
//     contacts: [
//       { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//       { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//       { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//       { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//     ],
//     filter: '',
//   };

//   formSubmitHandler = data => {
//     const item = {
//       id: nanoid(),
//       ...data,
//     };

//     const { contacts } = this.state;
//     const contactForDelete = contacts.find(
//       contact => contact.name === item.name
//     );

//     if (contactForDelete) {
//       alert(`${item.name} is already in contacts.`);

//       return;
//     } else {
//       this.setState(prevState => ({
//         contacts: [...prevState.contacts, item],
//       }));
//     }
//   };

//   onChangeFilter = e => {
//     this.setState({ filter: e.currentTarget.value });
//   };

//   deleteContact = contactId => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(contact => contact.id !== contactId),
//     }));
//   };

//   getVisibleContacts = () => {
//     const { contacts, filter } = this.state;
//     const normalaizFilter = filter.toLowerCase();

//     return contacts.filter(
//       contact =>
//         contact.name.toLowerCase().includes(normalaizFilter) ||
//         contact.number.includes(normalaizFilter)
//     );
//   };

//   componentDidMount() {
//     const savedState = localStorage.getItem('contacts');
//     const parcedContacts = JSON.parse(savedState);

//     if (parcedContacts) {
//       this.setState({ contacts: parcedContacts });
//     }
//   }

//   componentDidUpdate(_, prevState) {
//     const { contacts } = this.state;

//     if (contacts !== prevState.contacts) {
//       localStorage.setItem('contacts', JSON.stringify(contacts));
//     }
//   }

//   render() {
//     const { filter, contacts } = this.state;
//     console.log('getVisibleContacts:', contacts);

//     return (
//       <div className={css.section}>
//         <h1>Phonebook</h1>
//         <Form onSubmit={this.formSubmitHandler} />

//         <h2>Contacts</h2>
//         <Filter value={filter} onChange={this.onChangeFilter} />
//         <ContactList items={contacts} onDeleteContact={this.deleteContact} />
//       </div>
//     );
//   }
// }
export default App;
