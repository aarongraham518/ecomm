import styled from 'styled-components';

import {
    BaseButton,
    GoogleSignInButton,
    InvertedButton,
  } from "../button/button.styles";


export const CartDropdownContainer = styled.div`
    position: absolute;
    width: 280px;
    height: 340px;
    display: flex;
    flex-direction: column;
    padding: 10px 5px;
    border: 1px solid black;
    background-color: white;
    top: 90px;
    right: 40px;
    z-index: 5;

    //If any of these components get nested in CartDropdownContainer, 
    //then apply the margin-top: auto
    ${BaseButton},
    ${GoogleSignInButton},
    ${InvertedButton} {
        margin-top: auto;
    }
`

export const EmptyMesasge = styled.span`
    font-size: 18px;
    margin: 50px auto;

    ${CartDropdownContainer}{
        
    }
`

export const CartItems = styled.div`
    height: 240px;
    display: flex;
    flex-direction: column;
    overflow: scroll;
`