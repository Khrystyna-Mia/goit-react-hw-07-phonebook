import { useSelector } from 'react-redux';
import { useFetchContactsQuery } from '../../services/contactsApi';
import ContactElList from './ContactElList';
import { List, Item } from './ContactList.styled';

const ContactList = () => {
  const { data: contacts } = useFetchContactsQuery();
  const filter = useSelector(state => state.filter);

  const normalizeFilter = filter.toLowerCase();
  const filteredContacts =
    contacts &&
    contacts.filter(({ name }) => name.toLowerCase().includes(normalizeFilter));

  return (
    <List>
      {contacts &&
        filteredContacts.map(({ id, name, phone }) => (
          <Item key={id}>
            <ContactElList id={id} name={name} number={phone} />
          </Item>
        ))}
    </List>
  );
};

export default ContactList;
