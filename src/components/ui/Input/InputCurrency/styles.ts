import styled, { css } from 'styled-components';

import Tooltip from '../../../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled(Tooltip)<ContainerProps>`
  display: flex;
  align-items: center;
  width: 100%;
  height: 4.5rem;
  padding: 0 1rem;  
  border-radius: 1rem;
  background-color: var(--inputs);
  border: .17rem solid var(--inputs);
  color: var(--gray-hard);
  //border: 1px solid red;

  svg {
    margin-right: 1rem;
    font-size: 2rem;
  }

  input {
    width: 100%;
    background: transparent;
    border: 0;
    color: var(--white);
    //border: 1px solid red;

    &::placeholder {
      color: var(--gray-hard);
    }
  }

  ${props =>
    props.isErrored &&
    css`
      border-color: var(--red);
      
      span {
        background: var(--red);
        color: var(--white);
        &::before {
          border-color: var(--red) transparent;
        }
      }
  `}

  ${props =>
    props.isFocused &&
    css`
        color: var(--primary-color);
        border-color: var(--primary-color);
  `}

  ${props =>
    props.isFilled &&
    css`
      color: var(--primary-color);
  `}
`;