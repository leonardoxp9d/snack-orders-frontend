import styled from 'styled-components';

export const Container = styled.button`
  width: 100%;
  height: 4.5rem;
  background-color: var(--primary-color);
  color: var(--background);
  font-weight: 700;
  border: 0; 
  border-radius: 1rem;
  transition: filter .3s ease-in-out;
  
  &:hover {
    filter: brightness(0.7);
  }

  &[disabled] {
    cursor: not-allowed;
    svg {
        animation: animate 2s infinite;
    }
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
