import styled, { css } from 'styled-components';

import Tooltip from '../../Tooltip';

interface ContainerProps {
  isFocused?: boolean;
  isFilled?: boolean;
  isErrored?: boolean;
}

//export const Container = styled.div<ContainerProps>`
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

  select {
    flex-grow: 1;
    height: 38px;
    color: var(--white);
    background-color: #232129;
    padding: 0 0.7rem;
    border: 0;
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
      //border-color: #ff9000;

  `}
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;
  //border: 1px blue solid ;

  svg {
    //margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;
    &::before {
      border-color: #c53030 transparent;
    }
  }
`;




/*
import styled, { css } from 'styled-components';


interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #232129;
  border-radius: 10px;
  padding: 16px;
  width: 100%;

  border: 2px solid #232129;
  color: #666360;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

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

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #f4ede8;
    &::placeholder {
      color: #666360;
    }
  }
  svg {
    margin-right: 16px;
  }
`;
*/
  

/*
export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;
    &::before {
      border-color: #c53030 transparent;
    }
  }
`;*/