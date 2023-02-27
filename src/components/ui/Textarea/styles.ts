import styled, { css } from 'styled-components';

import Tooltip from '../../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled(Tooltip)<ContainerProps>`
  background-color: #232129;
  color: #666360;
  border: 1.7px solid #232129;

  display: flex;
  min-height: 120px;
  border-radius: 0.3rem;
  padding: 0.5rem 0.7rem 0.5rem 0.7rem;
  margin-bottom: 0.5rem;
  
  svg {
      margin-right: 0.9rem;
  }

  textarea {
    background: transparent;
    color: #f4ede8;

    flex: 1;
    width: 100%; 
    resize: none;
    border: 0;
    padding-top: 0.1rem;
    
    &::placeholder {
      color: #666360;
    }
  }

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
      
      span {
        background: #c53030;
        color: #fff;
        &::before {
          border-color: #c53030 transparent;
        }
      }
  `}

  ${props =>
    props.isFocused &&
    css`
        color: #ff9000;
        border-color: #ff9000;
  `}

  ${props =>
    props.isFilled &&
    css`
      color: #ff9000;

  `}
`;