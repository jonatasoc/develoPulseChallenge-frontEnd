import React from 'react';
import { Box } from '@material-ui/core';

import { Container, Title } from './Home.styles';
import ContactUsForm from '../../components/ContactUsForm';

const Home: React.FC = () => {
  return (
    <Box boxShadow={1}>
      <Container>
        <Title>Contact US</Title>
        <ContactUsForm />
      </Container>
    </Box>
  );
};

export default Home;
