import styled from '@emotion/styled'

export const Formulario = styled.form`
    max-width: 600px;
    width: 95%;
    margin: 5rem auto 0 auto;

    fieldset {
        margin: 2rem 0;
        border: 1px solid var(--gris3);
        font-size: 2rem;
        padding: 2rem;
    }
`

export const Campo = styled.div`
    margin-bottom: 2rem;
    display: flex;
    align-items: center;

    label {
        flex: 0 0 150px;
        font-size: 1.8rem;
    }

    input, textarea {
        flex: 1;
        padding: 1rem;
    }

    textarea {
        height: 200px;
    }
`

export const InputSubmit = styled.input`
    background-color: var(--naranja);
    width: 100%;
    padding: 1.5rem;
    text-align: center;
    color:white;
    font-size: 1.8rem;
    text-transform: uppercase;
    border: none;
    font-family: 'PT Sans', sans-serif;
    font-weight: 700;
    cursor: pointer;
    margin-bottom: 5rem;
`

export const Error = styled.p`
    background-color: red;
    padding: 1rem;
    color: white;
    font-family: 'PT Sans', sans-serif;
    font-weight: 700;
    font-size: 1.4rem;
    text-align: center;
    text-transform: uppercase;
    margin: 2rem 0;
`