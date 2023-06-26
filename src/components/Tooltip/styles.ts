import styled from 'styled-components';

export const Container = styled.div`
    position: relative;

    span {
        position: absolute;
        left: 1.7rem;
        bottom: calc(100% + 1rem);
        transform: translateX(-50%);
        width: 16rem;
        padding: .8rem;

        color: transparent;
        text-align: center;
        font-size: 1.4rem;
        font-weight: 500;  
        border-radius: .4rem;
        opacity: 0;
        visibility: hidden;  
        transition: opacity 0.4s;
        //border: 1px blue solid;

        &::before {
            content: '';
            position: absolute;
            top: 100%;
            left: 50%;

            border-style: solid;
            border-width: .6rem .6rem 0 .6rem;
            transform: translateX(-50%);  
            //border: 1px blue solid; 
        }
    }

    &:hover span {
        visibility: visible;
        opacity: 1;
    }

    @media (max-width: 650px) {
        span {            
            width: 9rem;
        }
    }  
`;