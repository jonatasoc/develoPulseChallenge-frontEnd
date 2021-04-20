import styled from 'styled-components';

export const Form = styled.form`
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .MuiFormControl-root {
    width: 100%;
    margin-bottom: 15px;
  }

  .MuiButton-root {
    margin-top: 25px;
  }

  .lds-dual-ring {
    animation: lds-dual-ring 1.2s linear infinite;
  }

  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
