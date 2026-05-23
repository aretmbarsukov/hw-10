const ContactItem = ({ id, name, number, onDelete }) => (
  <li>
    {name}: {number}
    <button onClick={() => onDelete(id)}>Delete</button>
  </li>
);

export default ContactItem;
