const ContactItem = ({ id, name, number, onDelete }) => {
  const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`;

  return (
    <li>
      <div className="contact-left">
        <img className="avatar-img" src={avatarUrl} alt={name} />
        <span>{name}: {number}</span>
      </div>

      <button onClick={() => onDelete(id)}>Delete</button>
    </li>
  );
};

export default ContactItem;
