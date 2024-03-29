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
        margin-right: 1rem;
        fill: var(--primary-color);
        stroke: var(--primary-color);
        stroke-width: 3px;

        line {
            stroke: var(--background);
        }

        polyline {
            stroke: var(--background);
        }
    }
`
