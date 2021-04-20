import styled from 'styled-components';

export const Container = styled.main`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  height: 100vh;
  width: 450px;
  margin: 0 auto;
`;

export const Title = styled.p`
  color: var(--blue);

  font-size: 30px;
  letter-spacing: 1px;

  margin-bottom: 40px;
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .MuiFormControl-root {
    width: 100%;
    margin-bottom: 15px;
  }
`;
