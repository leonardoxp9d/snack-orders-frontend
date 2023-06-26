import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    min-height: 100vh;
    //border: 1px solid red;
`

export const Main = styled.main`
    width: 100%;
    padding: 13rem 10% 10% 10%;
    //border: 1px solid red;

`
export const Title = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 4rem;
    color: var(--white);

    svg, h1 {
        font-size: 2.9rem;
    }

    svg {
        fill: var(--primary-color);
        stroke: var(--primary-color);
        margin-right: 1rem;
    }
`

export const ListOreders = styled.article`
    display: flex;
    flex-direction: column;

    section {
        background-color: var(--inputs);
        border-radius: 1rem;
        margin-bottom: 1rem;        
        transition: transform 0.3s;
        
        &:hover {
            transform: translateX(-1rem)
        }

        button {
            align-items: center;
            display: flex;
            width: 100%;
            height: 6rem;
            border: 0;
            background-color: transparent;
            
            div {
                width: .9rem;
                height: 100%;
                margin-right: 1rem;
                border-radius: 1rem 0 0 1rem;
                background-color: var(--primary-color);                
            }

            & > span {
                color: var(--white);
                font-size: 2rem;
                font-weight: 700; 
            }
        }
    }

    & > span {
        color: var(--gray);
    }  
`