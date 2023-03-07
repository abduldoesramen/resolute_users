import { useEffect, useState } from "react";
import "./App.css";
import "./index.css";

const App = () => {
  // Define hooks to use for setting/updating state variables
  const [contacts, setContacts] = useState([]);
  const [filterContacts, setFilterContacts] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    // fetching a default contact list
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => setContacts(json));

    // fetching a contact list that will be filtered
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => setFilterContacts(json));
  }, []);

  // upon search value updating, we filter and re-render the contact list
  const handleChange = (e) => {
    e.preventDefault();
    setSearchValue(e.target.value);

    // filter default contact list and ONLY update filtered list
    const newList = contacts.filter((contact) => {
      // Searching for contact name is now case-insensitive
      return contact.name.toLowerCase().match(e.target.value.toLowerCase());
    });
    setFilterContacts(newList);
  };

  // Map users (list) into returnable list
  const listContacts = filterContacts.map((contact) => (
    // Information that represents a contact
    <div class="listContactBox" key={contact.id}>
      <li>{contact.name}</li>
      <li>{contact.phone}</li>
      <li>{contact.address.city}</li>
      <br />
    </div>
  ));

  // Return (render) listContacts and search bar
  return (
    <div>
      <h1 class="titleText">Contacts</h1>
      <input
        type="text"
        placeholder="Search Contacts"
        onChange={handleChange}
        value={searchValue}
      />
      <h3>{listContacts}</h3>
    </div>
  );
};

export default App;
