import { useDispatch, useSelector } from 'react-redux';
import { filterContacts } from '../../redux/contacts/contacts-actions';
import { Label, Input } from './ContactFilter.styled';

const ContactFilter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.filter);

  const handleChangeFilter = e =>
    dispatch(filterContacts(e.currentTarget.value));

  return (
    <>
      <Label>Find contacts by name</Label>

      <Input
        type="text"
        name="filter"
        value={filter}
        onChange={handleChangeFilter}
      />
    </>
  );
};

export default ContactFilter;
