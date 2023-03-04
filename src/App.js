import { useEffect, useState } from "react";
import "./App.css";

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
      return contact.name.match(e.target.value);
    });
    setFilterContacts(newList);
  };

  // Map users (list) into returnable list
  const listContacts = filterContacts.map((contact) => (
    <li key={contact.name}>{contact.name}</li>
  ));

  // Return (render) listContacts and search bar
  return (
    <div>
      <h1>{listContacts}</h1>
      <input
        type="text"
        placeholder="Search Contacts"
        onChange={handleChange}
        value={searchValue}
      />
    </div>
  );
};

export default App;
