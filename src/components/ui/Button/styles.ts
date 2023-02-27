import styled from 'styled-components';

export const Container = styled.button`
  background-color: #ff9000;
  border: 0;

  height: 40px;
  width: 100%;
  border-radius: 0.3rem;
  padding: 0.4rem;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  
  transition: filter 0.3s ease-in-out;

  &[disabled] {
    cursor: not-allowed;
    svg {
        animation: animate 2s infinite;
    }
  }

  &:hover {
    filter: brightness(0.7);
  }

  a {
    color: #312e38;
    font-weight: 550;
  }

  @keyframes animate {
    from {
      transform: rotate(0def);
    }
    to{
      transform: rotate(360deg);
    }
  }
`;
