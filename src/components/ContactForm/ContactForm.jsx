import { useState } from 'react';
import {
  useFetchContactsQuery,
  useAddContactMutation,
} from '../../services/contactsApi';
import Loader from 'components/Loader';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix';
import { Form, Label, Input, SubmitButton } from './ContactForm.styled';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const { data: contacts } = useFetchContactsQuery();
  const [addContact, { isLoading }] = useAddContactMutation();

  const nameId = nanoid();
  const numberId = nanoid();

  const handleChange = e => {
    const { name, value } = e.currentTarget;

    if (name === 'name') {
      setName(value);
    }

    if (name === 'number') {
      setNumber(value);
    }
  };

  const checkRepeatName = name => {
    return contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
  };

  const checkRepeatNumber = number => {
    return contacts.find(contact => contact.number === number);
  };

  const checkValidNumber = number => {
    return !/\d{3}[-]\d{2}[-]\d{2}/g.test(number);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (checkRepeatName(name)) {
      Notify.info(`🙄 This ${name} is already in contacts`);
    } else if (checkRepeatNumber(number)) {
      Notify.info(`🙄 This ${number} is already in contacts`);
    } else if (checkValidNumber(number)) {
      Notify.failure(`😔 Please, enter the correct number phone`);
    } else {
      addContact({ name, phone: number });
    }

    resetInput();
  };

  const resetInput = () => {
    setName('');
    setNumber('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label htmlFor={nameId}>Name</Label>
      <Input
        id={nameId}
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        value={name}
        onChange={handleChange}
      />

      <Label htmlFor={numberId}>Number</Label>
      <Input
        id={numberId}
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        value={number}
        onChange={handleChange}
      />

      <SubmitButton type="submit" disabled={isLoading}>
        {isLoading ? <Loader /> : 'Add contact'}
      </SubmitButton>
    </Form>
  );
};

export default ContactForm;
