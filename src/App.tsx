import React from 'react';
import GlobalStyle from './styles/global';
import ContactUsForm from './components/ContactUsForm';

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <ContactUsForm />
    </>
  );
};

export default App;
