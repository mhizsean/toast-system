import React from 'react';
import Container from '@mui/material/Container';

import Header from './Header';
import Content from './Content';
import SubmissionToast from './Context/Submission';

function App() {
  return (
    <>
      <Header />
      <Container>
        <Content />
      </Container>
      <SubmissionToast />
    </>
  );
}

export default App;
