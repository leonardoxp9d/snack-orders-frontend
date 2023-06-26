import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    
    * {
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
    }

    :root {
        //--white: #FFF;
        --black: #000;

        --dark-900: #101026;
        --dark-700: #1D1D2E;

        --gray-100: #8A8A8A;
        --green-900: #3FFFA3;
        --red-900: #FF3F48;

        --white: #f4ede8; // letra
        --gray: #999591; // letra
        --gray-hard: #666360; // svg, letra input
        --shape: #3e3b47; // shape para demostração tipo input, no background
        --primary-color: #ff9000;
        --background: #312e38; // cor do backgraund, cor da letra do botão
        --black-medium: #28262e; // para da um contraste entre o background
        --inputs: #232129;
        --red: #c53030;
    }

    /* ===== Scrollbar CSS ===== */ 
    *::-webkit-scrollbar {
        width: 1.2rem;               
    }

    *::-webkit-scrollbar-track {
        background: #28262e;        
    }

    *::-webkit-scrollbar-thumb {
        background-color: #4d4d57; 
        border-radius: 1rem;      
        border: .3rem solid #28262e;  
    }

    

    html {
        font-size: 62.5%;
    }    

    @media (min-width: 1920px) {
        html{
            font-size: 82.5%;
        }
    }
    @media (min-width: 3840px) {
        html{
            font-size: 202.5%;
        }
    }

    body {
        //width: 100%;
        //min-height: 100vh;
        background:  #312E38;
    }

    body, input, textarea, select, button{
        font-family: 'Ubuntu', sans-serif;
        font-size: 1.6rem;
        font-weight: 500; 
    }

    button {
        cursor: pointer;
    }

    a {
        color: inherit;
        text-decoration: none;
    }

`;