import styled, { css } from 'styled-components';

import Tooltip from '../../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled(Tooltip)<ContainerProps>`
  display: flex;
  align-items: center;
  height: 4.5rem;
  padding: 0 1rem;

  background-color: var(--inputs);
  color: var(--gray-hard);
  border: .17rem solid var(--inputs);
  border-radius: 1rem;

  
  //margin-bottom: 5px;  

  svg {
    margin-right: .4rem;
    font-size: 2rem;
  }

  select {
    flex-grow: 1;
    color: var(--gray-hard);
    background-color: var(--inputs);
    border: 0;
    //border: 1px solid red;
    
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

      select {
        color: var(--white);
      }
  `}

  ${props =>
    props.isFilled &&
    css`
      color: var(--primary-color);
      select {
        color: var(--white);
      }
  `}
`;