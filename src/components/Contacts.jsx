import { useState } from 'react';
import contactsDatabase from '../contacts.json';

const initialContacts = contactsDatabase.slice(0, 5);
const initialRemainingContacts = contactsDatabase.slice(5);

function Contacts() {
  const [newContact, setNewContact] = useState(initialContacts);
  const [remainingContacts, setRemainingContacts] = useState(
    initialRemainingContacts
  );

  const randomIndex = () =>
    Math.floor(Math.random() * remainingContacts.length);

  const addingRandomContacts = () => {
    const randomNumber = randomIndex();

    if (remainingContacts.length > 0) {
      const updatedContacts = [...newContact, remainingContacts[randomNumber]];
      setNewContact(updatedContacts);

      const updatedRemainingContacts = [...remainingContacts];
      updatedRemainingContacts.splice(randomNumber, 1);
      setRemainingContacts(updatedRemainingContacts);
    } else {
      console.log('No more contacts available.');
    }
  };

  const sortByPopularity = () => {
    const sortedContactsByPopularity = [...newContact].sort(
      (a, b) => b.popularity - a.popularity
    );
    setNewContact(sortedContactsByPopularity);
  };

  const sortbyName = () => {
    const sortedContactsByName = [...newContact].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setNewContact(sortedContactsByName);
  };

  const deleteContact = contactIndex => {
    const newContactsArray = [...newContact].filter(
      (contact, index) => contactIndex !== index
    );
    setNewContact(newContactsArray);
  };

  const contactRows = newContact.map((contact, index) => (
    <tr key={index}>
      <td>
        <img
          src={contact.pictureUrl}
          alt={`${contact.name} picture`}
          className="contact-image"
        />
      </td>
      <td className="contact-name">{contact.name}</td>
      <td>{contact.popularity.toFixed(2)}</td>
      {contact.wonOscar ? <td>🏆</td> : <td></td>}
      {contact.wonEmmy ? <td>🌟</td> : <td></td>}
      <td>
        <button onClick={() => deleteContact(index)}>Delete</button>
      </td>
    </tr>
  ));

  return (
    <div>
      <button onClick={addingRandomContacts}>Add Random Contact</button>
      <button onClick={sortByPopularity}>Sort by popularity</button>
      <button onClick={sortbyName}>Sort by name</button>
      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won an Oscar</th>
            <th>Won an Emmy</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{contactRows}</tbody>
      </table>
    </div>
  );
}

export default Contacts;
