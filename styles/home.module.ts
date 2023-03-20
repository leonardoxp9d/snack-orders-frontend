import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    align-items: stretch;
    overflow: hidden;
    height: 100vh;

    & > div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        width: 100%;
        max-width: 700px;
        margin: 0 20px;
        
        h1 {
            color: var(--white);
            padding-bottom: 1rem;
        }

        form {
            display: flex;
            flex-direction: column;
            margin-top: 50px; 
            width: 90%;
        }

        form div:not(:last-child) {
            animation: inputAppear .8s ease;
            transition: .3s;
        }

        @keyframes inputAppear {
            from{
            height: 0px;
            opacity: 0;
            }
            to{
            height: 40px;
            opacity: initial;
            }
        }
    }
`