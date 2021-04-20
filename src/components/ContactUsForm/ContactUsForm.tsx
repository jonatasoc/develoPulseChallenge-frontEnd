import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router';

import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import * as Yup from 'yup';
import { MdSend } from 'react-icons/md';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

import { Form } from './ContactUsForm.styles';
import api from '../../services/api';

interface UserInfo {
  firstName: string;
  lastName: string;
  street: string;
  unit: string;
  province: string;
  city: string;
  email: string;
}

interface ValidationErrors {
  [key: string]: string;
}

const states = [
  'AB',
  'BC',
  'MB',
  'NB',
  'NL',
  'NT',
  'NU',
  'ON',
  'PE',
  'SK',
  'QC',
  'YT',
  'YTddddddddddd',
];

const ContactUsForm: React.FC = () => {
  const [userInfo, setUserInfo] = useState({} as UserInfo);
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [validationErros, setValidationErros] = useState(
    {} as ValidationErrors,
  );

  const history = useHistory();

  const loadCities = useCallback((province: string) => {
    try {
      api.get(`/Cities?province=${province}`).then(response => {
        setCities(response.data.Items);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleSelectChange = useCallback(e => {
    setUserInfo(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

    if (e.target.name === 'province') {
      const provinceName = e.target.value;

      loadCities(provinceName);
    }

    setValidationErros(prevState => ({
      ...prevState,
      [e.target.name]: '',
    }));
  }, []);

  const handleSubmit = useCallback(
    async e => {
      e.preventDefault();

      const schema = Yup.object().shape({
        firstName: Yup.string()
          .required('Required')
          .max(40, 'First Name has a max of 40 characters.'),
        lastName: Yup.string()
          .required('Required')
          .max(40, 'Last Name has a max of 40 characters.'),
        email: Yup.string()
          .required('Required')
          .max(128, 'Email has a max of 128 characters.')
          .email('Email must be in the correct format.'),
        street: Yup.string()
          .required('Required')
          .max(128, 'Street Address has a max of 128 characters.'),
        unit: Yup.string().max(
          128,
          'Unit Address has a max of 128 characters.',
        ),
        city: Yup.string()
          .required('Required')
          .max(32, 'City has a max of 32 characters.'),
        province: Yup.string()
          .required('Required')
          .max(32, 'Province has a max of 32 characters.'),
      });

      try {
        setIsLoading(true);

        await schema.validate(userInfo, {
          abortEarly: false,
        });

        const {
          firstName,
          lastName,
          street,
          unit,
          province,
          city,
          email,
        } = userInfo;

        const data = {
          name: `${firstName} ${lastName}`,
          address: street,
          address2: unit,
          province,
          city,
          email,
        };

        const response = await api.post('/Save', data);

        history.push('/success');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const erros: ValidationErrors = {};

          err.inner.forEach(errMapped => {
            if (errMapped.path) {
              erros[errMapped.path] = errMapped.message;
            }
          });

          setValidationErros(erros);
        } else {
          console.log(err);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [userInfo],
  );

  return (
    <Form onSubmit={handleSubmit}>
      <TextField
        label="First Name"
        variant="outlined"
        required
        value={userInfo.firstName}
        onChange={e => {
          setUserInfo({
            ...userInfo,
            firstName: e.target.value,
          });

          setValidationErros({
            ...validationErros,
            firstName: '',
          });
        }}
        error={!!validationErros.firstName}
        helperText={validationErros.firstName}
      />
      <TextField
        label="Last Name"
        variant="outlined"
        required
        value={userInfo.lastName}
        onChange={e => {
          setUserInfo({
            ...userInfo,
            lastName: e.target.value,
          });

          setValidationErros({
            ...validationErros,
            lastName: '',
          });
        }}
        error={!!validationErros.lastName}
        helperText={validationErros.lastName}
      />
      <TextField
        label="Street Address"
        variant="outlined"
        required
        value={userInfo.street}
        onChange={e => {
          setUserInfo({
            ...userInfo,
            street: e.target.value,
          });

          setValidationErros({
            ...validationErros,
            street: '',
          });
        }}
        error={!!validationErros.street}
        helperText={validationErros.street}
      />
      <TextField
        label="Unit/Apt"
        variant="outlined"
        value={userInfo.unit}
        onChange={e => {
          setUserInfo({
            ...userInfo,
            unit: e.target.value,
          });

          setValidationErros({
            ...validationErros,
            unit: '',
          });
        }}
        error={!!validationErros.unit}
        helperText={validationErros.unit}
      />
      <FormControl variant="outlined" error={!!validationErros.province}>
        <InputLabel id="province-label">Province/Territory/province</InputLabel>
        <Select
          labelId="province-label"
          value={userInfo.province}
          onChange={handleSelectChange}
          label="province"
          name="province"
          required
          error={!!validationErros.state}
        >
          {states.map(state => (
            <MenuItem value={state}>{state}</MenuItem>
          ))}
        </Select>
        <FormHelperText>{validationErros.state}</FormHelperText>
      </FormControl>
      <FormControl variant="outlined" error={!!validationErros.city}>
        <InputLabel id="city-label">City</InputLabel>
        <Select
          labelId="city-label"
          value={userInfo.city}
          onChange={handleSelectChange}
          label="city"
          name="city"
          required
        >
          {cities &&
            cities.map(city => <MenuItem value={city}>{city}</MenuItem>)}
        </Select>
        <FormHelperText>{validationErros.city}</FormHelperText>
      </FormControl>
      <TextField
        label="Email"
        variant="outlined"
        required
        type="email"
        value={userInfo.email}
        onChange={e =>
          setUserInfo({
            ...userInfo,
            email: e.target.value,
          })
        }
        error={!!validationErros.email}
        helperText={validationErros.email}
      />
      <Button
        variant="contained"
        color="primary"
        endIcon={
          isLoading ? (
            <AiOutlineLoading3Quarters className="lds-dual-ring" size={20} />
          ) : (
            <MdSend />
          )
        }
        type="submit"
      >
        Send
      </Button>
    </Form>
  );
};

export default ContactUsForm;
