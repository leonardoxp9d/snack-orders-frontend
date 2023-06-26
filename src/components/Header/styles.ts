import styled, { css } from 'styled-components';
import Link from 'next/link';

interface MenuSectionProps {
    isMenuToggleOn: boolean;
}

export const HeaderContainer = styled.header`
    display: flex;
    flex-direction: column;
    width: 40rem;
    background-color: var(--black-medium);
    //border: 1px solid red;

    & > a {
        width: 30rem;
        margin: 2rem 2rem 5rem 2rem;
        //border: 1px solid green;   
    }  

    @media (max-width: 950px) {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        position: fixed;
        top: 0;
        z-index: 10;
        
        width: 100%;
        height: 80px;
        padding: 0 20px;
        //border: 1px solid red;

        & > a {
            width: 140px;
            margin: 4px 0 0 0;
            //border: 1px solid red;
        }
    }
`

export const MenuNav = styled.nav`
    a {
        display: flex;
        align-items: center;
        height: 5rem;
        margin-left: 4rem;
        color: var(--white);
        font-size: 2rem; 
        transition: color .3s ease-in-out;
        //border: 1px solid blue;

        svg {
            margin: 0 1rem 0 2rem; 
            stroke-width: 2.5px;
        }
        
        &:nth-child(1), 
        &:nth-child(2),
        &:nth-child(3) {
            margin-bottom: 3rem;
        }

        &:hover {
            color: var(--primary-color);
        }

        &.active {
            position: relative;
            border-top-left-radius: 5rem;
            border-bottom-left-radius: 5rem;
            background-color: var(--background);
            color: var(--primary-color);
            //border:1px solid red;

            svg {
                fill: var(--primary-color);

                line {
                    stroke: var(--background);
                }

                polyline{
                    stroke: var(--background);
                }
            }
        }

        &.active::before {
            content: '';
            position: absolute;
            top: -4rem;
            right: 0;
            width: 4rem;
            height: 4rem;
            border-radius: 50%;
            box-shadow: 2rem 2rem var(--background);
            pointer-events: none;
            //border: 1px solid red;
        }

        &.active::after {
            content: '';
            position: absolute;
            right: 0;
            bottom: -4rem;
            width: 4rem;
            height: 4rem;
            border-radius: 50%;
            box-shadow: 2rem -2rem var(--background);
            pointer-events: none;
            //border: 1px solid red;
        }
    }

    @media (max-width: 950px) {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        position: absolute;
        top: 80px;
        right: 15px; 
        
        width: 50px; 
        height: 0;
        border-bottom-left-radius: 50px;
        border-bottom-right-radius: 50px;

        background-color: var(--black-medium);
        visibility: hidden;
        overflow-y: hidden; 
        transition: .3s;  
        //border: 1px solid red;
        
        a {
            justify-content: center;
            margin-left: 0;

            svg {
                margin: 0; 
            }

            span {
                position: absolute;
                right: 55px;
                width: max-content;
                font-size: 1.6rem;
                //border: 1px solid red;
            }

            &:nth-child(1), 
            &:nth-child(2),
            &:nth-child(3) {
                margin-bottom: 0px;
            }

            span::after {
                position: absolute;
                content: '';
                top: 50%;
                right: -55.25px;
                width: 0px;
                height: 120%;
                transform: translateY(-50%);
                background-color: var(--primary-color);
                border-radius: 8px 0 0 8px;
                //border: 1px solid blue;
            }

            &.active span::after, &:hover span::after{
                width: 5px;
                transition: 0.3s ease;
                //border: 1px solid blue;
            }
            
            &.active {
                background-color: transparent;
                border-top-left-radius: 0;
                border-bottom-left-radius: 0;
            }

            &.active::before, &.active::after {
                display: none;
            }
        }
    }
`

export const MenuToggle = styled.div`
    @media (max-width: 950px) {
        width: 40px;
        background: transparent;
        border: 0;
        cursor: pointer;
        //border: 1px solid red;

        div:nth-child(1),
        div:nth-child(2),
        div:nth-child(3) {
            height: 4px;
            margin: 8px auto;
            background-color: var(--gray);
            border-radius: 5px;
            transition-duration: 0.3s;            
        }
    }
`

export const MenuSection = styled.div<MenuSectionProps>`
    //border: 1px solid red;
    @media (max-width: 950px) {
        display: flex;
        justify-content: end;

        ${props => props.isMenuToggleOn && css`
            & > div {
                div:nth-child(1) {
                    transform: rotate(45deg) translate(9px, 8px);
                }
                div:nth-child(2) {
                    opacity: 0;
                }
                div:nth-child(3) {
                    transform: rotate(-45deg) translate(8px, -9px);
                }
            }
        
            nav {
                visibility: visible;
                overflow-y: initial;
                height: calc(400px - 80px);;
            }              
        `}        
    }

      
`




