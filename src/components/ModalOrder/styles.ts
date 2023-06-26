import styled from 'styled-components';

export const Container = styled.div`
    color: var(--white);
    
    h2 {
        text-align: center;
        margin: 0 0 2rem 0;
        font-size: 2.5rem; //2.5rem
        //font-weight: 700;
        //color: var(--primary-color);
    }

    & > span {
        font-size: 2rem;
        font-weight: 700;
    }   

    @media screen and (max-width: 350px) {
        h2 {
            //font-size: 2rem;
        }

        & > span {
            //font-size: 1.7rem;
        } 
    }    
`

export const ListItem = styled.section`
    display: flex;
    flex-direction: column;
    padding: 1rem;
    margin: 2rem 0;
    
    background-color: var(--inputs);
    color: var(--gray);
    border-radius: 1rem;
    //font-weight: 700;

    span:nth-child(2) {
        word-break: break-all;
        margin-top: .5rem;
        //border: 1px solid red;
    }

    @media screen and (max-width: 350px) {
        //font-size: 1.2rem;
    }
`

export const ButtonClose = styled.button`
    position: absolute;
    top: 0;
    right: 0; 
    margin-top: .2rem;
    margin-right: .2rem;
    
    background: transparent;
    border: 0;
    transition: filter 0.3s ease-in-out;
    //border: 1px solid red;

    svg {
        color: var(--primary-color);
        font-size: 3rem;
    }

    &:hover {
        filter: brightness(0.7);
    }   
`

export const ButtonFinish = styled.button`
    position: absolute;
    right: 0;
    bottom: 0;
    padding: .7rem 1rem;    

    background-color: var(--primary-color);
    color: var(--background);
    font-weight: 700;
    border: 0; 
    border-top-left-radius: 1rem;
    transition: filter 0.3s ease-in-out;

    &:hover {
        filter: brightness(0.7);
    }  
`

