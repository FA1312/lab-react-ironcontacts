import logo from "./logo.svg";
import "./App.css";
import contactData from "./contacts.json";
import { useState } from "react";

function App() {
  const [contacts, setContacts] = useState(contactData.slice(0, 5));

  const addContact = () => {
    const randomIndex = Math.floor(Math.random() * (contactData.length - 1));
    const newContArr = [contactData[randomIndex], ...contacts];
    if (!contacts.includes(contactData[randomIndex])) {
      setContacts(newContArr);
    } else {
      addContact();
    }
  };

  const sortPop = () => {
    let sortedByPop = contacts.sort((a, b) => b.popularity - a.popularity);
    setContacts((contacts) => [...sortedByPop]);
  };

  const sortName = () => {
    let sortedByName = contacts.sort((a, b) => a.name.localeCompare(b.name));
    setContacts((contacts) => [...sortedByName]);
  };

  const deleteContact = (contactId) => {
    const filteredContacts = contacts.filter((contact) => {
      return contact.id !== contactId;
    });
    setContacts((contacts) => [...filteredContacts]);
  };

  return (
    <div className="container">
      <div className="top">
        <h2>IronContacts</h2>
        <button className="add-random" onClick={addContact}>
          Add Random Contact
        </button>
        <button className="sort-popularity" onClick={sortPop}>
          Sort by popularity
        </button>
        <button className="sort-name" onClick={sortName}>
          Sort by name
        </button>
      </div>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>Picture</th>
              <th>Name</th>
              <th>Popularity</th>
              <th>Action</th>
              <th>Won Oscar</th>
              <th>Won Emmy</th>
            </tr>
          </thead>
          {contacts.map((contact) => {
            return (
              <tbody key={contact.id}>
                <tr>
                  <td>
                    <img src={contact.pictureUrl} alt={contact.name} />
                  </td>
                  <td className="name">{contact.name}</td>
                  <td>{contact.popularity.toFixed(2)}</td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => deleteContact(contact.id)}
                    >
                      Delete
                    </button>
                  </td>
                  <td>{contact.wonOscar && <p>🏆</p>}</td>
                  <td>{contact.wonEmmy && <p>🏆</p>}</td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    </div>
  );
}

export default App;
