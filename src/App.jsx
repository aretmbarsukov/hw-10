import React, { Component } from "react";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import Filter from "./components/Filter";
import { nanoid } from "nanoid";

const STORAGE_KEY = "phonebook-contacts";

class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  };

  componentDidMount() {
    const savedContacts = localStorage.getItem(STORAGE_KEY);

    if (savedContacts) {
      this.setState({ contacts: JSON.parse(savedContacts) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(this.state.contacts)
      );
    }
  }

  addContact = ({ name, number }) => {
    const normalizedName = name.toLowerCase().trim();
    const normalizedNumber = number.replace(/\D/g, "");

    const nameExists = this.state.contacts.some(
      (c) => c.name.toLowerCase().trim() === normalizedName
    );

    const numberExists = this.state.contacts.some(
      (c) => c.number.replace(/\D/g, "") === normalizedNumber
    );

    if (nameExists) {
      alert(`Контакт з ім'ям "${name}" вже існує`);
      return;
    }

    if (numberExists) {
      alert(`Номер "${number}" вже існує`);
      return;
    }

    this.setState((prev) => ({
      contacts: [...prev.contacts, { id: nanoid(), name, number }],
    }));
  };

  deleteContact = (id) => {
    this.setState((prev) => ({
      contacts: prev.contacts.filter((c) => c.id !== id),
    }));
  };

  changeFilter = (e) => {
    this.setState({ filter: e.target.value });
  };

  getFilteredContacts = () => {
    const normalized = this.state.filter.toLowerCase();
    return this.state.contacts.filter((c) =>
      c.name.toLowerCase().includes(normalized)
    );
  };

  render() {
    const filteredContacts = this.getFilteredContacts();

    return (
      <div className="wrapper">
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />

        <h2>Contacts</h2>
        <Filter value={this.state.filter} onChange={this.changeFilter} />
        <ContactList
          contacts={filteredContacts}
          onDelete={this.deleteContact}
        />
      </div>
    );
  }
}

export default App;