import styled, { css } from 'styled-components';

import Tooltip from '../../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled(Tooltip)<ContainerProps>`
  display: flex;
  height: 12rem;
  padding: 1rem;
  background-color: var(--inputs);
  border: .17rem solid var(--inputs);
  border-radius: 1rem;
  color: var(--gray-hard);

  svg {
    margin-right: .9rem;
    font-size: 1.8rem;
  }

  textarea {
    flex: 1;
    width: 100%; 
    background: transparent;
    color: var(--white);
    resize: none;
    border: 0;
    
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