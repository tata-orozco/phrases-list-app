import styled, { css } from "styled-components";

export const baseTitleStyles = css`
    font-size: 2.5rem;
`;

export const baseButtonStyles = css`
    color: var(--white);
    font-weight: 700;
    background-color: var(--primary-violet);
    border: none;
    border-radius: .5rem;
    padding: 1rem;
    text-transform: uppercase;
    transition: background-color 0.2s ease-in-out;
    cursor: pointer;
    &:hover {
        background-color: var(--secondary-violet);
    }
    &:disabled {
        opacity: .5;
        cursor: not-allowed;
    }
`;

export const baseInputStyles = css`
    border: 1px solid #000;
    border-radius: .5rem;
    margin-bottom: 1rem;
    padding: 1rem;
    width: 100%;
    &:focus {
        outline: none;
    }
    @media (min-width: 768px) {
        font-size: 1.6rem;
        padding: 1.5rem;
    }
`;

export const Button = styled.button`
    ${baseButtonStyles}
`