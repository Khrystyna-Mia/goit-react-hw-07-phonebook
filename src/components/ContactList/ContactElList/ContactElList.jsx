import PropTypes from 'prop-types';
import { useDeleteContactMutation } from '../../../services/contactsApi';
import Loader from '../../Loader';
import { Wrapper, Text, Span, Button } from './ContactElList.styled';

const ContactElList = ({ id, name, number }) => {
  const [deleteContact, { isLoading }] = useDeleteContactMutation();

  return (
    <Wrapper>
      <Text>{name}:</Text>
      <Span>{number}</Span>
      <Button type="button" onClick={() => deleteContact(id)}>
        {isLoading ? <Loader /> : 'Delete'}
      </Button>
    </Wrapper>
  );
};

ContactElList.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};

export default ContactElList;
