import styled from 'styled-components';
import Image from 'next/legacy/image';

export const Container = styled.div`
    display: flex;
    align-items: stretch;
    height: 100vh;
    //width: 100vh;
    overflow: hidden;
    //border: 1px red solid;

    & > div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        //max-width: 40rem;
        //width: 90%;
        width: 40rem;
        margin: 0 2rem;
        //border: 1px red solid;  
        

        h1 {
            color: var(--white);
            margin-bottom: 6rem;
            //border: 1px red solid;
        }

        form {
            display: flex;
            flex-direction: column;
            //width: 30rem;
            max-width: 28.5rem;
            width: 90%;
            //border: 1px red solid;

            div, button {
                margin-bottom: 1rem;
            }

            div:not(:last-child) {
                animation: inputAppear .8s ease;
                transition: .3s;
            }
        }

        & > a {
            color: var(--white);
            cursor: pointer;
            margin-top: .4rem;
            transition: filter 0.3s ease-in-out;

            &:hover {
                filter: brightness(0.7);
            }
        }
    }

    & > img {
        background-repeat: no-repeat; 
        background-position: center;
        background-size: auto;
        flex: 1;
        width: 65%;//--
        height: 100vh;
        //border: 5px solid red;
    }

    @media (max-width: 950px) {
        justify-content: center;
        
        & > img {
            display: none;
        }
    }

    @keyframes inputAppear {
        from{
            height: 0;
            opacity: 0;
        }
        to{
            height: 4.5rem;
            opacity: initial;
        }
    }
`