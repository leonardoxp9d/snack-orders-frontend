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

    form > div {
        margin-bottom: 1rem; 
    }
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
        color: var(--primary-color);
        margin-right: 1rem;

        line {
            stroke: var(--background);
            stroke-width: 4px;
        }
    }
`

