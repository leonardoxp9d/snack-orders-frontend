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
  align-items: center;

  height: 40px;
  border-radius: 0.3rem;    
  padding: 0 0.7rem;  
  margin-bottom: 0.5rem;

  svg {
      margin-right: 0.9rem;
  }

  input {
    background: transparent;
    border: 0;
    color: #f4ede8;
    width: 100%;
    
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

export const ContainerImage = styled(Tooltip)<ContainerProps>`

  background-color: #232129;
  color: #74706d;
  border: 1.7px solid #232129;

  display: flex;
  align-items: center;

  border-radius: 0.3rem;  
  margin-bottom: 0.5rem;

  label {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    height: 280px;
    width: 100%;

    div {
      position: absolute;
      opacity: 0.8;
      transition: all 0.7s;
    }
    
    div:hover {
      opacity: 1;
      transform: scale(1.2);
    }
    
    input {
      flex: 1;
      z-index: -99;
    }  

    img {
      height: 100%;
      width: 100%;
      border-radius: 0.3rem;
      object-fit: cover;
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
