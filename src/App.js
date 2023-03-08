import { useEffect, useState } from "react";
import "./App.css";
import "./index.css";
import TextField from "@mui/material/TextField";
import one from "./avatarnew.jpg";

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
      <p>{contact.name}</p>
      <p>{contact.phone}</p>
      <p>{contact.address.city}</p>
      <img src={one} alt="logo" />
      <br />
    </div>
  ));

  // Return (render) listContacts and search bar
  return (
    <div>
      <h1 class="titleText">Contacts</h1>
      <TextField
        id="outlined-basic"
        label="Search contacts"
        variant="outlined"
        type="text"
        onChange={handleChange}
        value={searchValue}
        style={{ width: 780 }}
      />
      <h3>{listContacts}</h3>
    </div>
  );
};

export default App;
