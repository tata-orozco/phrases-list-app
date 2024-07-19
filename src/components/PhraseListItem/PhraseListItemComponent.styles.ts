import styled from "styled-components"

export const PhraseListItem = styled.div`
    background-color: var(--white);
    border-radius: .5rem;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    padding: 1.5rem;
    margin-bottom: 1rem;
`;

export const PhraseTitle = styled.p`
    font-size: 1.6rem;
    margin: 0 0 1rem;
    font-weight: 700;
    line-height: 2.5rem;
    font-style: italic;
`;

export const DeleteButton = styled.button`
    display: block;
    background: transparent;
    border: none;
    cursor: pointer;
    margin-left: auto;
    padding: 0;
    svg {
        color: black;
        width: 2.5rem;
        height: 2.5rem;
        padding: 0;
    }
`;