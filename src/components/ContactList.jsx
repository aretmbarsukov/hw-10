import ContactItem from './ContactItem';

const ContactList = ({ contacts, onDelete }) => (
  <ul>
    {contacts.map(c => (
      <ContactItem
        key={c.id}
        id={c.id}
        name={c.name}
        number={c.number}
        onDelete={onDelete}
      />
    ))}
  </ul>
);

export default ContactList;
