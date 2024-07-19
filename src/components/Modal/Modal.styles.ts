import styled from "styled-components";

export const ModalWrapper = styled.div`
    position: fixed;
    background-color: rgba(0, 0, 0, .8);
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 2;
`;

export const ModalInnerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: var(--white);
    box-sizing: border-box;
    padding: 2rem;
    position: absolute;
    top: 12%;
    left: 50%;
    transform: translateX(-50%);
    max-width: 40rem;
    min-height: 20rem;
    width: 90%;
    @media (min-width: 768px) {
        max-width: 55rem;
    }
`;

export const CloseButton = styled.button`
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    svg {
        color: black;
        width: 2.5rem;
        height: 2.5rem;
        padding: 0;
    }
`;

export const Message = styled.p`
    font-size: 2rem;
    line-height: 2.5rem;
    margin-bottom: 2rem;
    text-align: center;
`;

export const ButtonWrapper = styled.div`
    display: flex;
    gap: 1rem;
`;