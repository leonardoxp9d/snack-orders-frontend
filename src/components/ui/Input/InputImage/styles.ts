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
  background-color: var(--inputs);
  border: .17rem solid var(--inputs);
  border-radius: 1rem; 
  color: var(--gray-hard);
  //border: 1px solid red;

  label {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: 100%;
    height: 27rem;
    //border: 1px solid red;

    div {
      position: absolute;
      opacity: 0.8;
      transition: all 0.7s;
      //border: 1px solid red;

      svg {
        font-size: 9rem;
      }
    }
    
    &:hover div {
        opacity: 1;
        transform: scale(1.2);
        //border: 1px solid red;
    }
    
    input {
      flex: 1;
      z-index: -10;
    }  

    img {
      width: 100%;
      height: 100%;
      border-radius: 1rem;
      object-fit: cover;
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
