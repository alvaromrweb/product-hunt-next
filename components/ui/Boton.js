import styled from "@emotion/styled";

export const Boton = styled.button`
    display: block;
    font-weight: 700;
    text-transform: uppercase;
    border: 1px solid #d1d1d1;
    padding: .8rem 2rem;
    margin: 2rem auto;
    text-align: center;
    background-color: ${props => props.bgColor ? '#da552f' : 'white'};
    color: ${props => props.bgColor ? 'white' : 'black'};
    cursor:pointer;  
`

export const BotonA = styled.a`
    display: block;
    font-weight: 700;
    text-transform: uppercase;
    border: 1px solid #d1d1d1;
    padding: .8rem 2rem;
    margin: 2rem auto;
    text-align: center;
    background-color: ${props => props.bgColor ? '#da552f' : 'white'};
    color: ${props => props.bgColor ? 'white' : 'black'};
    cursor:pointer;  
`
