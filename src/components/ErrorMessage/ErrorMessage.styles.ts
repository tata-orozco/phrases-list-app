import styled from "styled-components";

export const ErrorWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: .5rem;
    margin-top: 1rem;
    color: var(--red);
    font-weight: 700;
    svg {
        width: 2rem;
        height: 2rem;
    }
`;